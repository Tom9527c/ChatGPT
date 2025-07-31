import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Form, Select, Tag, Tooltip, Switch } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import useJson from '@/hooks/useJson';
import { DISABLE_AUTO_COMPLETE, CHAT_AWESOME_JSON } from '@/utils';
interface SwitchOriginProps {
  name: string;
}

const SwitchOrigin: FC<SwitchOriginProps> = ({ name }) => {
  const { json: list = [] } = useJson<any[]>(CHAT_AWESOME_JSON);
  const form = Form.useFormInstance();

  const labelName = `(${name === 'main' ? 'Main' : 'SystemTray'})`;
  const dashboardName = `${name}_dashboard`;
  const originName = `${name}_origin`;
  const isEnable = Form.useWatch(dashboardName, form);

  let urlList = [{ title: 'ChatGPT', url: 'https://chat.openai.com', init: true }];
  if (Array.isArray(list)) {
    urlList = urlList.concat(list);
  }

  return (
    <>
      <Form.Item
        label={
          <span>
            Dashboard {labelName}{' '}
            <Tooltip
              title={
                <div>
                  <p>
                    <b>将仪表板设置为应用程序的默认窗口。</b>
                  </p>
                  <p>
                    如果启用此选项，<Tag color="blue">切换来源 {labelName}</Tag> 设置将无效。
                  </p>
                  <p>
                    如果你想在仪表板中添加新的URL，请在 <Link to="/awesome">网址管理</Link>{' '}
                    菜单中添加并确保已启用。
                  </p>
                </div>
              }
            >
              <QuestionCircleOutlined style={{ color: '#1677ff' }} />
            </Tooltip>
          </span>
        }
        name={dashboardName}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        label={
          <span>
            Switch Origin {labelName}{' '}
            <Tooltip
              title={
                <div>
                  <p>
                    <b>将单个URL设置为应用程序的默认窗口。</b>
                  </p>
                  <p>
                    如果你需要设置新的URL作为应用程序加载窗口，请在{' '}
                    <Link to="/awesome">网址管理</Link> 菜单中添加URL，然后选择它。
                  </p>
                </div>
              }
            >
              <QuestionCircleOutlined style={{ color: '#1677ff' }} />
            </Tooltip>
          </span>
        }
        name={originName}
      >
        <Select disabled={isEnable} showSearch {...DISABLE_AUTO_COMPLETE} optionLabelProp="url">
          {urlList.map((i, idx) => (
            <Select.Option
              key={`${idx}_${i.url}`}
              label={i.title}
              value={i.url}
              title={`${i.title}${i.init ? '(内置)' : ''}: ${i.url}`}
            >
              <Tag color={i.init ? 'orange' : 'geekblue'}>{i.title}</Tag> {i.url}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default SwitchOrigin;
