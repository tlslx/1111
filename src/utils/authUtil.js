import { $locals } from "@/utils";

export default {
  isLogin() {
    const token = $locals.get("AUTH_TOKEN");
    return !!token;
  },
  getToken() {
    const token = $locals.get("AUTH_TOKEN");
    return token;
  },
  getAuthToken() {
    const token = this.getToken();
    return token ? "Bearer " + token : null;
  },
  clearAuthCache() {
    $locals.clearLocalStorage();
  },
  logout() {
    $locals.clearLocalStorage();
    authApi.logout();
  }
};
