import { logout } from "./utils/api.js";
import alert from "./utils/alert.js";

export default async function () {
  const res = await logout();
  if (!res.ok || res.status !== 200) {
    alert("error", "Oops! There was an issue. Please try again later.");
    return;
  }

  alert("success", "Successfully logged out!");
  location.reload(true);
}
