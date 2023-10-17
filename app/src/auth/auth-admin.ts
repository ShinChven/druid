import { AuthenticationService, JWTStrategy, authenticate } from "@feathersjs/authentication";
import { LocalStrategy } from "@feathersjs/authentication-local";
import { Application } from "@feathersjs/express";

declare module '../declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

export const setupAuthAdmins = (app:Application) => {
  const authentication = new AuthenticationService(app, 'auth/admin')

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())

  app.use('auth/admin', authentication)
};

/**
 * Authenticate hook assigned to UsersAuthService
 */
export const authenticateAdmin = () => authenticate({
  service: 'auth/admin', strategies: [
    'jwt', // Allow access with JSON Web Token
  ]
});