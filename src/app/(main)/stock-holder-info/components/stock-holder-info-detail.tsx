// SPDX-License-Identifier: MIT


import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
  Button,
  Space,
} from 'antd';
import { StockHolderInfoDetail } from '@/types/stock-holder-info';
import React, { useMemo } from 'react';

interface StockHolderInfoDetailDrawerProps {
  isStockHolderInfoDetailDrawerVisible: boolean;
  onStockHolderInfoDetailClose: () => void;
  stockHolderInfoDetail: StockHolderInfoDetail | undefined;
  loading: boolean
}

const StockHolderInfoDetailComponent: React.FC<StockHolderInfoDetailDrawerProps> = ({
  isStockHolderInfoDetailDrawerVisible,
  onStockHolderInfoDetailClose,
  stockHolderInfoDetail,
  loading
}) => {

  
  return (
    <Drawer
      title="股东信息详情"
      open={isStockHolderInfoDetailDrawerVisible}
      onClose={onStockHolderInfoDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      { stockHolderInfoDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="股票代码">
              { stockHolderInfoDetail.stock_symbol_full}
          </Descriptions.Item>
          <Descriptions.Item label="股东名称">
              { stockHolderInfoDetail.holder_name}
          </Descriptions.Item>
          <Descriptions.Item label="股东信息">
              { stockHolderInfoDetail.holder_info}
          </Descriptions.Item>
          <Descriptions.Item label="股东类型">
              { stockHolderInfoDetail.holder_type}
          </Descriptions.Item>
          <Descriptions.Item label="持股数量">
              { stockHolderInfoDetail.share_amount}
          </Descriptions.Item>
          <Descriptions.Item label="持股比例">
              { stockHolderInfoDetail.share_ratio}
          </Descriptions.Item>
          <Descriptions.Item label="持股变动数量">
              { stockHolderInfoDetail.change_amount}
          </Descriptions.Item>
          <Descriptions.Item label="变动类型">
              { stockHolderInfoDetail.change_type}
          </Descriptions.Item>
          <Descriptions.Item label="报告日期">
              {dayjs(stockHolderInfoDetail.report_date).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="是否十大股东">
              { stockHolderInfoDetail.is_top_ten}
          </Descriptions.Item>
          <Descriptions.Item label="股东排名">
              { stockHolderInfoDetail.ranking}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
              {dayjs(stockHolderInfoDetail.created_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
              {dayjs(stockHolderInfoDetail.updated_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default StockHolderInfoDetailComponent;