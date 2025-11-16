// SPDX-License-Identifier: MIT


import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
  Button,
  Space,
} from 'antd';
import { StockFinancialReportDetail } from '@/types/stock-financial-report';
import React, { useMemo } from 'react';

interface StockFinancialReportDetailDrawerProps {
  isStockFinancialReportDetailDrawerVisible: boolean;
  onStockFinancialReportDetailClose: () => void;
  stockFinancialReportDetail: StockFinancialReportDetail | undefined;
  loading: boolean
}

const StockFinancialReportDetailComponent: React.FC<StockFinancialReportDetailDrawerProps> = ({
  isStockFinancialReportDetailDrawerVisible,
  onStockFinancialReportDetailClose,
  stockFinancialReportDetail,
  loading
}) => {

  
  return (
    <Drawer
      title="股票财报详情"
      open={isStockFinancialReportDetailDrawerVisible}
      onClose={onStockFinancialReportDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      { stockFinancialReportDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="文件主键">
              { stockFinancialReportDetail.file_id}
          </Descriptions.Item>
          <Descriptions.Item label="股票代码">
              { stockFinancialReportDetail.stock_symbol_full}
          </Descriptions.Item>
          <Descriptions.Item label="报告期">
              {dayjs(stockFinancialReportDetail.report_date).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="报告类型">
              { stockFinancialReportDetail.report_type}
          </Descriptions.Item>
          <Descriptions.Item label="营业收入">
              { stockFinancialReportDetail.total_revenue}
          </Descriptions.Item>
          <Descriptions.Item label="净利润">
              { stockFinancialReportDetail.net_profit}
          </Descriptions.Item>
          <Descriptions.Item label="总资产">
              { stockFinancialReportDetail.total_assets}
          </Descriptions.Item>
          <Descriptions.Item label="总负债">
              { stockFinancialReportDetail.total_liabilities}
          </Descriptions.Item>
          <Descriptions.Item label="净资产">
              { stockFinancialReportDetail.net_assets}
          </Descriptions.Item>
          <Descriptions.Item label="每股收益">
              { stockFinancialReportDetail.eps}
          </Descriptions.Item>
          <Descriptions.Item label="净资产收益率">
              { stockFinancialReportDetail.roe}
          </Descriptions.Item>
          <Descriptions.Item label="毛利率">
              { stockFinancialReportDetail.gross_profit_margin}
          </Descriptions.Item>
          <Descriptions.Item label="报告来源">
              { stockFinancialReportDetail.report_source}
          </Descriptions.Item>
          <Descriptions.Item label="预约披露日期">
              {dayjs(stockFinancialReportDetail.earnings_announcement_date).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="发布日期">
              {dayjs(stockFinancialReportDetail.published_date).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="备注">
              { stockFinancialReportDetail.comment}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
              {dayjs(stockFinancialReportDetail.created_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
              {dayjs(stockFinancialReportDetail.updated_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default StockFinancialReportDetailComponent;