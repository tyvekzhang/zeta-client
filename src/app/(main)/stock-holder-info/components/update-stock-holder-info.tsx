// SPDX-License-Identifier: MIT

import { Form, Modal, Button, Input } from 'antd';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import { ChevronDown } from 'lucide-react';
import { TreeSelect } from 'antd';
import { TreeSelectUtil } from '@/utils/select-util';
import { StockHolderInfo } from '@/types/stock-holder-info';
import { UpdateStockHolderInfo } from '@/types/stock-holder-info';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

interface UpdateStockHolderInfoProps {
  isUpdateStockHolderInfoModalVisible: boolean;
  onUpdateStockHolderInfoCancel: () => void;
  onUpdateStockHolderInfoFinish: () => void;
  isUpdateStockHolderInfoLoading: boolean;
  updateStockHolderInfoForm: FormInstance<UpdateStockHolderInfo>;
  treeSelectDataSource?: StockHolderInfo[];
}

const updateStockHolderInfoFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const UpdateStockHolderInfoComponent: React.FC<UpdateStockHolderInfoProps> = ({
  isUpdateStockHolderInfoModalVisible,
  onUpdateStockHolderInfoCancel,
  onUpdateStockHolderInfoFinish,
  isUpdateStockHolderInfoLoading,
  updateStockHolderInfoForm,
  treeSelectDataSource,
}) => {
  const treeSelectDataTransform = [{ name: '根目录', id: 0, children: treeSelectDataSource }];
  const treeSelectData = TreeSelectUtil.convert(treeSelectDataTransform as any);
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onUpdateStockHolderInfoCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isUpdateStockHolderInfoLoading} onClick={onUpdateStockHolderInfoFinish}>
        确定
      </Button>,
    ],
    [isUpdateStockHolderInfoLoading, onUpdateStockHolderInfoCancel],
  );

  return (
    <Modal
      title="股东信息编辑"
      open={isUpdateStockHolderInfoModalVisible}
      onCancel={onUpdateStockHolderInfoCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...updateStockHolderInfoFormItemLayout}
          form={ updateStockHolderInfoForm}
          name="updateStockHolderInfo"
          onFinish={onUpdateStockHolderInfoFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="stock_symbol_full" label="股票代码" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票代码" />
          </Form.Item>
          <Form.Item name="holder_name" label="股东名称" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股东名称" />
          </Form.Item>
          <Form.Item name="holder_info" label="股东信息" rules={[{ required: false, message: '请输入' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="holder_type" label="股东类型" rules={[{ required: false, message: '请输入' }]}>
            <Select placeholder="请选择股东类型" />
          </Form.Item>
          <Form.Item name="share_amount" label="持股数量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入持股数量" />
          </Form.Item>
          <Form.Item name="share_ratio" label="持股比例" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入持股比例" />
          </Form.Item>
          <Form.Item name="change_amount" label="持股变动数量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入持股变动数量" />
          </Form.Item>
          <Form.Item name="change_type" label="变动类型" rules={[{ required: false, message: '请输入' }]}>
            <Select placeholder="请选择变动类型" />
          </Form.Item>
          <Form.Item name="report_date" label="报告日期" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择报告日期" />
          </Form.Item>
          <Form.Item name="is_top_ten" label="是否十大股东" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入是否十大股东" />
          </Form.Item>
          <Form.Item name="ranking" label="股东排名" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股东排名" />
          </Form.Item>
          <Form.Item name="updated_at" label="更新时间" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择更新时间" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default UpdateStockHolderInfoComponent;