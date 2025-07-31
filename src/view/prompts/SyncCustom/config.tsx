import { useState } from 'react';
import { Tag, Space, Popconfirm } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import { shell, path } from '@tauri-apps/api';
import { Link } from 'react-router-dom';

import { EditRow } from '@/hooks/useColumns';
import useInit from '@/hooks/useInit';
import { chatRoot, fmtDate } from '@/utils';

export const syncColumns = () => [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: (_: string, row: any, actions: any) => (
      <EditRow rowKey="name" row={row} actions={actions} />
    ),
  },
  {
    title: '协议',
    dataIndex: 'protocol',
    key: 'protocol',
    width: 80,
    render: (v: string) => <Tag>{v}</Tag>,
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
    width: 180,
    render: (_: string, row: any) => <RenderPath row={row} />,
  },
  {
    title: '最后更新',
    dataIndex: 'last_updated',
    key: 'last_updated',
    width: 140,
    render: (v: number) => (
      <div>
        <HistoryOutlined style={{ marginRight: 5, color: v ? '#52c41a' : '#ff4d4f' }} />
        {v ? fmtDate(v) : ''}
      </div>
    ),
  },
  {
    title: '操作',
    fixed: 'right',
    width: 150,
    render: (_: any, row: any, actions: any) => {
      return (
        <Space>
          {row.protocol !== 'local' && (
            <Popconfirm
              overlayStyle={{ width: 250 }}
              title="同步将覆盖之前的数据，确认同步？"
              onConfirm={() => actions.setRecord(row, 'sync')}
              okText="是"
              cancelText="否"
            >
              <a>同步</a>
            </Popconfirm>
          )}
          {row.last_updated && (
            <Link to={`${row.id}`} state={row}>
              查看
            </Link>
          )}
          <Popconfirm
            title="确定要删除这个路径吗？"
            onConfirm={() => actions.setRecord(row, 'delete')}
            okText="是"
            cancelText="否"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      );
    },
  },
];

const RenderPath = ({ row }: any) => {
  const [filePath, setFilePath] = useState('');
  useInit(async () => {
    setFilePath(await getPath(row));
  });
  return <a onClick={() => shell.open(filePath)}>{filePath}</a>;
};

export const getPath = async (row: any) => {
  if (!/^http/.test(row.protocol)) {
    return await path.join(await chatRoot(), 'cache_prompts', `${row.id}.json`);
  } else {
    return `${row.protocol}://${row.url}`;
  }
};
