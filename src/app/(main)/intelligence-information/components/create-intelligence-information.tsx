// SPDX-License-Identifier: MIT

import { Form, Modal, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { CreateIntelligenceInformation } from '@/types/intelligence-information';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

const createIntelligenceInformationFormItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

interface CreateIntelligenceInformationProps {
  isCreateIntelligenceInformationModalVisible: boolean;
  onCreateIntelligenceInformationCancel: () => void;
  onCreateIntelligenceInformationFinish: (createIntelligenceInformation: CreateIntelligenceInformation) => void;
  isCreateIntelligenceInformationLoading: boolean;
  createIntelligenceInformationForm: FormInstance;
}

const CreateIntelligenceInformationComponent: React.FC<CreateIntelligenceInformationProps> = ({
  isCreateIntelligenceInformationModalVisible,
  onCreateIntelligenceInformationCancel,
  onCreateIntelligenceInformationFinish,
  isCreateIntelligenceInformationLoading,
  createIntelligenceInformationForm,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="back" onClick={onCreateIntelligenceInformationCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isCreateIntelligenceInformationLoading} onClick={() => createIntelligenceInformationForm.submit()}>
        确定
      </Button>,
    ],
    [isCreateIntelligenceInformationLoading, createIntelligenceInformationForm, onCreateIntelligenceInformationCancel],
  );

  return (
    <div>
      <Modal
        title="情报信息新增"
        open={isCreateIntelligenceInformationModalVisible}
        onCancel={onCreateIntelligenceInformationCancel}
        footer={footerButtons}
        width={'60%'}
      >
        <Form
          {...createIntelligenceInformationFormItemLayout}
          form={ createIntelligenceInformationForm}
          initialValues={undefined}
          name="createIntelligenceInformation"
          onFinish={onCreateIntelligenceInformationFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="stock_symbol_full" label="股票代码" rules={[{ required: false, message: '请输入股票代码' }]}>
            <Input placeholder="请输入股票代码" />
          </Form.Item>
          <Form.Item name="news_title" label="标题" rules={[{ required: false, message: '请输入标题' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="news_content" label="内容" rules={[{ required: false, message: '请输入内容' }]}>
            <Input placeholder="请输入内容" />
          </Form.Item>
          <Form.Item name="news_source" label="来源" rules={[{ required: false, message: '请输入来源' }]}>
            <Input placeholder="请输入来源" />
          </Form.Item>
          <Form.Item name="publish_time" label="发布时间" rules={[{ required: false, message: '请输入发布时间' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择发布时间" />
          </Form.Item>
          <Form.Item name="news_url" label="新闻链接" rules={[{ required: false, message: '请输入新闻链接' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="impact_direction" label="影响面" rules={[{ required: false, message: '请输入影响面' }]}>
            <Input placeholder="请输入影响面" />
          </Form.Item>
          <Form.Item name="impact_level" label="影响程度" rules={[{ required: false, message: '请输入影响程度' }]}>
            <Input placeholder="请输入影响程度" />
          </Form.Item>
          <Form.Item name="updated_at" label="更新时间" rules={[{ required: false, message: '请输入更新时间' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择更新时间" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateIntelligenceInformationComponent;