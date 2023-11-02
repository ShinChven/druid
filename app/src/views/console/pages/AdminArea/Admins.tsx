import { ModalForm, PageContainer, ProFormText, ProList } from "@ant-design/pro-components";
import { Paginated } from "@feathersjs/feathers";
import { List, message } from "antd";
import { useEffect, useState } from "react";
import { AdminModel } from "../../../../orm/declarations/admins";
import client from "../../services/client";

const AdminEditor: React.FC<{ admin: AdminModel, onFinished?: () => void }> = ({ admin, onFinished }) => {
  const [open, setOpen] = useState(false);

  const onFinish = async (values: any) => {
    try {
      const result = await client.service('api/admins').patch(admin.id, values);
      if (typeof result.id === "number") {
        setOpen(false);
        message.success('Admin updated');
        onFinished?.();
        return;
      }
    } catch (err) {
      console.error(err);
      message.error('Failed to update admin');
    }
  };

  return <div>
    <a onClick={() => setOpen(true)}>edit</a>
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
      title='Edit Admin'
    >
      <ProFormText name='username' label='Username' initialValue={admin.username} required={true} rules={[
        {
          required: true,
          message: 'Username is required',
        },
      ]} />
      <ProFormText name='name' label='Name' initialValue={admin.name} />
      <ProFormText name='email' label='Email' initialValue={admin.email} />
      <ProFormText name='mobile' label='Mobile' initialValue={admin.mobile} />
    </ModalForm>
  </div>
};

const Admins: React.FC = () => {

  const [adminsData, setAdminsData] = useState<Paginated<AdminModel>>();

  const [actions, setActions] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const resp = await client.service('api/admins').find();
        setAdminsData(resp);
      } catch (e) {
        console.error(e);
      }
    })()
  }, [actions]);

  return (
    <PageContainer>
      <ProList
        dataSource={adminsData?.data}
        rowKey='id'
        headerTitle='Admins'
        renderItem={(item) => {
          return (
            <List.Item
              actions={[
                <AdminEditor key='edit' admin={item} onFinished={() => {
                  setActions(actions + 1);
                }} />,
                <a key='delete'>Delete</a>,
              ]}
            >
              <List.Item.Meta
                title={item.username}
                description={item.email}
              />
            </List.Item>
          )

        }}
      />
    </PageContainer>
  )
};

export default Admins;