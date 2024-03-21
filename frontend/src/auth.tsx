import Keycloak from "keycloak-js";

const Auth = async () => {
  let initOptions = {
    url: "http://localhost:8080",
    realm: "PMD",
    clientId: "frontend-1",
    onLoad: "login-required",
  };
  let keycloak = new Keycloak(initOptions);
  let authorized;
  let adminRole;
  await keycloak.init({onLoad: "login-required"}).then((auth) => {
    authorized = auth;
    adminRole = keycloak.hasResourceRole("admin");
  });
}
export default Auth
