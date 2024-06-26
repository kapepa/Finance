import { Routers } from "./enum/routers";

const publicRouters: Routers[] = [
  Routers.Home,
  Routers.Settings,
];

const authRouters: Routers[] = [
  Routers.Login,
  Routers.Error,
  Routers.Reset,
  Routers.Register,
  Routers.NewPassword,
  Routers.NewVerification,
]

const apiAuthPrefix = Routers.ApiAuth;

const DEFAULT_LOGIN_REDIRECT = Routers.Settings;

export { publicRouters, authRouters, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT };