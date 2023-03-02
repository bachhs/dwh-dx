const basePathUrl = "https://keycloak.dtcsolution.vn/realms/tuyen-quang";
export const oidcConfigs = {
  homepage: "/dashboard",
  loginPage: "/dashboard",
  issuer: basePathUrl,
  metadataPath: `${basePathUrl}/.well-known/openid-configuration`,
  authority: "https://keycloak.dtcsolution.vn/realms/tuyen-quang",
  client_id: "covid",
  redirect_uri: `${import.meta.env.VITE_APP_BASE_URL}/auth-callback`,
  post_logout_redirect_uri: `${import.meta.env.VITE_APP_BASE_URL}/login`,
  response_type: "code",
  scope: "openid profile email roles",
  response_mode: "fragment",
  filterProtocolClaims: true,
};
