import { DeleteFilled, EditFilled, FormOutlined, SecurityScanOutlined } from "@ant-design/icons";
import { ModalForm, ProColumns, ProFormText, ProTable } from "@ant-design/pro-components";
import { Paginated } from "@feathersjs/feathers";
import { Button, Checkbox, Divider, Form, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AdminModel } from "../../../../orm/declarations/admins";
import pagination from "../../../../utils/pagination";
import QueryParams, { CommonQueryParams } from "../../../common/query-params";
import client from "../../services/client";


export type Permission =
  {
    key: string;
    name: string;
    description: string;
    checked?: boolean;
  };

export const PERMISSIONS: Permission[] = [
  {
    key: 'console:admins',
    name: 'Manage users',
    description: 'Manage system users',
  },
];

const initPermissions = (admin: AdminModel) => {
  // deep copy PERMISSIONS
  const permissions = JSON.parse(JSON.stringify(PERMISSIONS));
  for (const permission of permissions) {
    permission.checked = admin.access?.includes(permission.key);
  }
  return permissions;
};

const initCheckAll = (permissions: Permission[]) => {
  return permissions.every(permission => permission.checked);
};

const EditAdminAccess: React.FC<{ admin: AdminModel, onFinished?: () => void, trigger: React.ReactNode|string }> = ({ admin, onFinished, trigger }) => {
  const [open, setOpen] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>(initPermissions(admin));
  const [checkAll, setCheckAll] = useState(initCheckAll(permissions));

  const handleCheckAll = (checked: boolean) => {
    const updatedPermissions = permissions.map(permission => ({
      ...permission,
      checked
    }));
    setPermissions(updatedPermissions);
    setCheckAll(checked);
  };

  const handlePermissionChange = (key: string, checked: boolean) => {
    const updatedPermissions = permissions.map(permission => {
      if (permission.key === key) {
        return {
          ...permission,
          checked
        };
      }
      return permission;
    });
    setPermissions(updatedPermissions);
    setCheckAll(updatedPermissions.every(permission => permission.checked));
  };

  const onFinish = async (values: any) => {
    // patch access field of admin
    const access = permissions.filter(permission => permission.checked).map(permission => permission.key);
    try {
      const result = await client.service('api/admins').patch(admin.id, { access: JSON.stringify(access) });
      if (typeof result.id === "number") {
        setOpen(false);
        message.success('Permission updated');
        onFinished?.();
        return;
      }
    } catch (err) {
      console.error(err);
      message.error('Failed to update permission');
    }
  };

  return <div>
      <a onClick={() => setOpen(true)}>
        {trigger}
        </a>
    <ModalForm
      onFinish={onFinish}
      layout="horizontal"
      labelCol={{ span: 3 }}
      open={open}
      onAbort={() => setOpen(false)}
      modalProps={{
        onCancel: () => {
          setOpen(false);
        }
      }}
      title='Edit Permissions'
    >
      <Checkbox checked={checkAll} onChange={(e) => handleCheckAll(e.target.checked)}>Check all</Checkbox>
      <Divider />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5em',
        flexWrap: 'wrap'
      }}>
        {
          permissions.map(permission => {
            return <Checkbox
              key={permission.key}
              checked={permission.checked}
              onChange={(e) => handlePermissionChange(permission.key, e.target.checked)}
            >
              {permission.name}
            </Checkbox>
          })
        }
      </div>

    </ModalForm>
  </div>
};




