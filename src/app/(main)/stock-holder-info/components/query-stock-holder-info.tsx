// SPDX-License-Identifier: MIT

import { Form, Button } from 'antd';
import { Input } from 'antd';
import { Select, Radio } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/es/form';
import { RotateCcw, Search } from 'lucide-react';
import React from 'react';

interface QueryStockHolderInfoProps {
  onQueryStockHolderInfoFinish: (values: any) => void;
  onQueryStockHolderInfoReset: () => void;
  onQueryStockHolderInfoForm: FormInstance;
}

const queryStockHolderInfoFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const QueryStockHolderInfoComponent: React.FC<QueryStockHolderInfoProps> = ({
  onQueryStockHolderInfoFinish,
  onQueryStockHolderInfoReset,
  onQueryStockHolderInfoForm,
}) => {
  const handleQueryStockHolderInfoReset = () => {
    onQueryStockHolderInfoReset();
  };

  const handleQueryStockHolderInfoSubmit = async () => {
    const values = await onQueryStockHolderInfoForm.validateFields();
    onQueryStockHolderInfoFinish(values);
  };

  

  return (
    <Form
      {...queryStockHolderInfoFormItemLayout}
      form={ onQueryStockHolderInfoForm}
      name="queryStockHolderInfo"
      onFinish={onQueryStockHolderInfoFinish}
    >
      <div className='flex flex-wrap items-center gap-4 pt-6 justify-between'>
        <Form.Item name="stock_symbol_full" label="股票代码" >
          <Input placeholder="请输入股票代码" allowClear />
        </Form.Item>
        <Form.Item name="holder_name" label="股东名称" >
          <Input placeholder="请输入股东名称" allowClear />
        </Form.Item>
        <Form.Item name="holder_info" label="股东信息" >
          <Input placeholder="请输入股东信息" allowClear />
        </Form.Item>
        <Form.Item name="holder_type" label="股东类型" >
          <Select placeholder="请选择股东类型" allowClear />
        </Form.Item>
        <Form.Item name="share_amount" label="持股数量" >
          <Input placeholder="请输入持股数量" allowClear />
        </Form.Item>
        <Form.Item name="share_ratio" label="持股比例" >
          <Input placeholder="请输入持股比例" allowClear />
        </Form.Item>
        <Form.Item name="change_amount" label="持股变动数量" >
          <Input placeholder="请输入持股变动数量" allowClear />
        </Form.Item>
        <Form.Item name="change_type" label="变动类型" >
          <Select placeholder="请选择变动类型" allowClear />
        </Form.Item>
        <Form.Item name="report_date" label="报告日期" >
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
        <Form.Item name="is_top_ten" label="是否十大股东" >
          <Input placeholder="请输入是否十大股东" allowClear />
        </Form.Item>
        <Form.Item name="ranking" label="股东排名" >
          <Input placeholder="请输入股东排名" allowClear />
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
              onClick={handleQueryStockHolderInfoReset}
              className="bg-gray-50"
              icon={<RotateCcw size={14} />}
            >
              重置
            </Button>
            <Button
              type="primary"
              icon={<Search size={14} />}
              onClick={handleQueryStockHolderInfoSubmit}
            >
              查询
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default QueryStockHolderInfoComponent;