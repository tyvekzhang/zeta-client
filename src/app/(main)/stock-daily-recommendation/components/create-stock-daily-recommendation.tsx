// SPDX-License-Identifier: MIT

import { Form, Modal, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { CreateStockDailyRecommendation } from '@/types/stock-daily-recommendation';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

const createStockDailyRecommendationFormItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

interface CreateStockDailyRecommendationProps {
  isCreateStockDailyRecommendationModalVisible: boolean;
  onCreateStockDailyRecommendationCancel: () => void;
  onCreateStockDailyRecommendationFinish: (createStockDailyRecommendation: CreateStockDailyRecommendation) => void;
  isCreateStockDailyRecommendationLoading: boolean;
  createStockDailyRecommendationForm: FormInstance;
}

const CreateStockDailyRecommendationComponent: React.FC<CreateStockDailyRecommendationProps> = ({
  isCreateStockDailyRecommendationModalVisible,
  onCreateStockDailyRecommendationCancel,
  onCreateStockDailyRecommendationFinish,
  isCreateStockDailyRecommendationLoading,
  createStockDailyRecommendationForm,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="back" onClick={onCreateStockDailyRecommendationCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isCreateStockDailyRecommendationLoading} onClick={() => createStockDailyRecommendationForm.submit()}>
        确定
      </Button>,
    ],
    [isCreateStockDailyRecommendationLoading, createStockDailyRecommendationForm, onCreateStockDailyRecommendationCancel],
  );

  return (
    <div>
      <Modal
        title="股票每日推荐新增"
        open={isCreateStockDailyRecommendationModalVisible}
        onCancel={onCreateStockDailyRecommendationCancel}
        footer={footerButtons}
        width={'60%'}
      >
        <Form
          {...createStockDailyRecommendationFormItemLayout}
          form={ createStockDailyRecommendationForm}
          initialValues={undefined}
          name="createStockDailyRecommendation"
          onFinish={onCreateStockDailyRecommendationFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="stock_symbol_full" label="股票代码" rules={[{ required: false, message: '请输入股票代码' }]}>
            <Input placeholder="请输入股票代码" />
          </Form.Item>
          <Form.Item name="recommend_date" label="推荐日期" rules={[{ required: false, message: '请输入推荐日期' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择推荐日期" />
          </Form.Item>
          <Form.Item name="recommend_level" label="推荐等级" rules={[{ required: false, message: '请输入推荐等级' }]}>
            <Input placeholder="请输入推荐等级" />
          </Form.Item>
          <Form.Item name="price" label="当前价" rules={[{ required: false, message: '请输入当前价' }]}>
            <Input placeholder="请输入当前价" />
          </Form.Item>
          <Form.Item name="target_price" label="目标价" rules={[{ required: false, message: '请输入目标价' }]}>
            <Input placeholder="请输入目标价" />
          </Form.Item>
          <Form.Item name="recommend_reason" label="推荐理由" rules={[{ required: false, message: '请输入推荐理由' }]}>
            <Input placeholder="请输入推荐理由" />
          </Form.Item>
          <Form.Item name="analyst" label="分析师" rules={[{ required: false, message: '请输入分析师' }]}>
            <Input placeholder="请输入分析师" />
          </Form.Item>
          <Form.Item name="institution" label="机构名称" rules={[{ required: false, message: '请输入机构名称' }]}>
            <Input placeholder="请输入机构名称" />
          </Form.Item>
          <Form.Item name="risk_level" label="风险等级" rules={[{ required: false, message: '请输入风险等级' }]}>
            <Input placeholder="请输入风险等级" />
          </Form.Item>
          <Form.Item name="validity_period" label="有效期" rules={[{ required: false, message: '请输入有效期' }]}>
            <Input placeholder="请输入有效期" />
          </Form.Item>
          <Form.Item name="updated_at" label="更新时间" rules={[{ required: false, message: '请输入更新时间' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择更新时间" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateStockDailyRecommendationComponent;