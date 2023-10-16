import { ProForm } from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-form';
import { Button, Card } from 'antd';
import { useState } from 'react';
import { appLocales } from '../config/locales';
import styles from './Login.module.less';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    // Perform login logic here
    setLoading(false);
  };

  return (
    <div className={styles.login_container}>
      <h1>{appLocales.title}</h1>
      <Card title='Login'>
        <ProForm
          submitter={false}
          layout='horizontal'
          labelCol={{ span: 8 }}
          className={styles.login_form} onFinish={handleSubmit}>
          <ProFormText
            name="username"
            label="Username"
            placeholder="Please enter your username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          />
          <ProFormText.Password
            name="password"
            label="Password"
            placeholder="Please enter your password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          />
          <Button className={styles.login_buttom} type="primary" loading={loading} htmlType='submit'>
            Login
          </Button>
        </ProForm>
      </Card>

    </div>
  );
};

export default Login;
