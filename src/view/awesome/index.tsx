import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Modal, Popconfirm, Button, Tooltip, Tag, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { invoke, dialog, process } from '@tauri-apps/api';

import useJson from '@/hooks/useJson';
import useData from '@/hooks/useData';
import useColumns from '@/hooks/useColumns';
import FilePath from '@/components/FilePath';
import { CHAT_AWESOME_JSON } from '@/utils';
import { useTableRowSelection, TABLE_PAGINATION } from '@/hooks/useTable';
import { awesomeColumns } from './config';
import AwesomeForm from './Form';

export default function Awesome() {
  const formRef = useRef<any>(null);
  const [isVisible, setVisible] = useState(false);
  const { opData, opInit, opAdd, opReplace, opReplaceItems, opRemove, opRemoveItems, opSafeKey } =
    useData([]);
  const { columns, ...opInfo } = useColumns(awesomeColumns());
  const { rowSelection, selectedRowIDs, rowReset } = useTableRowSelection();
  const { json, updateJson } = useJson<any[]>(CHAT_AWESOME_JSON);
  const selectedItems = rowSelection.selectedRowKeys || [];

  useEffect(() => {
    if (!json || json.length <= 0) return;
    opInit(json);
  }, [json?.length]);

  useEffect(() => {
    if (!opInfo.opType) return;
    if (['edit', 'new'].includes(opInfo.opType)) {
      setVisible(true);
    }
    if (['delete'].includes(opInfo.opType)) {
      const data = opRemove(opInfo?.opRecord?.[opSafeKey]);
      updateJson(data);
      opInfo.resetRecord();
    }
    if (opInfo.opType === 'default' && opInfo.opRecord) {
      // Enforce a single default in the list
      const currentUrl = opInfo.opRecord.url;
      const next = (opData || []).map((item) => ({
        ...item,
        default: item.url === currentUrl,
      }));
      // Persist awesome list
      updateJson(next);
      // Sync chat.conf.json: set default_origin, main_origin, tray_origin then prompt restart
      (async () => {
        try {
          await invoke('form_confirm', {
            data: {
              default_origin: currentUrl,
              main_origin: currentUrl,
              tray_origin: currentUrl,
            },
            label: 'main',
          });
          const isOk = await dialog.ask('默认URL已更新，是否现在重启？', {
            title: 'ChatGPT 偏好设置',
          });
          if (isOk) {
            await process.relaunch();
          } else {
            message.success('默认URL已设置');
          }
        } catch (e) {
          console.error(e);
          message.error('同步配置失败');
        } finally {
          opInfo.resetRecord();
        }
      })();
    }
  }, [opInfo.opType, formRef]);

  const hide = () => {
    setVisible(false);
    opInfo.resetRecord();
  };

  useEffect(() => {
    if (opInfo.opType === 'enable') {
      const data = opReplace(opInfo?.opRecord?.[opSafeKey], opInfo?.opRecord);
      updateJson(data);
    }
  }, [opInfo.opTime]);

  const handleDelete = () => {
    const data = opRemoveItems(selectedRowIDs);
    updateJson(data);
    rowReset();
    message.success('所有选中的URL已删除');
  };

  const handleOk = () => {
    formRef.current?.form?.validateFields().then(async (vals: Record<string, any>) => {
      let idx = opData.findIndex((i) => i.url === vals.url);
      if (vals.url === opInfo?.opRecord?.url) {
        idx = -1;
      }
      if (idx === -1) {
        if (opInfo.opType === 'new') {
          const data = opAdd(vals);
          await updateJson(data);
          opInit(data);
          message.success('数据添加成功');
        }
        if (opInfo.opType === 'edit') {
          const data = opReplace(opInfo?.opRecord?.[opSafeKey], vals);
          await updateJson(data);
          message.success('数据更新成功');
        }
        hide();
      } else {
        const data = opData[idx];
        message.error(
          <div style={{ width: 360 }}>
            <div>
              <b>
                {data.title}: {data.url}
              </b>
            </div>
            <div>此URL已存在，请编辑后重试。</div>
          </div>,
        );
      }
    });
  };

  const handleEnable = (isEnable: boolean) => {
    const data = opReplaceItems(selectedRowIDs, { enable: isEnable });
    updateJson(data);
  };

  const handlePreview = () => {
    invoke('wa_window', {
      label: 'awesome_preview',
      url: 'index.html?type=preview',
      title: '预览仪表板',
    });
  };

  const modalTitle = `${{ new: '创建', edit: '编辑' }[opInfo.opType]} URL`;

  return (
    <div>
      <div className="chat-table-btns">
        <div>
          <Button className="chat-add-btn" type="primary" onClick={opInfo.opNew}>
            添加URL
          </Button>
          <Button type="dashed" onClick={handlePreview}>
            预览仪表板
          </Button>
          <PreviewTip />
        </div>
        <div>
          {selectedItems.length > 0 && (
            <>
              <Button type="primary" onClick={() => handleEnable(true)}>
                启用
              </Button>
              <Button onClick={() => handleEnable(false)}>禁用</Button>
              <Popconfirm
                overlayStyle={{ width: 250 }}
                title="URL删除后无法恢复，确定要删除吗？"
                placement="topLeft"
                onConfirm={handleDelete}
                okText="是"
                cancelText="否"
              >
                <Button>删除</Button>
              </Popconfirm>
              <span className="num">已选择 {selectedItems.length} 项</span>
            </>
          )}
        </div>
      </div>
      <FilePath paths={CHAT_AWESOME_JSON} />
      <Table
        rowKey="url"
        columns={columns}
        scroll={{ x: 800 }}
        dataSource={opData}
        rowSelection={rowSelection}
        pagination={TABLE_PAGINATION}
      />
      <Modal
        open={isVisible}
        title={modalTitle}
        onCancel={hide}
        onOk={handleOk}
        destroyOnClose
        maskClosable={false}
      >
        <AwesomeForm ref={formRef} record={opInfo?.opRecord} />
      </Modal>
    </div>
  );
}

const PreviewTip = () => {
  const go = useNavigate();
  const handleGo = (v: string) => {
    go(`/settings?type=${v}`);
  };

  return (
    <Tooltip
      overlayInnerStyle={{ width: 400 }}
      title={
        <div className="awesome-tips">
          点击按钮预览，在
          <Link to="/settings"> 设置 </Link>
          中可以将单个URL或仪表板设置为应用的默认窗口。
          <br />
          <Tag onClick={() => handleGo('main_window')} color="blue">
            主窗口
          </Tag>
          {'或 '}
          <Tag onClick={() => handleGo('tray_window')} color="blue">
            系统托盘窗口
          </Tag>
        </div>
      }
    >
      <QuestionCircleOutlined style={{ marginLeft: 5, color: '#1677ff' }} />
    </Tooltip>
  );
};
