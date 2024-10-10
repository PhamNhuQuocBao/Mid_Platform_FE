import { User } from "@/types";
import { APIs } from ".";

export const register = async (user: User) => {
  try {
    const res = await APIs.post("/register", user);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (user: User) => {
  try {
    const res = await APIs.post("/login", user);
    return res;
  } catch (error) {
    console.error(error);
  }
};
