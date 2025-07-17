# ZUUZ - AI Analytics Dashboard
*Powered by CloudBox*

A comprehensive AI-powered Office 365 analytics dashboard that provides intelligent insights into email activity, Teams collaboration, SharePoint usage, and productivity metrics. Powered by CloudBox for enterprise-grade analytics.

## Features

- **Email Analytics**: Track email volume, response times, and patterns
- **Teams Activity**: Monitor collaboration and communication patterns
- **SharePoint Insights**: Analyze document usage and sharing
- **Productivity Metrics**: Get actionable insights on work patterns
- **Real-time Data**: Live integration with Office 365 services
- **Demo Mode**: Test with sample data before connecting to Office 365

## Setup Instructions

### 1. Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to "Azure Active Directory" > "App registrations"
3. Click "New registration"
4. Configure:
   - **Name**: ZUUZ - AI Analytics Dashboard
   - **Supported account types**: Accounts in any organizational directory and personal Microsoft accounts
   - **Redirect URI**: Web - `http://localhost:5173` (for development)

### 2. Configure API Permissions

Add the following Microsoft Graph permissions:
- `User.Read` (Delegated)
- `Mail.Read` (Delegated)
- `Files.Read.All` (Delegated)
- `Sites.Read.All` (Delegated)
- `Team.ReadBasic.All` (Delegated)
- `ChannelMessage.Read.All` (Delegated)

### 3. Environment Setup

1. Copy `.env.example` to `.env`
2. Add your Azure AD application details:
   ```
   VITE_AZURE_CLIENT_ID=your-client-id-from-azure
   VITE_AZURE_TENANT_ID=your-tenant-id
   ```

### 4. Installation

```bash
npm install
npm run dev
```

## Usage

### Demo Mode
- Use the demo credentials to explore the ZUUZ dashboard with sample data
- Perfect for testing and demonstrations
- Multiple login options available:
  - demo@zuuz.com / password
  - demo / demo  
  - admin@zuuz.com / password

### Office 365 Integration
- Click "Sign in with Microsoft" to connect your Office 365 account
- Grant the necessary permissions
- Switch to "Live Office 365" data source to see real insights

## Data Sources

The dashboard can operate in two modes:

1. **Demo Data**: Uses mock data for demonstration purposes
2. **Live Office 365**: Connects to real Office 365 services via Microsoft Graph API

## Security & Privacy

- All authentication is handled through Microsoft's secure OAuth 2.0 flow
- No credentials are stored locally
- Data is fetched directly from Microsoft Graph API
- Complies with Microsoft's security and privacy standards

## Deployment

For production deployment:

1. Update redirect URIs in Azure AD app registration
2. Set production environment variables
3. Build and deploy:
   ```bash
   npm run build
   ```

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Verify Azure AD app configuration and permissions
2. **API Errors**: Check if required Graph API permissions are granted
3. **CORS Issues**: Ensure redirect URIs are properly configured

### Support

For technical support or questions about Office 365 integration, please refer to:
- [Microsoft Graph Documentation](https://docs.microsoft.com/en-us/graph/)
- [Azure AD Authentication](https://docs.microsoft.com/en-us/azure/active-directory/)

## License

This project is licensed under the MIT License.

---