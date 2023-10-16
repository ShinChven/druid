import { PageContainer } from '@ant-design/pro-components';
import React from 'react';

interface Props {
  title?: string;
}

const Dashboard: React.FC<Props> = ({ title }) => {
  return (
    <PageContainer title='title console'>
      <h1>{title}</h1>
      <p>Welcome to the dashboard!!</p>
    </PageContainer>
  );
};

export default Dashboard;
