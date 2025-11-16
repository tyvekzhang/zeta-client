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

interface QueryStockFinancialReportProps {
  onQueryStockFinancialReportFinish: (values: any) => void;
  onQueryStockFinancialReportReset: () => void;
  onQueryStockFinancialReportForm: FormInstance;
}

const queryStockFinancialReportFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const QueryStockFinancialReportComponent: React.FC<QueryStockFinancialReportProps> = ({
  onQueryStockFinancialReportFinish,
  onQueryStockFinancialReportReset,
  onQueryStockFinancialReportForm,
}) => {
  const handleQueryStockFinancialReportReset = () => {
    onQueryStockFinancialReportReset();
  };

  const handleQueryStockFinancialReportSubmit = async () => {
    const values = await onQueryStockFinancialReportForm.validateFields();
    onQueryStockFinancialReportFinish(values);
  };

  

  return (
    <Form
      {...queryStockFinancialReportFormItemLayout}
      form={ onQueryStockFinancialReportForm}
      name="queryStockFinancialReport"
      onFinish={onQueryStockFinancialReportFinish}
    >
      <div className='flex flex-wrap items-center gap-4 pt-6 justify-between'>
        <Form.Item name="stock_symbol_full" label="股票代码" >
          <Input placeholder="请输入股票代码" allowClear />
        </Form.Item>
        <Form.Item name="report_date" label="报告期" >
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
        <Form.Item name="report_type" label="报告类型" >
          <Select placeholder="请选择报告类型" allowClear />
        </Form.Item>
        <Form.Item name="total_revenue" label="营业收入" >
          <Input placeholder="请输入营业收入" allowClear />
        </Form.Item>
        <Form.Item name="net_profit" label="净利润" >
          <Input placeholder="请输入净利润" allowClear />
        </Form.Item>
        <Form.Item name="total_assets" label="总资产" >
          <Input placeholder="请输入总资产" allowClear />
        </Form.Item>
        <Form.Item name="total_liabilities" label="总负债" >
          <Input placeholder="请输入总负债" allowClear />
        </Form.Item>
        <Form.Item name="net_assets" label="净资产" >
          <Input placeholder="请输入净资产" allowClear />
        </Form.Item>
        <Form.Item name="eps" label="每股收益" >
          <Input placeholder="请输入每股收益" allowClear />
        </Form.Item>
        <Form.Item name="roe" label="净资产收益率" >
          <Input placeholder="请输入净资产收益率" allowClear />
        </Form.Item>
        <Form.Item name="gross_profit_margin" label="毛利率" >
          <Input placeholder="请输入毛利率" allowClear />
        </Form.Item>
        <Form.Item name="report_source" label="报告来源" >
          <Input placeholder="请输入报告来源" allowClear />
        </Form.Item>
        <Form.Item name="earnings_announcement_date" label="预约披露日期" >
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
        <Form.Item name="published_date" label="发布日期" >
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
              onClick={handleQueryStockFinancialReportReset}
              className="bg-gray-50"
              icon={<RotateCcw size={14} />}
            >
              重置
            </Button>
            <Button
              type="primary"
              icon={<Search size={14} />}
              onClick={handleQueryStockFinancialReportSubmit}
            >
              查询
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default QueryStockFinancialReportComponent;