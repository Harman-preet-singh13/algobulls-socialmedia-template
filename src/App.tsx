import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from "@ant-design/pro-components";
import { useRef } from "react";
import customMenuData from "./components/customMenu";
import {
  HomeOutlined,
  HeartOutlined,
  BookOutlined,
  PlusOutlined,
  UserOutlined,
  LoginOutlined 
} from "@ant-design/icons";

import { BrowserRouter, useNavigate } from "react-router-dom";
import Pages from "./components/Pages";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const IconMap = {
  home: <HomeOutlined />,
  heart: <HeartOutlined />,
  bookmark: <BookOutlined />,
  post: <PlusOutlined />,
  profile: <UserOutlined />,
  signin: <LoginOutlined />
};

const loopMenuItem = (menus: any[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as "home"],
    children: routes && loopMenuItem(routes),
  }));

const serviceData: MenuDataItem[] = loopMenuItem(customMenuData);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const actionRef = useRef<{
    reload: () => void;
  }>();

  const navigate = useNavigate();

  const handleMenuClick = (menu: MenuDataItem) => {
    navigate(menu.path || "");
  };

  return (
    <ProLayout
      style={{
        height: "100vh",
      }}
      actionRef={actionRef}
      menuDataRender={() => serviceData}
      menuItemRender={(item, dom) => (
        <a onClick={() => handleMenuClick(item)}>{dom}</a>
      )}
    >
      <PageContainer >
        <Pages />
      </PageContainer>
    </ProLayout>
  );
};
