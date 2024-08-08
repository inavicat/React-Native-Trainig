import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function loginService(email: string, password: string) {
  try {
    const response = await axios.post(
      "https://api.codingthailand.com/api/login",
      {
        email: email,
        password: password,
      }
    );
    // console.log(response.data);
    await AsyncStorage.setItem("@token", JSON.stringify(response.data));
  } catch (error) {
    throw error;
  }
}

export async function logoutService() {
  await AsyncStorage.removeItem("@token");
}

export async function getProfileService() {
  try {
    let token: any = "";

    const tokenString = await AsyncStorage.getItem("@token");
    if (tokenString) {
      token = JSON.parse(tokenString);
    }
    const response = await axios.get(
      "https://api.codingthailand.com/api/profile",
      {
        headers: {
          Authorization: "Bearer " + token.access_token,
        },
      }
    );

    // console.log(response.data);

    return response;
  } catch (error) {
    throw error;
  }
}