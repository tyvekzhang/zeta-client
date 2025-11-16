// SPDX-License-Identifier: MIT

import { Form, Modal, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { BatchUpdateStockDailyRecommendation } from '@/types/stock-daily-recommendation';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';


interface BatchUpdateStockDailyRecommendationsProps {
  isBatchUpdateStockDailyRecommendationsModalVisible: boolean;
  onBatchUpdateStockDailyRecommendationsCancel: () => void;
  onBatchUpdateStockDailyRecommendationsFinish: () => void;
  isBatchUpdateStockDailyRecommendationsLoading: boolean;
  batchUpdateStockDailyRecommendationsForm: FormInstance<BatchUpdateStockDailyRecommendation>;
}

const batchUpdateStockDailyRecommendationsFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const BatchUpdateStockDailyRecommendationsComponent: React.FC<BatchUpdateStockDailyRecommendationsProps> = ({
  isBatchUpdateStockDailyRecommendationsModalVisible,
  onBatchUpdateStockDailyRecommendationsCancel,
  onBatchUpdateStockDailyRecommendationsFinish,
  isBatchUpdateStockDailyRecommendationsLoading,
  batchUpdateStockDailyRecommendationsForm,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onBatchUpdateStockDailyRecommendationsCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isBatchUpdateStockDailyRecommendationsLoading} onClick={onBatchUpdateStockDailyRecommendationsFinish}>
        确定
      </Button>,
    ],
    [isBatchUpdateStockDailyRecommendationsLoading, onBatchUpdateStockDailyRecommendationsCancel],
  );

  return (
    <Modal
      title="股票每日推荐批量编辑"
      open={isBatchUpdateStockDailyRecommendationsModalVisible}
      onCancel={onBatchUpdateStockDailyRecommendationsCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...batchUpdateStockDailyRecommendationsFormItemLayout}
          form={ batchUpdateStockDailyRecommendationsForm}
          name="batchUpdateStockDailyRecommendations"
          onFinish={onBatchUpdateStockDailyRecommendationsFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="stock_symbol_full" label="股票代码" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票代码" />
          </Form.Item>
          <Form.Item name="recommend_date" label="推荐日期" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择推荐日期" />
          </Form.Item>
          <Form.Item name="recommend_level" label="推荐等级" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入推荐等级" />
          </Form.Item>
          <Form.Item name="price" label="当前价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入当前价" />
          </Form.Item>
          <Form.Item name="target_price" label="目标价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入目标价" />
          </Form.Item>
          <Form.Item name="recommend_reason" label="推荐理由" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入推荐理由" />
          </Form.Item>
          <Form.Item name="analyst" label="分析师" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入分析师" />
          </Form.Item>
          <Form.Item name="institution" label="机构名称" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入机构名称" />
          </Form.Item>
          <Form.Item name="risk_level" label="风险等级" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入风险等级" />
          </Form.Item>
          <Form.Item name="validity_period" label="有效期" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入有效期" />
          </Form.Item>
          <Form.Item name="updated_at" label="更新时间" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择更新时间" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default BatchUpdateStockDailyRecommendationsComponent;