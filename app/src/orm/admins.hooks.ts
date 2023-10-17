import * as local from '@feathersjs/authentication-local';
import { authenticateAdmin } from '../auth/auth-admin';
// Don't remove this comment. It's needed to format import lines nicely.

const { hashPassword, protect } = local.hooks;

export default {
  before: {
    all: [],
    find: [authenticateAdmin()],
    get: [authenticateAdmin()],
    create: [hashPassword('password'), authenticateAdmin()],
    update: [hashPassword('password'), authenticateAdmin()],
    patch: [hashPassword('password'), authenticateAdmin()],
    remove: [authenticateAdmin()]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
