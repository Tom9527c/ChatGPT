import { useState } from 'react';
import { invoke } from '@tauri-apps/api';
import { Tabs, Tag } from 'antd';

import { GITHUB_LOG_URL } from '@/utils';
import useInit from '@/hooks/useInit';
import Markdown from '@/components/Markdown';
import './index.scss';

export default function About() {
  const [logContent, setLogContent] = useState('');

  useInit(async () => {
    const data = (await invoke('get_data', { url: GITHUB_LOG_URL })) || '';
    setLogContent(data as string);
  });

  return (
    <div className="about">
      <Tabs
        items={[
          { label: '关于 ChatGPT', key: 'about', children: <AboutChatGPT /> },
          { label: '更新日志', key: 'log', children: <LogTab content={logContent} /> },
        ]}
      />
    </div>
  );
}

const AboutChatGPT = () => {
  return (
    <div className="about-tab">
      <Tag>ChatGPT 桌面应用程序 (Mac, Windows 和 Linux)</Tag>
      <p>
        🕒 历史版本:{' '}
        <a href="https://github.com/lencx/ChatGPT/releases" target="_blank">
          lencx/ChatGPT/releases
        </a>
      </p>
      <p>
        这只是
        <a href="https://chat.openai.com" target="_blank" title="https://chat.openai.com">
          {' '}
          OpenAI ChatGPT{' '}
        </a>
        网站的包装器，不存在其他数据传输（你可以查看{' '}
        <a
          href="https://github.com/lencx/ChatGPT"
          target="_blank"
          title="https://github.com/lencx/ChatGPT"
        >
          {' '}
          源代码{' '}
        </a>
        ）。这个软件的开发和维护占用了我很多时间。如果它对你有所帮助，你可以给我买杯咖啡（中国用户可以使用微信扫码），谢谢！
      </p>
      <p className="imgs" style={{ float: 'left' }}>
        <a href="https://www.buymeacoffee.com/lencx" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
            alt="Buy Me A Coffee"
          />
        </a>{' '}
        <br />
        <img
          width="200"
          src="https://user-images.githubusercontent.com/16164244/207228025-117b5f77-c5d2-48c2-a070-774b7a1596f2.png"
        />
      </p>
    </div>
  );
};

const LogTab = ({ content }: { content: string }) => {
  return (
    <div>
      <p>
        参考:{' '}
        <a href="https://github.com/lencx/ChatGPT/blob/main/UPDATE_LOG.md" target="_blank">
          lencx/ChatGPT/UPDATE_LOG.md
        </a>
      </p>
      <Markdown className="log-tab" children={content} />
    </div>
  );
};
