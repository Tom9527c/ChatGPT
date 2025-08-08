import { Tag, Space, Popconfirm, Switch } from 'antd';
import { open } from '@tauri-apps/api/shell';

export const awesomeColumns = () => [
  {
    title: '标题',
    dataIndex: 'title',
    fixed: 'left',
    key: 'title',
    width: 160,
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    width: 200,
    render: (v: string) => <a onClick={() => open(v)}>{v}</a>,
  },
  // {
  //   title: 'Icon',
  //   dataIndex: 'icon',
  //   key: 'icon',
  //   width: 120,
  // },
  {
    title: '启用',
    dataIndex: 'enable',
    key: 'enable',
    width: 80,
    render: (v: boolean = true, row: Record<string, any>, action: Record<string, any>) => (
      <Switch checked={v} onChange={(v) => action.setRecord({ ...row, enable: v }, 'enable')} />
    ),
  },
  {
    title: '默认',
    dataIndex: 'default',
    key: 'default',
    width: 80,
    render: (_: any, row: Record<string, any>, action: Record<string, any>) => (
      <Switch checked={!!row.default} onChange={() => action.setRecord(row, 'default')} />
    ),
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    width: 120,
    render: (v: string) => <Tag color="geekblue">{v}</Tag>,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    width: 150,
    render: (v: string[]) => (
      <span className="chat-tags">
        {v?.map((i) => (
          <Tag key={i}>{i}</Tag>
        ))}
      </span>
    ),
  },
  {
    title: '操作',
    fixed: 'right',
    width: 150,
    render: (_: any, row: any, actions: any) => {
      return (
        <Space>
          <a onClick={() => actions.setRecord(row, 'edit')}>编辑</a>
          <Popconfirm
            title="确定要删除这个URL吗？"
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
