// SPDX-License-Identifier: MIT

import { Form, Modal, Button, Input } from 'antd';
import { DatePicker } from 'antd';
import { ChevronDown } from 'lucide-react';
import { TreeSelect } from 'antd';
import { TreeSelectUtil } from '@/utils/select-util';
import { StockBasicInfo } from '@/types/stock-basic-info';
import { UpdateStockBasicInfo } from '@/types/stock-basic-info';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

interface UpdateStockBasicInfoProps {
  isUpdateStockBasicInfoModalVisible: boolean;
  onUpdateStockBasicInfoCancel: () => void;
  onUpdateStockBasicInfoFinish: () => void;
  isUpdateStockBasicInfoLoading: boolean;
  updateStockBasicInfoForm: FormInstance<UpdateStockBasicInfo>;
  treeSelectDataSource?: StockBasicInfo[];
}

const updateStockBasicInfoFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const UpdateStockBasicInfoComponent: React.FC<UpdateStockBasicInfoProps> = ({
  isUpdateStockBasicInfoModalVisible,
  onUpdateStockBasicInfoCancel,
  onUpdateStockBasicInfoFinish,
  isUpdateStockBasicInfoLoading,
  updateStockBasicInfoForm,
  treeSelectDataSource,
}) => {
  const treeSelectDataTransform = [{ name: '根目录', id: 0, children: treeSelectDataSource }];
  const treeSelectData = TreeSelectUtil.convert(treeSelectDataTransform as any);
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onUpdateStockBasicInfoCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isUpdateStockBasicInfoLoading} onClick={onUpdateStockBasicInfoFinish}>
        确定
      </Button>,
    ],
    [isUpdateStockBasicInfoLoading, onUpdateStockBasicInfoCancel],
  );

  return (
    <Modal
      title="股票基本信息编辑"
      open={isUpdateStockBasicInfoModalVisible}
      onCancel={onUpdateStockBasicInfoCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...updateStockBasicInfoFormItemLayout}
          form={ updateStockBasicInfoForm}
          name="updateStockBasicInfo"
          onFinish={onUpdateStockBasicInfoFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="symbol" label="股票编号" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票编号" />
          </Form.Item>
          <Form.Item name="symbol_full" label="股票代码" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票代码" />
          </Form.Item>
          <Form.Item name="name" label="股票名称" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票名称" />
          </Form.Item>
          <Form.Item name="exchange" label="交易所" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入交易所" />
          </Form.Item>
          <Form.Item name="listing_date" label="上市日期" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择上市日期" />
          </Form.Item>
          <Form.Item name="industry" label="行业" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入行业" />
          </Form.Item>
          <Form.Item name="industry_gy" label="细分行业" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入细分行业" />
          </Form.Item>
          <Form.Item name="province" label="省份" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入省份" />
          </Form.Item>
          <Form.Item name="city" label="城市" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入城市" />
          </Form.Item>
          <Form.Item name="website" label="官网" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入官网" />
          </Form.Item>
          <Form.Item name="price_tick" label="最小报价单位，1表示0.01元" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入最小报价单位，1表示0.01元" />
          </Form.Item>
          <Form.Item name="data_source" label="数据来源" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入数据来源" />
          </Form.Item>
          <Form.Item name="updated_at" label="更新时间" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择更新时间" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default UpdateStockBasicInfoComponent;