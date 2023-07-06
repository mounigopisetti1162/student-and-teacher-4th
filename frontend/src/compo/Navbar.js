import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {BrowserRouter,Routes,Route, Navigate, useNavigate} from 'react-router-dom'
import Action from './Action';
import Login from './Login';

import Student from './Student';
import Teacher from './Teacher';
import Home from './Home';
import Allpeople from './Allpeople';
import React from 'react';

const Navbar = () => {
  const navigate=useNavigate()
const { Header, Content, Sider } = Layout;
const items1 = ['ALL People', 'STUDENTS', 'Teacher'].map((key) => ({
  key,
  label: `${key}`,
  onClick:()=>
  {if(key==='ALL People')
{
navigate('/')
}
else if(key==='STUDENTS')
{
  navigate('/Student')
}
else{
  navigate('/Teacher')
}}

}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />

      </Header>
      
      
    </Layout>
  );
};
export default Navbar;