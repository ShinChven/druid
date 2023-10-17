import { ORMModel } from "../index";

export interface AdminModel extends ORMModel {
    /**
     * 用户名
     */
    username: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 用户编号
     */
    code?: string;
    /**
     * 电子邮箱
     */
    email?: string;
    /**
     * 手机号
     */
    mobile?: string;
    /**
     * 密码
     */
    password?: string;
    /**
     * 用户权限
     */
    access: any;
    /**
     * 状态：0-禁用，1-启用
     */
    state: number;
}