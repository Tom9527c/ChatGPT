import { Table, Switch, Tag } from 'antd';

import { genCmd } from '@/utils';

export const syncColumns = () => [
  {
    title: '/{cmd}',
    dataIndex: 'cmd',
    fixed: 'left',
    key: 'cmd',
    render: (_: string, row: Record<string, string>) => (
      <Tag color="#2a2a2a">/{genCmd(row.act)}</Tag>
    ),
  },
  {
    title: '动作',
    dataIndex: 'act',
    key: 'act',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    render: () => <Tag>内置</Tag>,
  },
  {
    title: '启用',
    dataIndex: 'enable',
    key: 'enable',
    render: (v: boolean = false, row: Record<string, any>, action: Record<string, any>) => (
      <Switch checked={v} onChange={(v) => action.setRecord({ ...row, enable: v }, 'enable')} />
    ),
  },
  Table.EXPAND_COLUMN,
  {
    title: '提示词',
    dataIndex: 'prompt',
    key: 'prompt',
    render: (v: string) => <span className="chat-prompts-val">{v}</span>,
  },
];
