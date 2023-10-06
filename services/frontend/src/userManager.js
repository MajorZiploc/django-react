import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
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

  // client_id: '581912277515-8pqeloei552og7pa13iufb57iug8vu9k.apps.googleusercontent.com',
  // redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  // response_type: 'token id_token',
  // scope: 'openid profile https://www.googleapis.com/auth/youtube.readonly',
  // authority: 'https://accounts.google.com',
  // silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
  // automaticSilentRenew: true,
  // filterProtocolClaims: true,
  // loadUserInfo: true,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
