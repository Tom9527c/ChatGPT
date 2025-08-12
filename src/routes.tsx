import { useRoutes } from 'react-router-dom';
import {
  SettingOutlined,
  BulbOutlined,
  SyncOutlined,
  FileSyncOutlined,
  UserOutlined,
  FormOutlined,
  InfoCircleOutlined,
  CodeOutlined,
  StarOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

import Settings from '@/view/settings';
import About from '@/view/about';
import Scripts from '@/view/scripts';
import ScriptsEditor from '@/view/scripts/Editor';
import UserCustom from '@/view/prompts/UserCustom';
import SyncPrompts from '@/view/prompts/SyncPrompts';
import SyncCustom from '@/view/prompts/SyncCustom';
import SyncRecord from '@/view/prompts/SyncRecord';
import Notes from '@/view/notes';
import Markdown from '@/view/markdown';
import Awesome from '@/view/awesome';

export type ChatRouteMetaObject = {
  label: string;
  icon?: React.ReactNode;
};

type ChatRouteObject = {
  path: string;
  element?: JSX.Element;
  hideMenu?: boolean;
  meta?: ChatRouteMetaObject;
  children?: ChatRouteObject[];
};

export const routes: Array<ChatRouteObject> = [
  {
    path: '/settings',
    element: <Settings />,
    meta: {
      label: '设置',
      icon: <SettingOutlined />,
    },
  },
  {
    path: '/notes',
    element: <Notes />,
    meta: {
      label: '笔记',
      icon: <FormOutlined />,
    },
  },
  {
    path: '/md/:id',
    element: <Markdown />,
    hideMenu: true,
  },
  {
    path: '/prompts',
    meta: {
      label: '提示词',
      icon: <BulbOutlined />,
    },
    children: [
      {
        path: 'user-custom',
        element: <UserCustom />,
        meta: {
          label: '用户自定义',
          icon: <UserOutlined />,
        },
      },
      // --- Sync
      {
        path: 'sync-prompts',
        element: <SyncPrompts />,
        meta: {
          label: '同步提示词',
          icon: <SyncOutlined />,
        },
      },
      {
        path: 'sync-custom',
        element: <SyncCustom />,
        meta: {
          label: '同步自定义',
          icon: <FileSyncOutlined />,
        },
      },
      {
        path: 'sync-custom/:id',
        element: <SyncRecord />,
        hideMenu: true,
      },
    ],
  },
  {
    path: '/scripts',
    element: <Scripts />,
    meta: {
      label: '脚本',
      icon: <CodeOutlined />,
    },
  },
  {
    path: '/scripts/:id',
    element: <ScriptsEditor />,
    hideMenu: true,
  },
  {
    path: '/awesome',
    element: <Awesome />,
    meta: {
      label: '网址管理',
      icon: <StarOutlined />,
    },
  },
  {
    path: '/about',
    element: <About />,
    meta: {
      label: '关于',
      icon: <InfoCircleOutlined />,
    },
  },

  {
    path: '/',
    element: <Settings />,
  },
];

type MenuItem = Required<MenuProps>['items'][number];
export const menuItems: MenuItem[] = routes
  .filter((j) => !j.hideMenu)
  .map((i) => ({
    ...i.meta,
    key: i.path || '',
    children: i?.children
      ?.filter((j) => !j.hideMenu)
      ?.map((j) => ({ ...j.meta, key: `${i.path}/${j.path}` || '' })),
  }));

export default () => {
  return useRoutes(routes);
};