const AdminEditor: React.FC<{
  admin?: AdminModel,
  onFinished?: () => void,
  trigger?: React.ReactNode | string,
}
> = ({ admin, onFinished, trigger }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const result = admin ? await client.service('api/admins').patch(admin.id, values) : await client.service('api/admins').create(values);
      if (typeof result.id === "number") {
        setOpen(false);
        message.success('Submitted successfully');
        onFinished?.();
        if (!admin) {
          form?.resetFields();
        }
        return;
      }
    } catch (err) {
      console.error(err);
      message.error('Failed to submit');
    }
  };

  return <div>
    <div onClick={() => setOpen(true)}>{trigger}</div>
    <ModalForm
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      labelCol={{ span: 3 }}
      open={open}
      onAbort={() => setOpen(false)}
      modalProps={{
        onCancel: () => {
          setOpen(false);
        }
      }}
      title={admin ? 'Edit System User' : 'Create System User'}
    >
      <ProFormText name='username' label='Username' initialValue={admin?.username} required={true} rules={[
        { required: true, message: 'Username is required' },
        {
          validator: async (rule, value) => {
            if (!value) {
              return;
            }
            if (admin && admin.username === value) {
              return;
            }
            const response = await client.service('api/admins').find({ query: { username: value } });
            if (response.total === 0) {
              return;
            }
            throw new Error('Username must be unique');
          },
          message: 'Username must be unique',
        }
      ]} />
      <ProFormText name='name' label='Name' initialValue={admin?.name} required={true} rules={[{ required: true, message: 'Name is required' }]} />
      <ProFormText name='email' label='Email' initialValue={admin?.email} required={true} rules={[{ required: true, message: 'Email is required' }]} />
      <ProFormText name='mobile' label='Mobile' initialValue={admin?.mobile} required={true} rules={[{ required: true, message: 'Mobile is required' }]} />
    </ModalForm>
  </div>
};


type AdminQuery = CommonQueryParams & {
};

const queryParam = new QueryParams<AdminQuery>({
  page: 'number',
  limit: 'number',
});

const Admins = () => {

  const { page = 1, limit = 10, search } = queryParam.getQuery();
  const [action, setAction] = useState(0);
  const [data, setData] = useState<Paginated<AdminModel>>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const query: any = {
          ...pagination(limit, page),
          $sort: {
            username: 1,
          },
        };
        const resp = await client.service('api/admins').find({ query });
        setData(resp);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })()
  }, [page, limit, search, action]);

  const columns: ProColumns<AdminModel>[] = [
    {
      title: 'Index',
      width: 60,
      dataIndex: 'index',
      valueType: 'indexBorder',
    },

    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'Options',
      valueType: 'option',
      width: 60,
      fixed: 'right',
      align: 'center',
      render: (_, record) => {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1em' }}>
          <AdminEditor key='edit' admin={record} trigger={<a><EditFilled /></a>} onFinished={() => setAction(action + 1)} />
                     <EditAdminAccess trigger={<SecurityScanOutlined />} key='permission' admin={record} onFinished={() => {
            setAction(action + 1);
          }} />
          <a style={{ color: 'red' }}
            onClick={() => {
              Modal.confirm({
                title: 'Delete User',
                content: 'Do you want to delete this user? This operation cannot be undone.',
                okText: 'Delete',
                okButtonProps: {
                  style: {
                    backgroundColor: 'red',
                    borderColor: 'red',
                    color: 'white',
                  },
                },
                onOk: async () => {
                  try {
                    const response = await client.service('api/admins').remove(record.id);
                    if (response.id && response.id === record.id) {
                      setAction(action + 1);
                      message.success('User deleted');
                    } else {
                      console.error('The response id does not match the record id');
                      message.error('Failed to delete user');
                    }
                  } catch (error) {
                    console.error(error);
                    message.error('Failed to delete user');
                  }
                },
              });
            }}
          ><DeleteFilled /></a>
        </div>
      },
    },
  ]

  return (
    <div>
      <ProTable<AdminModel>
        loading={loading}
        headerTitle='System Users'
        columns={columns}
        dataSource={data?.data}
        search={false}
        rowKey='id'
        pagination={{
          pageSize: limit,
          total: data?.total,
          current: page,
          onChange: (_page, pageSize) => {
            queryParam.setQuery({ page: _page, limit: pageSize }, navigate);
          },
        }}
        toolBarRender={() => [<AdminEditor key='create' trigger={<Button type="primary"><FormOutlined />Create System Users</Button>} onFinished={() => setAction(action + 1)} />]}
      />
    </div>
  );
};

export default Admins;