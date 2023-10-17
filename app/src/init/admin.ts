import { Application } from '@feathersjs/feathers';
import bcrypt from 'bcryptjs';

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

/**
 * Initialize default admin user
 * @param app
 */
export default async function (app: Application): Promise<void> {
  console.log('Initializing default admin user...');
  const admin = app.get('init')?.admin;
  if (!admin) {
    console.log('No default admin user configured.');
    return;
  }
  if (typeof admin.username !== 'string' || typeof admin.password !== 'string') {
    console.log('Invalid default admin user configuration: ', JSON.stringify(admin));
    return;
  }
  try {
    const knex = app.get('knex');
    const usersKnex = knex('admins');
    const administrators = await usersKnex.select('id').limit(1);
    if (administrators.length === 0) {
      console.log(`initializing user: ${JSON.stringify(admin)}`);
      const adminRawData = { email: admin.email, password: admin.password };
      admin.password = await hashPassword(adminRawData.password);
      admin.access = JSON.stringify(admin.access);
      const admins = await usersKnex.insert(admin);
      console.log(`initialized user: ${JSON.stringify(admins)}`);
    } else {
      console.log('Default admin user already exists');
    }
  } catch (e) {
    console.error('Error initializing default admin user: ', e);
  }
}
