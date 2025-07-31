import {
  useEffect,
  useState,
  ForwardRefRenderFunction,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Form, Input, Radio, Upload, Tooltip, Button, message } from 'antd';
import { v4 } from 'uuid';
import { UploadOutlined } from '@ant-design/icons';
import type { FormProps, RadioChangeEvent, UploadProps, UploadFile } from 'antd';

import { DISABLE_AUTO_COMPLETE, chatRoot } from '@/utils';

interface SyncFormProps {
  record?: Record<string | symbol, any> | null;
}

const initFormValue = {
  name: '',
  url: '',
  file: null,
  protocol: 'https',
};

const SyncForm: ForwardRefRenderFunction<FormProps, SyncFormProps> = ({ record }, ref) => {
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({ form }));
  const [protocol, setProtocol] = useState('https');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record]);

  const jsonTip = (
    <Tooltip
      title={
        <pre>
          {JSON.stringify(
            [
              { cmd: '', act: '', prompt: '' },
              { cmd: '', act: '', prompt: '' },
            ],
            null,
            2,
          )}
        </pre>
      }
    >
      <a>.json</a>
    </Tooltip>
  );

  const csvTip = (
    <Tooltip
      title={
        <pre>{`"cmd","act","prompt"
"a","aaa","aaa aaa"
"b","bbb","bbb bbb"
"c","ccc","ccc ccc"`}</pre>
      }
    >
      <a>.csv</a>
    </Tooltip>
  );

  const handleType = (e: RadioChangeEvent) => {
    setProtocol(e.target.value);
  };

  const uploadOptions: UploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    customRequest: () => {},
    beforeUpload: (file) => {
      const isCSV = /.csv$/.test(file.name);
      const isJSON = /.json$/.test(file.name);
      const isOk = isCSV || isJSON;
      if (!isOk) {
        message.error('只能上传 .json 或 .csv 文件！');
      } else {
        setFileList([file]);
      }
      return isOk || Upload.LIST_IGNORE;
    },
    maxCount: 1,
    fileList,
  };

  return (
    <>
      <Form form={form} labelCol={{ span: 4 }} initialValues={initFormValue}>
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称！' }]}>
          <Input placeholder="请输入名称" {...DISABLE_AUTO_COMPLETE} />
        </Form.Item>
        <Form.Item label="协议" name="protocol" rules={[{ required: true }]}>
          <Radio.Group onChange={handleType} value={protocol}>
            <Radio value="https">https</Radio>
            <Radio value="http">http</Radio>
            <Radio value="local">local</Radio>
          </Radio.Group>
        </Form.Item>
        {['http', 'https'].includes(protocol) && (
          <div style={{ height: 180 }}>
            <Form.Item
              label="URL"
              name="url"
              rules={[
                { required: true, message: '请输入URL！' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || /\.json$|\.csv$/.test(getFieldValue('url'))) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('文件仅支持 .csv 和 .json 格式'));
                  },
                }),
              ]}
            >
              <Input
                placeholder="your_path/file_name.ext"
                addonBefore={`${protocol}://`}
                {...DISABLE_AUTO_COMPLETE}
              />
            </Form.Item>
            <div style={{ marginLeft: 80, color: '#888' }}>
              <p>
                <b>.ext</b>: 仅支持 {csvTip} 或 {jsonTip} 文件格式。
              </p>
            </div>
          </div>
        )}
        {protocol === 'local' && (
          <Form.Item
            name="file"
            label="文件"
            rules={[{ required: true, message: '请选择文件！' }]}
            style={{ height: 168 }}
          >
            <Upload.Dragger {...uploadOptions}>
              <Button icon={<UploadOutlined />}>点击上传</Button>
              <p className="ant-upload-hint">
                仅支持 {csvTip} 或 {jsonTip} 文件格式。
              </p>
            </Upload.Dragger>
          </Form.Item>
        )}
        <Form.Item style={{ display: 'none' }} name="id" initialValue={v4().replace(/-/g, '')}>
          <input />
        </Form.Item>
      </Form>
    </>
  );
};

export default forwardRef(SyncForm);
