export interface Product {
  name: string;
  category: string;
  price: number;
  image?: string;
}

export interface ProductResponse extends Product {
  _id: string;
  __v: number;
}

export interface User {
  username: string;
  password: string;
}

export interface UserRegister extends User {
  confirmPassword: string;
}

export interface UserResponse extends User {
  _id: string;
  __v: number;
}
