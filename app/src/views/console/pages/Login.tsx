import { ProForm } from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-form';
import { Button, Card, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appLocales } from '../config/locales';
import { IAuthenticationResponse, authenticate, useAuthentication } from '../services/authentication';
import styles from './Login.module.less';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { admin, setAdmin } = useAuthentication();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const resp = await authenticate({
        strategy: 'local',
        ...values,
      }) as IAuthenticationResponse;
      setAdmin(resp.admin);
      message.success('Login success');
      navigate('/console/');
    } catch (err) {
      console.error(err);
      message.error('Login failed')
    }
    setLoading(false);
  };

  return (
    <div className={styles.login_container}>
      <h1>{appLocales.title}</h1>
      <Card title='Login'>
        <ProForm
          loading={loading}
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
function useAuth(): { admin: any; setAdmin: any; } {
  throw new Error('Function not implemented.');
}

