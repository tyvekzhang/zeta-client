// SPDX-License-Identifier: MIT

import { Form, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/es/form';
import { RotateCcw, Search } from 'lucide-react';
import React from 'react';

interface QueryIntelligenceInformationProps {
  onQueryIntelligenceInformationFinish: (values: any) => void;
  onQueryIntelligenceInformationReset: () => void;
  onQueryIntelligenceInformationForm: FormInstance;
}

const queryIntelligenceInformationFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const QueryIntelligenceInformationComponent: React.FC<QueryIntelligenceInformationProps> = ({
  onQueryIntelligenceInformationFinish,
  onQueryIntelligenceInformationReset,
  onQueryIntelligenceInformationForm,
}) => {
  const handleQueryIntelligenceInformationReset = () => {
    onQueryIntelligenceInformationReset();
  };

  const handleQueryIntelligenceInformationSubmit = async () => {
    const values = await onQueryIntelligenceInformationForm.validateFields();
    onQueryIntelligenceInformationFinish(values);
  };

  

  return (
    <Form
      {...queryIntelligenceInformationFormItemLayout}
      form={ onQueryIntelligenceInformationForm}
      name="queryIntelligenceInformation"
      onFinish={onQueryIntelligenceInformationFinish}
    >
      <div className='flex flex-wrap items-center gap-4 pt-6 justify-between'>
        <Form.Item name="stock_symbol_full" label="股票代码" >
          <Input placeholder="请输入股票代码" allowClear />
        </Form.Item>
        <Form.Item name="news_title" label="标题" >
          <Input placeholder="请输入标题" allowClear />
        </Form.Item>
        <Form.Item name="news_content" label="内容" >
          <Input placeholder="请输入内容" allowClear />
        </Form.Item>
        <Form.Item name="news_source" label="来源" >
          <Input placeholder="请输入来源" allowClear />
        </Form.Item>
        <Form.Item name="publish_time" label="发布时间" >
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
        <Form.Item name="news_url" label="新闻链接" >
          <Input placeholder="请输入新闻链接" allowClear />
        </Form.Item>
        <Form.Item name="impact_direction" label="影响面" >
          <Input placeholder="请输入影响面" allowClear />
        </Form.Item>
        <Form.Item name="impact_level" label="影响程度" >
          <Input placeholder="请输入影响程度" allowClear />
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
              onClick={handleQueryIntelligenceInformationReset}
              className="bg-gray-50"
              icon={<RotateCcw size={14} />}
            >
              重置
            </Button>
            <Button
              type="primary"
              icon={<Search size={14} />}
              onClick={handleQueryIntelligenceInformationSubmit}
            >
              查询
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default QueryIntelligenceInformationComponent;