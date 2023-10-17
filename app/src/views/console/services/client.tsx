import auth from '@feathersjs/authentication-client';
import { feathers } from '@feathersjs/feathers';
import socketIO from '@feathersjs/socketio-client';
// @ts-ignore
import io from 'socket.io-client'

export const authStorageKey = 'druid-console-token';

const client = feathers();
const socket = io();
client.configure(
  socketIO(socket, {
    timeout: 60000,
  }),
);
client.configure(
  auth({
    path: 'auth/admin',  // Authentication service for admin
    storageKey: authStorageKey,
    storage: window.localStorage,
  }),
);

export default client;

export interface ErrorResponse {
  code: number
  message?: string
  name?: string
  className?: string
  errors?: any
}
