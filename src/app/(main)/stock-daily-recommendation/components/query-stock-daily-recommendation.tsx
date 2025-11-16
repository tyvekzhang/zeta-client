// SPDX-License-Identifier: MIT

import { Form, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/es/form';
import { RotateCcw, Search } from 'lucide-react';
import React from 'react';

interface QueryStockDailyRecommendationProps {
  onQueryStockDailyRecommendationFinish: (values: any) => void;
  onQueryStockDailyRecommendationReset: () => void;
  onQueryStockDailyRecommendationForm: FormInstance;
}

const queryStockDailyRecommendationFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const QueryStockDailyRecommendationComponent: React.FC<QueryStockDailyRecommendationProps> = ({
  onQueryStockDailyRecommendationFinish,
  onQueryStockDailyRecommendationReset,
  onQueryStockDailyRecommendationForm,
}) => {
  const handleQueryStockDailyRecommendationReset = () => {
    onQueryStockDailyRecommendationReset();
  };

  const handleQueryStockDailyRecommendationSubmit = async () => {
    const values = await onQueryStockDailyRecommendationForm.validateFields();
    onQueryStockDailyRecommendationFinish(values);
  };

  

  return (
    <Form
      {...queryStockDailyRecommendationFormItemLayout}
      form={ onQueryStockDailyRecommendationForm}
      name="queryStockDailyRecommendation"
      onFinish={onQueryStockDailyRecommendationFinish}
    >
      <div className='flex flex-wrap items-center gap-4 pt-6 justify-between'>
        <Form.Item name="stock_symbol_full" label="股票代码" >
          <Input placeholder="请输入股票代码" allowClear />
        </Form.Item>
        <Form.Item name="recommend_date" label="推荐日期" >
          <DatePicker.RangePicker
            allowClear
            format="YYYY-MM-DD"
            placeholder={["请选择开始时间", "请选择结束时间"]}
            presets={[
                { label: '最近7天', value: [dayjs().add(-7, 'd'), dayjs()] },
                { label: '最近14天', value: [dayjs().add(-14, 'd'), dayjs()] },
                { label: '最近30天', value: [dayjs().add(-30, 'd'), dayjs()] },
                { label: '最近90天', value: [dayjs().add(-90, 'd'), dayjs()] },
            ]}
          />
        </Form.Item>
        <Form.Item name="recommend_level" label="推荐等级" >
          <Input placeholder="请输入推荐等级" allowClear />
        </Form.Item>
        <Form.Item name="price" label="当前价" >
          <Input placeholder="请输入当前价" allowClear />
        </Form.Item>
        <Form.Item name="target_price" label="目标价" >
          <Input placeholder="请输入目标价" allowClear />
        </Form.Item>
        <Form.Item name="recommend_reason" label="推荐理由" >
          <Input placeholder="请输入推荐理由" allowClear />
        </Form.Item>
        <Form.Item name="analyst" label="分析师" >
          <Input placeholder="请输入分析师" allowClear />
        </Form.Item>
        <Form.Item name="institution" label="机构名称" >
          <Input placeholder="请输入机构名称" allowClear />
        </Form.Item>
        <Form.Item name="risk_level" label="风险等级" >
          <Input placeholder="请输入风险等级" allowClear />
        </Form.Item>
        <Form.Item name="validity_period" label="有效期" >
          <Input placeholder="请输入有效期" allowClear />
        </Form.Item>
        <Form.Item name="created_at" label="创建时间" >
          <DatePicker.RangePicker
            allowClear
            format="YYYY-MM-DD"
            placeholder={["请选择开始时间", "请选择结束时间"]}
            presets={[
                { label: '最近7天', value: [dayjs().add(-7, 'd'), dayjs()] },
                { label: '最近14天', value: [dayjs().add(-14, 'd'), dayjs()] },
                { label: '最近30天', value: [dayjs().add(-30, 'd'), dayjs()] },
                { label: '最近90天', value: [dayjs().add(-90, 'd'), dayjs()] },
            ]}
          />
        </Form.Item>
        <Form.Item name="updated_at" label="更新时间" >
          <DatePicker.RangePicker
            allowClear
            format="YYYY-MM-DD"
            placeholder={["请选择开始时间", "请选择结束时间"]}
            presets={[
                { label: '最近7天', value: [dayjs().add(-7, 'd'), dayjs()] },
                { label: '最近14天', value: [dayjs().add(-14, 'd'), dayjs()] },
                { label: '最近30天', value: [dayjs().add(-30, 'd'), dayjs()] },
                { label: '最近90天', value: [dayjs().add(-90, 'd'), dayjs()] },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <div className='flex items-center gap-2 justify-start pr-4'>
            <Button
              onClick={handleQueryStockDailyRecommendationReset}
              className="bg-gray-50"
              icon={<RotateCcw size={14} />}
            >
              重置
            </Button>
            <Button
              type="primary"
              icon={<Search size={14} />}
              onClick={handleQueryStockDailyRecommendationSubmit}
            >
              查询
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default QueryStockDailyRecommendationComponent;