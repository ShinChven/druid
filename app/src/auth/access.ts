import { HookContext } from "../declarations";
import { Forbidden } from './../../node_modules/feathers-knex/node_modules/@feathersjs/errors/index.d';

export const ACCESS = {
  'console:admin': {},
};

/**
 * Checks if the admin has access to the service based on their access level.
 * @param adminAccess - An array of strings representing the admin's access level.
 * @param allowedAccess - An array of strings representing the allowed access levels for the service.
 * @returns A boolean indicating whether the admin has access to the service or not.
 */
export const canAccess = (adminAccess: string[], allowedAccess: string[]) => {
  // check if the admin has access to the privilege allowed access.
  for (const access of adminAccess) {
    if (allowedAccess.includes(access)) {
      return true;
    }
  }
  return false;
};

/**
 * Returns a hook function that checks if the user has access to the specified resources.
 * @param allowedAccess - An array of strings representing the allowed access levels.
 * @returns A hook function that checks if the user has access to the specified resources.
 */
export const checkAccessHook = (allowedAccess: string[]) => {
  return (ctx: HookContext) => {
    const admin = ctx.params?.admin
    const result = canAccess(admin?.access || [], allowedAccess);
    if (!result) {
      ctx.result = new Forbidden('Access denied');
    }
    return ctx;
  }
};

