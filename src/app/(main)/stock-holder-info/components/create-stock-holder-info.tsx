// SPDX-License-Identifier: MIT

import { Form, Modal, Button } from 'antd';
import { Input } from 'antd';
import { Select, Radio } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { CreateStockHolderInfo } from '@/types/stock-holder-info';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

const createStockHolderInfoFormItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

interface CreateStockHolderInfoProps {
  isCreateStockHolderInfoModalVisible: boolean;
  onCreateStockHolderInfoCancel: () => void;
  onCreateStockHolderInfoFinish: (createStockHolderInfo: CreateStockHolderInfo) => void;
  isCreateStockHolderInfoLoading: boolean;
  createStockHolderInfoForm: FormInstance;
}

const CreateStockHolderInfoComponent: React.FC<CreateStockHolderInfoProps> = ({
  isCreateStockHolderInfoModalVisible,
  onCreateStockHolderInfoCancel,
  onCreateStockHolderInfoFinish,
  isCreateStockHolderInfoLoading,
  createStockHolderInfoForm,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="back" onClick={onCreateStockHolderInfoCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isCreateStockHolderInfoLoading} onClick={() => createStockHolderInfoForm.submit()}>
        确定
      </Button>,
    ],
    [isCreateStockHolderInfoLoading, createStockHolderInfoForm, onCreateStockHolderInfoCancel],
  );

  return (
    <div>
      <Modal
        title="股东信息新增"
        open={isCreateStockHolderInfoModalVisible}
        onCancel={onCreateStockHolderInfoCancel}
        footer={footerButtons}
        width={'60%'}
      >
        <Form
          {...createStockHolderInfoFormItemLayout}
          form={ createStockHolderInfoForm}
          initialValues={undefined}
          name="createStockHolderInfo"
          onFinish={onCreateStockHolderInfoFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="stock_symbol_full" label="股票代码" rules={[{ required: false, message: '请输入股票代码' }]}>
            <Input placeholder="请输入股票代码" />
          </Form.Item>
          <Form.Item name="holder_name" label="股东名称" rules={[{ required: false, message: '请输入股东名称' }]}>
            <Input placeholder="请输入股东名称" />
          </Form.Item>
          <Form.Item name="holder_info" label="股东信息" rules={[{ required: false, message: '请输入股东信息' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="holder_type" label="股东类型" rules={[{ required: false, message: '请输入股东类型' }]}>
            <Select placeholder="请选择股东类型" />
          </Form.Item>
          <Form.Item name="share_amount" label="持股数量" rules={[{ required: false, message: '请输入持股数量' }]}>
            <Input placeholder="请输入持股数量" />
          </Form.Item>
          <Form.Item name="share_ratio" label="持股比例" rules={[{ required: false, message: '请输入持股比例' }]}>
            <Input placeholder="请输入持股比例" />
          </Form.Item>
          <Form.Item name="change_amount" label="持股变动数量" rules={[{ required: false, message: '请输入持股变动数量' }]}>
            <Input placeholder="请输入持股变动数量" />
          </Form.Item>
          <Form.Item name="change_type" label="变动类型" rules={[{ required: false, message: '请输入变动类型' }]}>
            <Select placeholder="请选择变动类型" />
          </Form.Item>
          <Form.Item name="report_date" label="报告日期" rules={[{ required: false, message: '请输入报告日期' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择报告日期" />
          </Form.Item>
          <Form.Item name="is_top_ten" label="是否十大股东" rules={[{ required: false, message: '请输入是否十大股东' }]}>
            <Input placeholder="请输入是否十大股东" />
          </Form.Item>
          <Form.Item name="ranking" label="股东排名" rules={[{ required: false, message: '请输入股东排名' }]}>
            <Input placeholder="请输入股东排名" />
          </Form.Item>
          <Form.Item name="updated_at" label="更新时间" rules={[{ required: false, message: '请输入更新时间' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择更新时间" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateStockHolderInfoComponent;