// SPDX-License-Identifier: MIT


import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
  Button,
  Space,
} from 'antd';
import { StockDailyRecommendationDetail } from '@/types/stock-daily-recommendation';
import React, { useMemo } from 'react';

interface StockDailyRecommendationDetailDrawerProps {
  isStockDailyRecommendationDetailDrawerVisible: boolean;
  onStockDailyRecommendationDetailClose: () => void;
  stockDailyRecommendationDetail: StockDailyRecommendationDetail | undefined;
  loading: boolean
}

const StockDailyRecommendationDetailComponent: React.FC<StockDailyRecommendationDetailDrawerProps> = ({
  isStockDailyRecommendationDetailDrawerVisible,
  onStockDailyRecommendationDetailClose,
  stockDailyRecommendationDetail,
  loading
}) => {

  
  return (
    <Drawer
      title="股票每日推荐详情"
      open={isStockDailyRecommendationDetailDrawerVisible}
      onClose={onStockDailyRecommendationDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      { stockDailyRecommendationDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="股票代码">
              { stockDailyRecommendationDetail.stock_symbol_full}
          </Descriptions.Item>
          <Descriptions.Item label="推荐日期">
              {dayjs(stockDailyRecommendationDetail.recommend_date).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="推荐等级">
              { stockDailyRecommendationDetail.recommend_level}
          </Descriptions.Item>
          <Descriptions.Item label="当前价">
              { stockDailyRecommendationDetail.price}
          </Descriptions.Item>
          <Descriptions.Item label="目标价">
              { stockDailyRecommendationDetail.target_price}
          </Descriptions.Item>
          <Descriptions.Item label="推荐理由">
              { stockDailyRecommendationDetail.recommend_reason}
          </Descriptions.Item>
          <Descriptions.Item label="分析师">
              { stockDailyRecommendationDetail.analyst}
          </Descriptions.Item>
          <Descriptions.Item label="机构名称">
              { stockDailyRecommendationDetail.institution}
          </Descriptions.Item>
          <Descriptions.Item label="风险等级">
              { stockDailyRecommendationDetail.risk_level}
          </Descriptions.Item>
          <Descriptions.Item label="有效期">
              { stockDailyRecommendationDetail.validity_period}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
              {dayjs(stockDailyRecommendationDetail.created_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
              {dayjs(stockDailyRecommendationDetail.updated_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default StockDailyRecommendationDetailComponent;