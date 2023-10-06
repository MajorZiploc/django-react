const oidcConfig = {
  authority: 'https://your-auth-provider.com', // OIDC authority URL
  client_id: 'your-client-id',
  // client_secret: identityClientSecret,
  redirect_uri: 'http://localhost:3000/callback', // Redirect URL after login
  // silent_redirect_uri: `${window.location.protocol}//${window.location.host}${authorizationSilent}`,
  response_type: 'code',
  // response_type: 'id_token token',
  scope: 'openid profile email', // Specify required scopes
  post_logout_redirect_uri: 'http://localhost:3000/', // Redirect URL after logout
  automaticSilentRenew: true, // Enable silent token renewal (refresh tokens)
  accessTokenExpiringNotificationTime: 60,

  loadUserInfo: true,
  filterProtocolClaims: true,
  stopCheckSessionOnError: false,
};

export default oidcConfig;
