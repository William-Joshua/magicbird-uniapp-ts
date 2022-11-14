export interface LoginParams {
  loginName: string;
  password: string;
}

export interface LoginModel {
  access_token: string;
  role: string;
  phone: string;
  name: string;
  userName: string;
  email: string;
}
