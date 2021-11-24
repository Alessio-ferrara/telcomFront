class AuthService {
  login(id, username, token, ruolo) {
    sessionStorage.setItem("id", JSON.stringify(id));
    sessionStorage.setItem("username", JSON.stringify(username));
    sessionStorage.setItem("token", JSON.stringify(token));
    sessionStorage.setItem("ruolo", JSON.stringify(ruolo));
  }

  logout() {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("ruolo");
  }

  getCurrentToken() {
    return JSON.parse(sessionStorage.getItem("token"));
  }

  getCurrentRuolo() {
    return JSON.parse(sessionStorage.getItem("ruolo"));
  }

  getCurrentUsername() {
    return JSON.parse(sessionStorage.getItem("username"));
  }
  getCurrentId() {
    return JSON.parse(sessionStorage.getItem("id"));
  }
}
export default new AuthService();
