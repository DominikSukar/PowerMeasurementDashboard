import Keycloak from "keycloak-js";

const Auth = async () => {
  let initOptions = {
    url: "http://10.42.98.59:8080",
    realm: "CUTE",
    clientId: "frontend-1",
    onLoad: "login-required",
  };
  let keycloak = new Keycloak(initOptions);
  let authorized;
  let adminRole;
  await keycloak.init({onLoad: initOptions.onLoad}).then((auth) => {
    authorized = auth;
    adminRole = keycloak.hasResourceRole("admin");
  });
}
export default Auth
