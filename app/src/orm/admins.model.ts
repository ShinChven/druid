import { DataTypes } from 'orm-modeling';
import { ServiceModel } from './index';

/**
 * Users Model
 */
const model: ServiceModel = {
  tableName: 'admins',
  autoId: true,
  timestamps: {
    makeDefaultNow: true
  },
  comment: 'admins',
  isService: true,
  indexes: [],
  columns: {
    username: {
      type: DataTypes.STRING,
      length: 100,
      nullable: false,
      unique: true,
      comment: 'Username',
    },
    name: {
      type: DataTypes.VARCHAR,
      length: 32,
      nullable: true,
      comment: 'Name',
    },
    email: {
      type: DataTypes.VARCHAR,
      length: 32,
      nullable: true,
      comment: 'Email'
    },
    mobile: {
      type: DataTypes.VARCHAR,
      length: 32,
      nullable: true,
      comment: 'Mobile phone number'
    },
    password: {
      type: DataTypes.VARCHAR,
      length: 200,
      nullable: true,
      comment: 'Password'
    },
    access: {
      type: DataTypes.JSON,
      comment: 'Privileges to system resources',
    },
    state: {
      type: DataTypes.INT,
      nullable: false,
      defaultValue: 1,
      comment: 'Status: 0 - Disabled, 1 - Enabled'
    }
  }
};

export default model;

export * as hooks from './admins.hooks';
