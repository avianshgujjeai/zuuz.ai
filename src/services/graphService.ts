import { Client } from '@microsoft/microsoft-graph-client';
import { AuthenticationProvider } from '@microsoft/microsoft-graph-client';

export class MSALAuthenticationProvider implements AuthenticationProvider {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getAccessToken(): Promise<string> {
    return this.accessToken;
  }
}

export class GraphService {
  private graphClient: Client;

  constructor(accessToken: string) {
    const authProvider = new MSALAuthenticationProvider(accessToken);
    this.graphClient = Client.initWithMiddleware({ authProvider });
  }

  // Get user profile
  async getUserProfile() {
    try {
      const user = await this.graphClient.api('/me').get();
      return user;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  // Get email analytics data
  async getEmailAnalytics(days: number = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const messages = await this.graphClient
        .api('/me/messages')
        .filter(`receivedDateTime ge ${startDate.toISOString()}`)
        .select('receivedDateTime,sender,subject,importance,isRead')
        .top(1000)
        .get();

      return this.processEmailData(messages.value);
    } catch (error) {
      console.error('Error fetching email analytics:', error);
      throw error;
    }
  }

  // Get Teams activity
  async getTeamsActivity() {
    try {
      const teams = await this.graphClient.api('/me/joinedTeams').get();
      
      const teamsActivity = await Promise.all(
        teams.value.map(async (team: any) => {
          try {
            const channels = await this.graphClient
              .api(`/teams/${team.id}/channels`)
              .get();
            
            return {
              teamId: team.id,
              teamName: team.displayName,
              channelCount: channels.value.length,
              channels: channels.value
            };
          } catch (error) {
            console.error(`Error fetching channels for team ${team.id}:`, error);
            return {
              teamId: team.id,
              teamName: team.displayName,
              channelCount: 0,
              channels: []
            };
          }
        })
      );

      return teamsActivity;
    } catch (error) {
      console.error('Error fetching Teams activity:', error);
      throw error;
    }
  }

  // Get SharePoint files
  async getSharePointFiles() {
    try {
      const files = await this.graphClient
        .api('/me/drive/root/children')
        .select('name,size,lastModifiedDateTime,createdDateTime,webUrl')
        .get();

      return files.value;
    } catch (error) {
      console.error('Error fetching SharePoint files:', error);
      throw error;
    }
  }

  // Get collaboration insights
  async getCollaborationInsights() {
    try {
      // Get recent shared files
      const sharedFiles = await this.graphClient
        .api('/me/drive/sharedWithMe')
        .top(50)
        .get();

      // Get recent activities
      const activities = await this.graphClient
        .api('/me/activities/recent')
        .get();

      return {
        sharedFiles: sharedFiles.value,
        activities: activities.value
      };
    } catch (error) {
      console.error('Error fetching collaboration insights:', error);
      throw error;
    }
  }

  // Process email data for analytics
  private processEmailData(emails: any[]) {
    const emailsByDate = emails.reduce((acc, email) => {
      const date = new Date(email.receivedDateTime).toDateString();
      if (!acc[date]) {
        acc[date] = {
          total: 0,
          read: 0,
          unread: 0,
          important: 0,
          byDomain: {}
        };
      }
      
      acc[date].total++;
      if (email.isRead) {
        acc[date].read++;
      } else {
        acc[date].unread++;
      }
      
      if (email.importance === 'high') {
        acc[date].important++;
      }

      // Extract domain from sender
      const senderEmail = email.sender?.emailAddress?.address || '';
      const domain = senderEmail.split('@')[1] || 'unknown';
      acc[date].byDomain[domain] = (acc[date].byDomain[domain] || 0) + 1;

      return acc;
    }, {});

    return emailsByDate;
  }

  // Get productivity insights
  async getProductivityInsights() {
    try {
      // This would typically use Microsoft Graph Analytics API
      // For now, we'll simulate with available data
      const profile = await this.getUserProfile();
      const emails = await this.getEmailAnalytics(7);
      const teams = await this.getTeamsActivity();
      
      return {
        user: profile,
        emailActivity: emails,
        teamsActivity: teams,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching productivity insights:', error);
      throw error;
    }
  }
}