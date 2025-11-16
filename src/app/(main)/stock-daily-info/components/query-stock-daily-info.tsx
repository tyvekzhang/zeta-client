// SPDX-License-Identifier: MIT

import { Form, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/es/form';
import { RotateCcw, Search } from 'lucide-react';
import React from 'react';

interface QueryStockDailyInfoProps {
  onQueryStockDailyInfoFinish: (values: any) => void;
  onQueryStockDailyInfoReset: () => void;
  onQueryStockDailyInfoForm: FormInstance;
}

const queryStockDailyInfoFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const QueryStockDailyInfoComponent: React.FC<QueryStockDailyInfoProps> = ({
  onQueryStockDailyInfoFinish,
  onQueryStockDailyInfoReset,
  onQueryStockDailyInfoForm,
}) => {
  const handleQueryStockDailyInfoReset = () => {
    onQueryStockDailyInfoReset();
  };

  const handleQueryStockDailyInfoSubmit = async () => {
    const values = await onQueryStockDailyInfoForm.validateFields();
    onQueryStockDailyInfoFinish(values);
  };

  

  return (
    <Form
      {...queryStockDailyInfoFormItemLayout}
      form={ onQueryStockDailyInfoForm}
      name="queryStockDailyInfo"
      onFinish={onQueryStockDailyInfoFinish}
    >
      <div className='flex flex-wrap items-center gap-4 pt-6 justify-between'>
        <Form.Item name="stock_symbol_full" label="股票代码" >
          <Input placeholder="请输入股票代码" allowClear />
        </Form.Item>
        <Form.Item name="trade_date" label="交易日期" >
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
        <Form.Item name="open_price" label="开盘价" >
          <Input placeholder="请输入开盘价" allowClear />
        </Form.Item>
        <Form.Item name="close_price" label="收盘价" >
          <Input placeholder="请输入收盘价" allowClear />
        </Form.Item>
        <Form.Item name="high_price" label="最高价" >
          <Input placeholder="请输入最高价" allowClear />
        </Form.Item>
        <Form.Item name="low_price" label="最低价" >
          <Input placeholder="请输入最低价" allowClear />
        </Form.Item>
        <Form.Item name="volume" label="成交量" >
          <Input placeholder="请输入成交量" allowClear />
        </Form.Item>
        <Form.Item name="turnover" label="成交额" >
          <Input placeholder="请输入成交额" allowClear />
        </Form.Item>
        <Form.Item name="change_amount" label="涨跌额" >
          <Input placeholder="请输入涨跌额" allowClear />
        </Form.Item>
        <Form.Item name="change_rate" label="涨跌幅" >
          <Input placeholder="请输入涨跌幅" allowClear />
        </Form.Item>
        <Form.Item name="pe_ratio" label="市盈率" >
          <Input placeholder="请输入市盈率" allowClear />
        </Form.Item>
        <Form.Item name="pb_ratio" label="市净率" >
          <Input placeholder="请输入市净率" allowClear />
        </Form.Item>
        <Form.Item name="market_cap" label="总市值" >
          <Input placeholder="请输入总市值" allowClear />
        </Form.Item>
        <Form.Item name="circulating_market_cap" label="流通市值" >
          <Input placeholder="请输入流通市值" allowClear />
        </Form.Item>
        <Form.Item name="turnover_rate" label="换手率" >
          <Input placeholder="请输入换手率" allowClear />
        </Form.Item>
        <Form.Item name="bid_price1" label="买一价" >
          <Input placeholder="请输入买一价" allowClear />
        </Form.Item>
        <Form.Item name="bid_price2" label="买二价" >
          <Input placeholder="请输入买二价" allowClear />
        </Form.Item>
        <Form.Item name="bid_price3" label="买三价" >
          <Input placeholder="请输入买三价" allowClear />
        </Form.Item>
        <Form.Item name="bid_price4" label="买四价" >
          <Input placeholder="请输入买四价" allowClear />
        </Form.Item>
        <Form.Item name="bid_price5" label="买五价" >
          <Input placeholder="请输入买五价" allowClear />
        </Form.Item>
        <Form.Item name="bid_volume1" label="买一量" >
          <Input placeholder="请输入买一量" allowClear />
        </Form.Item>
        <Form.Item name="bid_volume2" label="买二量" >
          <Input placeholder="请输入买二量" allowClear />
        </Form.Item>
        <Form.Item name="bid_volume3" label="买三量" >
          <Input placeholder="请输入买三量" allowClear />
        </Form.Item>
        <Form.Item name="bid_volume4" label="买四量" >
          <Input placeholder="请输入买四量" allowClear />
        </Form.Item>
        <Form.Item name="bid_volume5" label="买五量" >
          <Input placeholder="请输入买五量" allowClear />
        </Form.Item>
        <Form.Item name="ask_price1" label="卖一价" >
          <Input placeholder="请输入卖一价" allowClear />
        </Form.Item>
        <Form.Item name="ask_price2" label="卖二价" >
          <Input placeholder="请输入卖二价" allowClear />
        </Form.Item>
        <Form.Item name="ask_price3" label="卖三价" >
          <Input placeholder="请输入卖三价" allowClear />
        </Form.Item>
        <Form.Item name="ask_price4" label="卖四价" >
          <Input placeholder="请输入卖四价" allowClear />
        </Form.Item>
        <Form.Item name="ask_price5" label="卖五价" >
          <Input placeholder="请输入卖五价" allowClear />
        </Form.Item>
        <Form.Item name="ask_volume1" label="卖一量" >
          <Input placeholder="请输入卖一量" allowClear />
        </Form.Item>
        <Form.Item name="ask_volume2" label="卖二量" >
          <Input placeholder="请输入卖二量" allowClear />
        </Form.Item>
        <Form.Item name="ask_volume3" label="卖三量" >
          <Input placeholder="请输入卖三量" allowClear />
        </Form.Item>
        <Form.Item name="ask_volume4" label="卖四量" >
          <Input placeholder="请输入卖四量" allowClear />
        </Form.Item>
        <Form.Item name="ask_volume5" label="卖五量" >
          <Input placeholder="请输入卖五量" allowClear />
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
              onClick={handleQueryStockDailyInfoReset}
              className="bg-gray-50"
              icon={<RotateCcw size={14} />}
            >
              重置
            </Button>
            <Button
              type="primary"
              icon={<Search size={14} />}
              onClick={handleQueryStockDailyInfoSubmit}
            >
              查询
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default QueryStockDailyInfoComponent;