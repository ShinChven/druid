import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import { useConsoleData } from '../ConsoleContext';

interface Props {
  title?: string;
}

const Dashboard: React.FC<Props> = ({ title }) => {

  const {admin} = useConsoleData();

  return (
    <PageContainer title='title console'>
      <h1>{title}</h1>
      <p>Welcome to the dashboard!!</p>
      <p>{admin?.username}</p>
      <p>{admin?.password}</p>
    </PageContainer>
  );
};

export default Dashboard;
