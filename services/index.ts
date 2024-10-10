import axios from "axios";
// import { CLOUD_NAME, CLOUD_PRESET } from "@env";

// change the base url according to your server
export const APIs = axios.create({
  baseURL: "http://192.168.186.193:6789",
  timeout: 5000,
});

export const cloudinaryConfig = {
  cloudName: "dx5wheahz",
  uploadPreset: "mlusmkhs",
};
