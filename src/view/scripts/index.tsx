import { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import { path, fs, invoke } from '@tauri-apps/api';

import useInit from '@/hooks/useInit';
import useColumns from '@/hooks/useColumns';
import { TABLE_PAGINATION } from '@/hooks/useTable';
import { scriptRoot } from '@/utils';
import { scriptColumns } from './config';

const SCRIPTS = ['main.js'];

export default function Scripts() {
  const [scriptsMap, setScriptsMap] = useState({});
  const { columns, ...opInfo } = useColumns(scriptColumns({ scriptsMap }));

  const handleInit = async () => {
    try {
      const manifestPath = await path.join(await scriptRoot(), 'manifest.json');
      const data = await fs.readTextFile(manifestPath);
      const { scripts } = JSON.parse(data);
      const infoMap: Record<string, any> = {};

      for (const script of scripts) {
        const scriptInfo: any = await invoke('get_script_info', { name: script.name });
        infoMap[script.name] = {
          curr_version: scriptInfo?.version,
          next_version: script.version,
        };
      }
      setScriptsMap(infoMap);
    } catch (error) {
      console.error(error);
    }
  };

  useInit(handleInit);

  useEffect(() => {
    if (!opInfo.opType) return;
    (async () => {
      if (opInfo.opType === 'sync') {
        const isOk = await invoke('sync_scripts', { name: opInfo?.opRecord?.name });
        if (isOk) {
          await handleInit();
          opInfo.resetRecord();
          message.success(`${opInfo?.opRecord?.name} 脚本已同步成功`);
        } else {
          message.error(
            `${opInfo?.opRecord?.name} 脚本同步失败。你可以尝试编辑脚本并点击远程文件链接来复制源代码。`,
          );
        }
      }
    })();
  }, [opInfo.opType]);

  return (
    <div className="chatgpt-script">
      <Table
        rowKey="name"
        scroll={{ x: 800 }}
        columns={columns}
        dataSource={SCRIPTS.map((i) => ({ name: i }))}
        {...TABLE_PAGINATION}
        pagination={false}
      />
    </div>
  );
}
