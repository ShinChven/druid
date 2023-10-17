/* eslint-disable @typescript-eslint/no-var-requires */
import { Application, ServiceAddons } from '@feathersjs/feathers';
import service from 'feathers-knex';
import fs from 'fs';
import { Model, createKnexSchema } from 'orm-modeling';
import init from '../init';
import defaultHooks from './default.hooks';

export const API_PREFIX = 'api';

export type ServiceModel = {
  isService?: boolean
  serviceName?: string
} & Model

export type ORMModel = {
  id: number
  created_at: string | Date
  updated_at: string | Date
}

export const setupORM = async (app: Application) => {
  const db = app.get('knex');
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    if (file.indexOf('.model.') > 0) {
      try {
        const orm = require(`./${file}`);
        const model = orm.default as ServiceModel;
        const ormServiceName = `${API_PREFIX}/${model.tableName}`;
        await createKnexSchema({
          db,
          model,
          createKnexSchemaOptions: {
            columnDefaultNullable: true,
          },
        });
        console.log('orm schema \tconfigured:\t', ormServiceName);
        const options = {
          Model: db, // knex model engine
          name: model.tableName,
          paginate: app.get('paginate'),
          timeout: app.get('timeout'),
        };
        if (model.isService === true) {
          // noinspection JSCheckFunctionSignatures
          app.use(ormServiceName, service(options));
          console.log('orm service \tregistered:\t', ormServiceName);
          const mService = app.service(ormServiceName) as ServiceAddons<any>;
          const hooks = require(`./${file}`)?.hooks?.default || defaultHooks;
          mService.hooks(hooks);
          console.log('orm service \thooked:\t\t', ormServiceName);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
  app.configure(init);
};
