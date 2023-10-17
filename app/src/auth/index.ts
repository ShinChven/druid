// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { Application } from '../declarations'
import { setupAuthAdmins } from './auth-admin'

export const authentication = (app: Application) => {
  app.configure(setupAuthAdmins)
}
