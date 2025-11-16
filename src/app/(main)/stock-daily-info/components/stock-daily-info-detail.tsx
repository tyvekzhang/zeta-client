// SPDX-License-Identifier: MIT


import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
  Button,
  Space,
} from 'antd';
import { StockDailyInfoDetail } from '@/types/stock-daily-info';
import React, { useMemo } from 'react';

interface StockDailyInfoDetailDrawerProps {
  isStockDailyInfoDetailDrawerVisible: boolean;
  onStockDailyInfoDetailClose: () => void;
  stockDailyInfoDetail: StockDailyInfoDetail | undefined;
  loading: boolean
}

const StockDailyInfoDetailComponent: React.FC<StockDailyInfoDetailDrawerProps> = ({
  isStockDailyInfoDetailDrawerVisible,
  onStockDailyInfoDetailClose,
  stockDailyInfoDetail,
  loading
}) => {

  
  return (
    <Drawer
      title="股票每日信息详情"
      open={isStockDailyInfoDetailDrawerVisible}
      onClose={onStockDailyInfoDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      { stockDailyInfoDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="股票代码">
              { stockDailyInfoDetail.stock_symbol_full}
          </Descriptions.Item>
          <Descriptions.Item label="交易日期">
              {dayjs(stockDailyInfoDetail.trade_date).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="开盘价">
              { stockDailyInfoDetail.open_price}
          </Descriptions.Item>
          <Descriptions.Item label="收盘价">
              { stockDailyInfoDetail.close_price}
          </Descriptions.Item>
          <Descriptions.Item label="最高价">
              { stockDailyInfoDetail.high_price}
          </Descriptions.Item>
          <Descriptions.Item label="最低价">
              { stockDailyInfoDetail.low_price}
          </Descriptions.Item>
          <Descriptions.Item label="成交量">
              { stockDailyInfoDetail.volume}
          </Descriptions.Item>
          <Descriptions.Item label="成交额">
              { stockDailyInfoDetail.turnover}
          </Descriptions.Item>
          <Descriptions.Item label="涨跌额">
              { stockDailyInfoDetail.change_amount}
          </Descriptions.Item>
          <Descriptions.Item label="涨跌幅">
              { stockDailyInfoDetail.change_rate}
          </Descriptions.Item>
          <Descriptions.Item label="市盈率">
              { stockDailyInfoDetail.pe_ratio}
          </Descriptions.Item>
          <Descriptions.Item label="市净率">
              { stockDailyInfoDetail.pb_ratio}
          </Descriptions.Item>
          <Descriptions.Item label="总市值">
              { stockDailyInfoDetail.market_cap}
          </Descriptions.Item>
          <Descriptions.Item label="流通市值">
              { stockDailyInfoDetail.circulating_market_cap}
          </Descriptions.Item>
          <Descriptions.Item label="换手率">
              { stockDailyInfoDetail.turnover_rate}
          </Descriptions.Item>
          <Descriptions.Item label="买一价">
              { stockDailyInfoDetail.bid_price1}
          </Descriptions.Item>
          <Descriptions.Item label="买二价">
              { stockDailyInfoDetail.bid_price2}
          </Descriptions.Item>
          <Descriptions.Item label="买三价">
              { stockDailyInfoDetail.bid_price3}
          </Descriptions.Item>
          <Descriptions.Item label="买四价">
              { stockDailyInfoDetail.bid_price4}
          </Descriptions.Item>
          <Descriptions.Item label="买五价">
              { stockDailyInfoDetail.bid_price5}
          </Descriptions.Item>
          <Descriptions.Item label="买一量">
              { stockDailyInfoDetail.bid_volume1}
          </Descriptions.Item>
          <Descriptions.Item label="买二量">
              { stockDailyInfoDetail.bid_volume2}
          </Descriptions.Item>
          <Descriptions.Item label="买三量">
              { stockDailyInfoDetail.bid_volume3}
          </Descriptions.Item>
          <Descriptions.Item label="买四量">
              { stockDailyInfoDetail.bid_volume4}
          </Descriptions.Item>
          <Descriptions.Item label="买五量">
              { stockDailyInfoDetail.bid_volume5}
          </Descriptions.Item>
          <Descriptions.Item label="卖一价">
              { stockDailyInfoDetail.ask_price1}
          </Descriptions.Item>
          <Descriptions.Item label="卖二价">
              { stockDailyInfoDetail.ask_price2}
          </Descriptions.Item>
          <Descriptions.Item label="卖三价">
              { stockDailyInfoDetail.ask_price3}
          </Descriptions.Item>
          <Descriptions.Item label="卖四价">
              { stockDailyInfoDetail.ask_price4}
          </Descriptions.Item>
          <Descriptions.Item label="卖五价">
              { stockDailyInfoDetail.ask_price5}
          </Descriptions.Item>
          <Descriptions.Item label="卖一量">
              { stockDailyInfoDetail.ask_volume1}
          </Descriptions.Item>
          <Descriptions.Item label="卖二量">
              { stockDailyInfoDetail.ask_volume2}
          </Descriptions.Item>
          <Descriptions.Item label="卖三量">
              { stockDailyInfoDetail.ask_volume3}
          </Descriptions.Item>
          <Descriptions.Item label="卖四量">
              { stockDailyInfoDetail.ask_volume4}
          </Descriptions.Item>
          <Descriptions.Item label="卖五量">
              { stockDailyInfoDetail.ask_volume5}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
              {dayjs(stockDailyInfoDetail.created_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
              {dayjs(stockDailyInfoDetail.updated_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default StockDailyInfoDetailComponent;