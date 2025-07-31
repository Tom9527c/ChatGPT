import { Form, Switch, Input, InputNumber, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import SwitchOrigin from '@/components/SwitchOrigin';
import { DISABLE_AUTO_COMPLETE } from '@/utils';

const PopupSearchLabel = () => {
  return (
    <span>
      弹出搜索{' '}
      <Tooltip
        title={
          <div>
            <div style={{ marginBottom: 10 }}>
              根据内容生成图片：用鼠标选择 ChatGPT 内容，不超过 400 个字符。出现 <b>DALL·E 2</b>{' '}
              按钮，点击跳转
              （注意：因为脚本填充的搜索内容无法直接触发事件，你需要在输入框中输入一个空格来使按钮可点击）。
            </div>
            <div>
              应用程序使用 Tauri
              构建，由于其安全限制，某些操作按钮将无法工作，因此我们建议使用浏览器。
            </div>
          </div>
        }
      >
        <QuestionCircleOutlined style={{ color: '#1677ff' }} />
      </Tooltip>
    </span>
  );
};

const MainCloseLabel = () => {
  return (
    <span>
      关闭退出{' '}
      <Tooltip title="点击关闭按钮是否直接退出，默认最小化。">
        <QuestionCircleOutlined style={{ color: '#1677ff' }} />
      </Tooltip>
    </span>
  );
};

export default function MainWindow() {
  return (
    <>
      <Form.Item label={<PopupSearchLabel />} name="popup_search" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label={<MainCloseLabel />} name="main_close" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="默认宽度" name="main_width">
        <InputNumber />
      </Form.Item>
      <Form.Item label="默认高度" name="main_height">
        <InputNumber />
      </Form.Item>
      <SwitchOrigin name="main" />
      <Form.Item label="用户代理 (主窗口)" name="ua_window">
        <Input.TextArea
          autoSize={{ minRows: 4, maxRows: 4 }}
          {...DISABLE_AUTO_COMPLETE}
          placeholder="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        />
      </Form.Item>
    </>
  );
}
