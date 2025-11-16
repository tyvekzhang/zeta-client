// SPDX-License-Identifier: MIT

import { Form, Modal, Button, Input } from 'antd';
import { DatePicker } from 'antd';
import { ChevronDown } from 'lucide-react';
import { TreeSelect } from 'antd';
import { TreeSelectUtil } from '@/utils/select-util';
import { IntelligenceInformation } from '@/types/intelligence-information';
import { UpdateIntelligenceInformation } from '@/types/intelligence-information';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

interface UpdateIntelligenceInformationProps {
  isUpdateIntelligenceInformationModalVisible: boolean;
  onUpdateIntelligenceInformationCancel: () => void;
  onUpdateIntelligenceInformationFinish: () => void;
  isUpdateIntelligenceInformationLoading: boolean;
  updateIntelligenceInformationForm: FormInstance<UpdateIntelligenceInformation>;
  treeSelectDataSource?: IntelligenceInformation[];
}

const updateIntelligenceInformationFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const UpdateIntelligenceInformationComponent: React.FC<UpdateIntelligenceInformationProps> = ({
  isUpdateIntelligenceInformationModalVisible,
  onUpdateIntelligenceInformationCancel,
  onUpdateIntelligenceInformationFinish,
  isUpdateIntelligenceInformationLoading,
  updateIntelligenceInformationForm,
  treeSelectDataSource,
}) => {
  const treeSelectDataTransform = [{ name: '根目录', id: 0, children: treeSelectDataSource }];
  const treeSelectData = TreeSelectUtil.convert(treeSelectDataTransform as any);
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onUpdateIntelligenceInformationCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isUpdateIntelligenceInformationLoading} onClick={onUpdateIntelligenceInformationFinish}>
        确定
      </Button>,
    ],
    [isUpdateIntelligenceInformationLoading, onUpdateIntelligenceInformationCancel],
  );

  return (
    <Modal
      title="情报信息编辑"
      open={isUpdateIntelligenceInformationModalVisible}
      onCancel={onUpdateIntelligenceInformationCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...updateIntelligenceInformationFormItemLayout}
          form={ updateIntelligenceInformationForm}
          name="updateIntelligenceInformation"
          onFinish={onUpdateIntelligenceInformationFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="stock_symbol_full" label="股票代码" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票代码" />
          </Form.Item>
          <Form.Item name="news_title" label="标题" rules={[{ required: false, message: '请输入' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="news_content" label="内容" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入内容" />
          </Form.Item>
          <Form.Item name="news_source" label="来源" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入来源" />
          </Form.Item>
          <Form.Item name="publish_time" label="发布时间" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择发布时间" />
          </Form.Item>
          <Form.Item name="news_url" label="新闻链接" rules={[{ required: false, message: '请输入' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="impact_direction" label="影响面" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入影响面" />
          </Form.Item>
          <Form.Item name="impact_level" label="影响程度" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入影响程度" />
          </Form.Item>
          <Form.Item name="updated_at" label="更新时间" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择更新时间" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default UpdateIntelligenceInformationComponent;