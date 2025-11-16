// SPDX-License-Identifier: MIT


import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
  Button,
  Space,
} from 'antd';
import { IntelligenceInformationDetail } from '@/types/intelligence-information';
import React, { useMemo } from 'react';

interface IntelligenceInformationDetailDrawerProps {
  isIntelligenceInformationDetailDrawerVisible: boolean;
  onIntelligenceInformationDetailClose: () => void;
  intelligenceInformationDetail: IntelligenceInformationDetail | undefined;
  loading: boolean
}

const IntelligenceInformationDetailComponent: React.FC<IntelligenceInformationDetailDrawerProps> = ({
  isIntelligenceInformationDetailDrawerVisible,
  onIntelligenceInformationDetailClose,
  intelligenceInformationDetail,
  loading
}) => {

  
  return (
    <Drawer
      title="情报信息详情"
      open={isIntelligenceInformationDetailDrawerVisible}
      onClose={onIntelligenceInformationDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      { intelligenceInformationDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="股票代码">
              { intelligenceInformationDetail.stock_symbol_full}
          </Descriptions.Item>
          <Descriptions.Item label="标题">
              { intelligenceInformationDetail.news_title}
          </Descriptions.Item>
          <Descriptions.Item label="内容">
              { intelligenceInformationDetail.news_content}
          </Descriptions.Item>
          <Descriptions.Item label="来源">
              { intelligenceInformationDetail.news_source}
          </Descriptions.Item>
          <Descriptions.Item label="发布时间">
              {dayjs(intelligenceInformationDetail.publish_time).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="新闻链接">
              { intelligenceInformationDetail.news_url}
          </Descriptions.Item>
          <Descriptions.Item label="影响面">
              { intelligenceInformationDetail.impact_direction}
          </Descriptions.Item>
          <Descriptions.Item label="影响程度">
              { intelligenceInformationDetail.impact_level}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
              {dayjs(intelligenceInformationDetail.created_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
              {dayjs(intelligenceInformationDetail.updated_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default IntelligenceInformationDetailComponent;