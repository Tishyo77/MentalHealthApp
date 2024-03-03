import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientID = "05396ee4875c4334934e528064308b91";
const redirectUri = "http://localhost:5173/dashboard";
const scope = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scope.join(
    "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
});
  
export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
      config.headers.Authorization = "Bearer " + token;
      return config;
    });
};
  
export default apiClient;
