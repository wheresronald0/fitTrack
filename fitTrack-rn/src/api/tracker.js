import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "http://df41-65-32-200-189.ngrok.io",
});

//every time I make a request via axios, if I have a token it will be automatically added in
instance.interceptors.request.use(
  async (config) => {
    //config item has header and other data so I can make changes to it
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; //retuning modified config obj
  },
  function (error) {
    console.log("not working");
    return Promise.reject(error);
  }
);

export default instance;
