// SPDX-License-Identifier: MIT


import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
  Button,
  Space,
} from 'antd';
import { StockBasicInfoDetail } from '@/types/stock-basic-info';
import React, { useMemo } from 'react';

interface StockBasicInfoDetailDrawerProps {
  isStockBasicInfoDetailDrawerVisible: boolean;
  onStockBasicInfoDetailClose: () => void;
  stockBasicInfoDetail: StockBasicInfoDetail | undefined;
  loading: boolean
}

const StockBasicInfoDetailComponent: React.FC<StockBasicInfoDetailDrawerProps> = ({
  isStockBasicInfoDetailDrawerVisible,
  onStockBasicInfoDetailClose,
  stockBasicInfoDetail,
  loading
}) => {

  
  return (
    <Drawer
      title="股票基本信息详情"
      open={isStockBasicInfoDetailDrawerVisible}
      onClose={onStockBasicInfoDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      { stockBasicInfoDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="股票编号">
              { stockBasicInfoDetail.symbol}
          </Descriptions.Item>
          <Descriptions.Item label="股票代码">
              { stockBasicInfoDetail.symbol_full}
          </Descriptions.Item>
          <Descriptions.Item label="股票名称">
              { stockBasicInfoDetail.name}
          </Descriptions.Item>
          <Descriptions.Item label="交易所">
              { stockBasicInfoDetail.exchange}
          </Descriptions.Item>
          <Descriptions.Item label="上市日期">
              {dayjs(stockBasicInfoDetail.listing_date).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="行业">
              { stockBasicInfoDetail.industry}
          </Descriptions.Item>
          <Descriptions.Item label="细分行业">
              { stockBasicInfoDetail.industry_gy}
          </Descriptions.Item>
          <Descriptions.Item label="省份">
              { stockBasicInfoDetail.province}
          </Descriptions.Item>
          <Descriptions.Item label="城市">
              { stockBasicInfoDetail.city}
          </Descriptions.Item>
          <Descriptions.Item label="官网">
              { stockBasicInfoDetail.website}
          </Descriptions.Item>
          <Descriptions.Item label="最小报价单位，1表示0.01元">
              { stockBasicInfoDetail.price_tick}
          </Descriptions.Item>
          <Descriptions.Item label="数据来源">
              { stockBasicInfoDetail.data_source}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
              {dayjs(stockBasicInfoDetail.created_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
              {dayjs(stockBasicInfoDetail.updated_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default StockBasicInfoDetailComponent;