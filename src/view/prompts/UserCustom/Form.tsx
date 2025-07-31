import { useEffect, ForwardRefRenderFunction, useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Switch } from 'antd';
import type { FormProps } from 'antd';

import Tags from '@comps/Tags';
import { DISABLE_AUTO_COMPLETE } from '@/utils';

interface UserCustomFormProps {
  record?: Record<string | symbol, any> | null;
}

const initFormValue = {
  act: '',
  enable: true,
  tags: [],
  prompt: '',
};

const UserCustomForm: ForwardRefRenderFunction<FormProps, UserCustomFormProps> = (
  { record },
  ref,
) => {
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => ({ form }));

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record]);

  return (
    <Form form={form} labelCol={{ span: 4 }} initialValues={initFormValue}>
      <Form.Item label="/{cmd}" name="cmd" rules={[{ required: true, message: '请输入 {cmd}！' }]}>
        <Input placeholder="请输入 {cmd}" {...DISABLE_AUTO_COMPLETE} />
      </Form.Item>
      <Form.Item label="动作" name="act" rules={[{ required: true, message: '请输入动作！' }]}>
        <Input placeholder="请输入动作" {...DISABLE_AUTO_COMPLETE} />
      </Form.Item>
      <Form.Item
        label="提示词"
        name="prompt"
        rules={[{ required: true, message: '请输入提示词！' }]}
      >
        <Input.TextArea rows={4} placeholder="请输入提示词" {...DISABLE_AUTO_COMPLETE} />
      </Form.Item>
      <Form.Item label="启用" name="enable" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="标签" name="tags">
        <Tags value={record?.tags} />
      </Form.Item>
    </Form>
  );
};

export default forwardRef(UserCustomForm);
