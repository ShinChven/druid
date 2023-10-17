import { AdminModel } from "../../../orm/declarations/admins";
import client, { ErrorResponse } from "./client";

interface AuthenticationPayload {
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
  jti: string;
}

export interface Authentication {
  strategy: string;
  accessToken: string;
  payload: AuthenticationPayload
}

export type IAuthenticationResponse = {
  accessToken?: string;
  authentication?: Authentication;
  admin?: AdminModel | null;
  code?: number;
  message?: string;
}

export type IAuthenticateParams = {
  username: string;
  password: string;
  strategy?: string;
}

export const authenticate = async (params: IAuthenticateParams):
  Promise<IAuthenticationResponse | ErrorResponse> =>
  await client.authenticate({ ...params, strategy: 'local' });

export const reAuthenticate = async () => client.reAuthenticate();

/**
 * logout
 */
export const logout = async () => {
  return client.logout();
}

let _admin: AdminModel | undefined | null = null;

const setAdmin = (admin?: AdminModel | null) => {
  _admin = admin;
};

export const useAuthentication = () => {
  return { admin: _admin, setAdmin };
}


