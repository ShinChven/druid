# Database Design
> This is a generated file,
> please do not modify.


## admins admins

| name | type | PK | auto inc | nullable | unique | default | index | reference | comment |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| id | int unsigned | pk | auto inc |  |  |  |  |  |  |
| username | string(100) |  |  | not null | unique |  |  |  | 用户名 |
| name | varchar(32) |  |  | null |  |  |  |  | 名称 |
| code | varchar(100) |  |  | null | unique |  |  |  | 用户编号 |
| email | varchar(32) |  |  | null |  |  |  |  | 电子邮箱 |
| mobile | varchar(32) |  |  | null |  |  |  |  | 手机号 |
| password | varchar(200) |  |  | null |  |  |  |  | 密码 |
| access | json |  |  | not null |  |  |  |  | 用户权限 |
| state | int |  |  | not null |  | 1 |  |  | 状态：0-禁用，1-启用 |