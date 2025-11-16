// SPDX-License-Identifier: MIT

import { Form, Modal, Button, Input } from 'antd';
import { DatePicker } from 'antd';
import { ChevronDown } from 'lucide-react';
import { TreeSelect } from 'antd';
import { TreeSelectUtil } from '@/utils/select-util';
import { StockDailyInfo } from '@/types/stock-daily-info';
import { UpdateStockDailyInfo } from '@/types/stock-daily-info';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

interface UpdateStockDailyInfoProps {
  isUpdateStockDailyInfoModalVisible: boolean;
  onUpdateStockDailyInfoCancel: () => void;
  onUpdateStockDailyInfoFinish: () => void;
  isUpdateStockDailyInfoLoading: boolean;
  updateStockDailyInfoForm: FormInstance<UpdateStockDailyInfo>;
  treeSelectDataSource?: StockDailyInfo[];
}

const updateStockDailyInfoFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const UpdateStockDailyInfoComponent: React.FC<UpdateStockDailyInfoProps> = ({
  isUpdateStockDailyInfoModalVisible,
  onUpdateStockDailyInfoCancel,
  onUpdateStockDailyInfoFinish,
  isUpdateStockDailyInfoLoading,
  updateStockDailyInfoForm,
  treeSelectDataSource,
}) => {
  const treeSelectDataTransform = [{ name: '根目录', id: 0, children: treeSelectDataSource }];
  const treeSelectData = TreeSelectUtil.convert(treeSelectDataTransform as any);
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onUpdateStockDailyInfoCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isUpdateStockDailyInfoLoading} onClick={onUpdateStockDailyInfoFinish}>
        确定
      </Button>,
    ],
    [isUpdateStockDailyInfoLoading, onUpdateStockDailyInfoCancel],
  );

  return (
    <Modal
      title="股票每日信息编辑"
      open={isUpdateStockDailyInfoModalVisible}
      onCancel={onUpdateStockDailyInfoCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...updateStockDailyInfoFormItemLayout}
          form={ updateStockDailyInfoForm}
          name="updateStockDailyInfo"
          onFinish={onUpdateStockDailyInfoFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="stock_symbol_full" label="股票代码" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票代码" />
          </Form.Item>
          <Form.Item name="trade_date" label="交易日期" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择交易日期" />
          </Form.Item>
          <Form.Item name="open_price" label="开盘价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入开盘价" />
          </Form.Item>
          <Form.Item name="close_price" label="收盘价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入收盘价" />
          </Form.Item>
          <Form.Item name="high_price" label="最高价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入最高价" />
          </Form.Item>
          <Form.Item name="low_price" label="最低价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入最低价" />
          </Form.Item>
          <Form.Item name="volume" label="成交量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入成交量" />
          </Form.Item>
          <Form.Item name="turnover" label="成交额" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入成交额" />
          </Form.Item>
          <Form.Item name="change_amount" label="涨跌额" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入涨跌额" />
          </Form.Item>
          <Form.Item name="change_rate" label="涨跌幅" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入涨跌幅" />
          </Form.Item>
          <Form.Item name="pe_ratio" label="市盈率" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入市盈率" />
          </Form.Item>
          <Form.Item name="pb_ratio" label="市净率" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入市净率" />
          </Form.Item>
          <Form.Item name="market_cap" label="总市值" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入总市值" />
          </Form.Item>
          <Form.Item name="circulating_market_cap" label="流通市值" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入流通市值" />
          </Form.Item>
          <Form.Item name="turnover_rate" label="换手率" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入换手率" />
          </Form.Item>
          <Form.Item name="bid_price1" label="买一价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入买一价" />
          </Form.Item>
          <Form.Item name="bid_price2" label="买二价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入买二价" />
          </Form.Item>
          <Form.Item name="bid_price3" label="买三价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入买三价" />
          </Form.Item>
          <Form.Item name="bid_price4" label="买四价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入买四价" />
          </Form.Item>
          <Form.Item name="bid_price5" label="买五价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入买五价" />
          </Form.Item>
          <Form.Item name="bid_volume1" label="买一量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入买一量" />
          </Form.Item>
          <Form.Item name="bid_volume2" label="买二量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入买二量" />
          </Form.Item>
          <Form.Item name="bid_volume3" label="买三量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入买三量" />
          </Form.Item>
          <Form.Item name="bid_volume4" label="买四量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入买四量" />
          </Form.Item>
          <Form.Item name="bid_volume5" label="买五量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入买五量" />
          </Form.Item>
          <Form.Item name="ask_price1" label="卖一价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入卖一价" />
          </Form.Item>
          <Form.Item name="ask_price2" label="卖二价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入卖二价" />
          </Form.Item>
          <Form.Item name="ask_price3" label="卖三价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入卖三价" />
          </Form.Item>
          <Form.Item name="ask_price4" label="卖四价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入卖四价" />
          </Form.Item>
          <Form.Item name="ask_price5" label="卖五价" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入卖五价" />
          </Form.Item>
          <Form.Item name="ask_volume1" label="卖一量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入卖一量" />
          </Form.Item>
          <Form.Item name="ask_volume2" label="卖二量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入卖二量" />
          </Form.Item>
          <Form.Item name="ask_volume3" label="卖三量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入卖三量" />
          </Form.Item>
          <Form.Item name="ask_volume4" label="卖四量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入卖四量" />
          </Form.Item>
          <Form.Item name="ask_volume5" label="卖五量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入卖五量" />
          </Form.Item>
          <Form.Item name="updated_at" label="更新时间" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择更新时间" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default UpdateStockDailyInfoComponent;