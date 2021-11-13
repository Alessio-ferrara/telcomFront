class AuthService {
    login(email, token, ruolo) {
      sessionStorage.setItem("id", JSON.stringify(email));
      sessionStorage.setItem("token", JSON.stringify(token));
      sessionStorage.setItem("ruolo", JSON.stringify(ruolo))
    }
  
    logout() {
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("ruolo")
    }
  
    getCurrentToken() {
      return JSON.parse(sessionStorage.getItem("token"));
    }
  
    getCurrentRuolo() {
      return JSON.parse(sessionStorage.getItem("ruolo"));
    }

    getCurrentEmail() {
      return JSON.parse(sessionStorage.getItem("id"));
    }
  }
  export default new AuthService();