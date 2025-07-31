const tokenKey = "token";
const expirationKey = "token-expiration";
export function saveToken(authData) {
  localStorage.setItem(tokenKey, authData.token);
  localStorage.setItem(expirationKey, authData.expiration.toString());
}

export function getClaims() {
  const token = localStorage.getItem(tokenKey);
  if (!token || token === "undefined") {
    return [];
  }

  const expiration = localStorage.getItem(expirationKey);
  const expirationDate = new Date(expiration);

  if (expirationDate <= new Date()) {
    logout();
    return []; // the token has expired
  }
  const dataToken = JSON.parse(window.atob(token.split(".")[1]));
  const response = [];
  for (const property in dataToken) {
    response.push({ name: property, value: dataToken[property] });
  }
  return response;
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(expirationKey);
}
export function getClaimValue(key, claims) {
  var result = claims.find((x) => x.name == key);
  if (result) return result.value;
}
export function getToken() {
  return localStorage.getItem(tokenKey);
}
export const isAdmin = (claims) => {
  return (
    claims.findIndex(
      (claim) => claim.name === "role" && claim.value === "admin"
    ) > -1
  );
};

export const isClient = (claims) => {
  return (
    claims.findIndex(
      (claim) => claim.name === "role" && claim.value === "client"
    ) > -1
  );
};
