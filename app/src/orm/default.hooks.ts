import * as feathersAuthentication from '@feathersjs/authentication';
// import {authenticateUsers} from '../authentication/auth-users';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

export default {
  before: {
    all: [
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
