// SPDX-License-Identifier: MIT

import { Form, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/es/form';
import { RotateCcw, Search } from 'lucide-react';
import React from 'react';

interface QueryStockBasicInfoProps {
  onQueryStockBasicInfoFinish: (values: any) => void;
  onQueryStockBasicInfoReset: () => void;
  onQueryStockBasicInfoForm: FormInstance;
}

const queryStockBasicInfoFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const QueryStockBasicInfoComponent: React.FC<QueryStockBasicInfoProps> = ({
  onQueryStockBasicInfoFinish,
  onQueryStockBasicInfoReset,
  onQueryStockBasicInfoForm,
}) => {
  const handleQueryStockBasicInfoReset = () => {
    onQueryStockBasicInfoReset();
  };

  const handleQueryStockBasicInfoSubmit = async () => {
    const values = await onQueryStockBasicInfoForm.validateFields();
    onQueryStockBasicInfoFinish(values);
  };

  

  return (
    <Form
      {...queryStockBasicInfoFormItemLayout}
      form={ onQueryStockBasicInfoForm}
      name="queryStockBasicInfo"
      onFinish={onQueryStockBasicInfoFinish}
    >
      <div className='flex flex-wrap items-center gap-4 pt-6 justify-between'>
        <Form.Item name="symbol" label="股票编号" >
          <Input placeholder="请输入股票编号" allowClear />
        </Form.Item>
        <Form.Item name="symbol_full" label="股票代码" >
          <Input placeholder="请输入股票代码" allowClear />
        </Form.Item>
        <Form.Item name="name" label="股票名称" >
          <Input placeholder="请输入股票名称" allowClear />
        </Form.Item>
        <Form.Item name="exchange" label="交易所" >
          <Input placeholder="请输入交易所" allowClear />
        </Form.Item>
        <Form.Item name="listing_date" label="上市日期" >
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
        <Form.Item name="industry" label="行业" >
          <Input placeholder="请输入行业" allowClear />
        </Form.Item>
        <Form.Item name="industry_gy" label="细分行业" >
          <Input placeholder="请输入细分行业" allowClear />
        </Form.Item>
        <Form.Item name="province" label="省份" >
          <Input placeholder="请输入省份" allowClear />
        </Form.Item>
        <Form.Item name="city" label="城市" >
          <Input placeholder="请输入城市" allowClear />
        </Form.Item>
        <Form.Item name="website" label="官网" >
          <Input placeholder="请输入官网" allowClear />
        </Form.Item>
        <Form.Item name="price_tick" label="最小报价单位，1表示0.01元" >
          <Input placeholder="请输入最小报价单位，1表示0.01元" allowClear />
        </Form.Item>
        <Form.Item name="data_source" label="数据来源" >
          <Input placeholder="请输入数据来源" allowClear />
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
              onClick={handleQueryStockBasicInfoReset}
              className="bg-gray-50"
              icon={<RotateCcw size={14} />}
            >
              重置
            </Button>
            <Button
              type="primary"
              icon={<Search size={14} />}
              onClick={handleQueryStockBasicInfoSubmit}
            >
              查询
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default QueryStockBasicInfoComponent;