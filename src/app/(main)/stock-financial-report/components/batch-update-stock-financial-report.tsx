// SPDX-License-Identifier: MIT

import { Form, Modal, Button } from 'antd';
import { Input } from 'antd';
import { Select, Radio } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { BatchUpdateStockFinancialReport } from '@/types/stock-financial-report';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';


interface BatchUpdateStockFinancialReportsProps {
  isBatchUpdateStockFinancialReportsModalVisible: boolean;
  onBatchUpdateStockFinancialReportsCancel: () => void;
  onBatchUpdateStockFinancialReportsFinish: () => void;
  isBatchUpdateStockFinancialReportsLoading: boolean;
  batchUpdateStockFinancialReportsForm: FormInstance<BatchUpdateStockFinancialReport>;
}

const batchUpdateStockFinancialReportsFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const BatchUpdateStockFinancialReportsComponent: React.FC<BatchUpdateStockFinancialReportsProps> = ({
  isBatchUpdateStockFinancialReportsModalVisible,
  onBatchUpdateStockFinancialReportsCancel,
  onBatchUpdateStockFinancialReportsFinish,
  isBatchUpdateStockFinancialReportsLoading,
  batchUpdateStockFinancialReportsForm,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onBatchUpdateStockFinancialReportsCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isBatchUpdateStockFinancialReportsLoading} onClick={onBatchUpdateStockFinancialReportsFinish}>
        确定
      </Button>,
    ],
    [isBatchUpdateStockFinancialReportsLoading, onBatchUpdateStockFinancialReportsCancel],
  );

  return (
    <Modal
      title="股票财报批量编辑"
      open={isBatchUpdateStockFinancialReportsModalVisible}
      onCancel={onBatchUpdateStockFinancialReportsCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...batchUpdateStockFinancialReportsFormItemLayout}
          form={ batchUpdateStockFinancialReportsForm}
          name="batchUpdateStockFinancialReports"
          onFinish={onBatchUpdateStockFinancialReportsFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="file_id" label="文件主键" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入文件主键" />
          </Form.Item>
          <Form.Item name="stock_symbol_full" label="股票代码" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票代码" />
          </Form.Item>
          <Form.Item name="report_date" label="报告期" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择报告期" />
          </Form.Item>
          <Form.Item name="report_type" label="报告类型" rules={[{ required: false, message: '请输入' }]}>
            <Select placeholder="请选择报告类型" />
          </Form.Item>
          <Form.Item name="total_revenue" label="营业收入" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入营业收入" />
          </Form.Item>
          <Form.Item name="net_profit" label="净利润" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入净利润" />
          </Form.Item>
          <Form.Item name="total_assets" label="总资产" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入总资产" />
          </Form.Item>
          <Form.Item name="total_liabilities" label="总负债" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入总负债" />
          </Form.Item>
          <Form.Item name="net_assets" label="净资产" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入净资产" />
          </Form.Item>
          <Form.Item name="eps" label="每股收益" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入每股收益" />
          </Form.Item>
          <Form.Item name="roe" label="净资产收益率" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入净资产收益率" />
          </Form.Item>
          <Form.Item name="gross_profit_margin" label="毛利率" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入毛利率" />
          </Form.Item>
          <Form.Item name="report_source" label="报告来源" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入报告来源" />
          </Form.Item>
          <Form.Item name="earnings_announcement_date" label="预约披露日期" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择预约披露日期" />
          </Form.Item>
          <Form.Item name="published_date" label="发布日期" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择发布日期" />
          </Form.Item>
          <Form.Item name="comment" label="备注" rules={[{ required: false, message: '请输入' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="updated_at" label="更新时间" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择更新时间" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default BatchUpdateStockFinancialReportsComponent;