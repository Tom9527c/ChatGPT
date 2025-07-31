import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Space, Popconfirm } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { path, shell } from '@tauri-apps/api';

import useInit from '@/hooks/useInit';
import { fmtDate, chatRoot } from '@/utils';

export const scriptColumns = ({ scriptsMap }: any) => [
  {
    title: '文件名',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 160,
    render: (v: string) => <Tag color={v === 'main.js' ? 'green' : 'default'}>{v}</Tag>,
  },
  {
    title: '版本',
    width: 200,
    render: (_: string, row: any) => {
      const next = scriptsMap?.[row.name]?.next_version;
      const curr = scriptsMap?.[row.name]?.curr_version;
      return (
        row.name !== 'main.js' && (
          <Space>
            {curr && <Tag style={{ marginRight: 0 }}>{curr}</Tag>}
            {next && next !== curr && <ArrowRightOutlined style={{ color: '#989898' }} />}
            {next && next !== curr && <Tag color="green-inverse">{next}</Tag>}
          </Space>
        )
      );
    },
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
    width: 200,
    render: (_: string, row: any) => <RenderPath row={row} />,
  },
  {
    title: '远程文件',
    width: 200,
    render: (_: string, row: any) => {
      const uri = `https://raw.githubusercontent.com/lencx/ChatGPT/main/scripts/${row.name}`;
      return <a onClick={() => shell.open(uri)}>{uri}</a>;
    },
  },
  {
    title: '操作',
    fixed: 'right',
    width: 100,
    render: (_: any, row: any, actions: any) => {
      const isExternal = row.name === 'main.js';
      return (
        <Space>
          <Link
            to={`/scripts/${row.id}`}
            state={row}
            style={{ color: !isExternal ? '#ff4d4f' : '' }}
          >
            编辑
          </Link>
          {!isExternal && (
            <Popconfirm
              placement="topLeft"
              title="确定要同步吗？这将覆盖之前对此文件所做的所有修改。"
              onConfirm={() => actions.setRecord(row, 'sync')}
              okText="是"
              cancelText="否"
              overlayStyle={{ width: 300 }}
            >
              <a>同步</a>
            </Popconfirm>
          )}
        </Space>
      );
    },
  },
];

export const RenderPath = ({ row }: any) => {
  const [filePath, setFilePath] = useState('');
  useInit(async () => {
    setFilePath(await getPath(row));
  });
  return <a onClick={() => shell.open(filePath)}>{filePath}</a>;
};

export const getPath = async (row: any) => {
  return await path.join(await chatRoot(), 'scripts', `${row.name}`);
};
