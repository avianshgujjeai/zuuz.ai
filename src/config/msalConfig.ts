import { Configuration, PopupRequest } from '@azure/msal-browser';

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || 'your-client-id-here',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

// Add scopes for API access
export const loginRequest: PopupRequest = {
  scopes: [
    'User.Read',
    'Mail.Read',
    'Files.Read.All',
    'Sites.Read.All',
    'Team.ReadBasic.All',
    'ChannelMessage.Read.All',
    'Analytics.Read'
  ],
};

// Graph API scopes
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphMailEndpoint: 'https://graph.microsoft.com/v1.0/me/messages',
  graphTeamsEndpoint: 'https://graph.microsoft.com/v1.0/me/joinedTeams',
  graphFilesEndpoint: 'https://graph.microsoft.com/v1.0/me/drive/root/children',
  graphSitesEndpoint: 'https://graph.microsoft.com/v1.0/sites',
};