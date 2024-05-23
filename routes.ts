import { Routers } from "./enum/routers";

const publicRouters: Routers[] = [
  Routers.Home,
  Routers.Settings,
];

const authRouters: Routers[] = [
  Routers.Login,
  Routers.Error,
  Routers.Register,
]

const apiAuthPrefix = Routers.ApiAuth;

const DEFAULT_LOGIN_REDIRECT = Routers.Settings;

export { publicRouters, authRouters, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT };