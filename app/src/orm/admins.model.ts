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
      comment: '用户名',
    },
    name: {
      type: DataTypes.VARCHAR,
      length: 32,
      nullable: true,
      comment: '名称',
    },
    code: {
      type: DataTypes.VARCHAR,
      length: 100,
      nullable: true,
      unique: true,
      comment: '用户编号',
    },
    email: {
      type: DataTypes.VARCHAR,
      length: 32,
      nullable: true,
      comment: '电子邮箱'
    },
    mobile: {
      type: DataTypes.VARCHAR,
      length: 32,
      nullable: true,
      comment: '手机号'
    },
    password: {
      type: DataTypes.VARCHAR,
      length: 200,
      nullable: true,
      comment: '密码'
    },
    access: {
      type: DataTypes.JSON,
      comment: '用户权限',
    },
    state: {
      type: DataTypes.INT,
      nullable: false,
      defaultValue: 1,
      comment: '状态：0-禁用，1-启用'
    }
  }
};

export default model;

export * as hooks from './admins.hooks';
