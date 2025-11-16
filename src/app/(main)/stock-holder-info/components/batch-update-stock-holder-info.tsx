// SPDX-License-Identifier: MIT

import { Form, Modal, Button } from 'antd';
import { Input } from 'antd';
import { Select, Radio } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { BatchUpdateStockHolderInfo } from '@/types/stock-holder-info';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';


interface BatchUpdateStockHolderInfosProps {
  isBatchUpdateStockHolderInfosModalVisible: boolean;
  onBatchUpdateStockHolderInfosCancel: () => void;
  onBatchUpdateStockHolderInfosFinish: () => void;
  isBatchUpdateStockHolderInfosLoading: boolean;
  batchUpdateStockHolderInfosForm: FormInstance<BatchUpdateStockHolderInfo>;
}

const batchUpdateStockHolderInfosFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const BatchUpdateStockHolderInfosComponent: React.FC<BatchUpdateStockHolderInfosProps> = ({
  isBatchUpdateStockHolderInfosModalVisible,
  onBatchUpdateStockHolderInfosCancel,
  onBatchUpdateStockHolderInfosFinish,
  isBatchUpdateStockHolderInfosLoading,
  batchUpdateStockHolderInfosForm,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onBatchUpdateStockHolderInfosCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isBatchUpdateStockHolderInfosLoading} onClick={onBatchUpdateStockHolderInfosFinish}>
        确定
      </Button>,
    ],
    [isBatchUpdateStockHolderInfosLoading, onBatchUpdateStockHolderInfosCancel],
  );

  return (
    <Modal
      title="股东信息批量编辑"
      open={isBatchUpdateStockHolderInfosModalVisible}
      onCancel={onBatchUpdateStockHolderInfosCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...batchUpdateStockHolderInfosFormItemLayout}
          form={ batchUpdateStockHolderInfosForm}
          name="batchUpdateStockHolderInfos"
          onFinish={onBatchUpdateStockHolderInfosFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="stock_symbol_full" label="股票代码" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票代码" />
          </Form.Item>
          <Form.Item name="holder_name" label="股东名称" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股东名称" />
          </Form.Item>
          <Form.Item name="holder_info" label="股东信息" rules={[{ required: false, message: '请输入' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="holder_type" label="股东类型" rules={[{ required: false, message: '请输入' }]}>
            <Select placeholder="请选择股东类型" />
          </Form.Item>
          <Form.Item name="share_amount" label="持股数量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入持股数量" />
          </Form.Item>
          <Form.Item name="share_ratio" label="持股比例" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入持股比例" />
          </Form.Item>
          <Form.Item name="change_amount" label="持股变动数量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入持股变动数量" />
          </Form.Item>
          <Form.Item name="change_type" label="变动类型" rules={[{ required: false, message: '请输入' }]}>
            <Select placeholder="请选择变动类型" />
          </Form.Item>
          <Form.Item name="report_date" label="报告日期" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择报告日期" />
          </Form.Item>
          <Form.Item name="is_top_ten" label="是否十大股东" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入是否十大股东" />
          </Form.Item>
          <Form.Item name="ranking" label="股东排名" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股东排名" />
          </Form.Item>
          <Form.Item name="updated_at" label="更新时间" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择更新时间" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default BatchUpdateStockHolderInfosComponent;