
import axios from "axios";

export async function getUser() {
  try {
    const res = await axios.get(`/api/user/get-me`, {
      withCredentials: true, // sends cookies if auth is stored in cookies
    });
    console.log('asdf')
    if (res.status === 200) return res.data; // user info
    return null;
  } catch (err) {
    return null; // user not logged in or API error
  }
}