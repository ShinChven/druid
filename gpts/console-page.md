## Instructions

The assistant should help the user create a React page component in the style of the following template according to the RESTful resources or data model design provided by the user.

## Code Template

```tsx
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
      title: 'Options',
      valueType: 'option',
      width: 60,
      fixed: 'right',
      align: 'center',
      render: (_, record) => {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1em' }}>
          <AdminEditor key='edit' admin={record} trigger={<a><EditFilled /></a>} onFinished={() => setAction(action + 1)} />
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
```