// SPDX-License-Identifier: MIT
import { exportStockDailyInfoTemplate } from '@/service/stock-daily-info';
import { CreateStockDailyInfo, ImportStockDailyInfosResponse} from '@/types/stock-daily-info';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportStockDailyInfoProps {
  isImportStockDailyInfoModalVisible: boolean;
  isImportStockDailyInfoLoading: boolean;
  onImportStockDailyInfoCancel: () => void;
  onImportStockDailyInfoFinish: (fileList: RcFile[]) => Promise<ImportStockDailyInfosResponse>;
  handleImportStockDailyInfo: () => void;
}

const ImportStockDailyInfoComponent: React.FC<ImportStockDailyInfoProps> = ({
  isImportStockDailyInfoModalVisible,
  onImportStockDailyInfoCancel,
  onImportStockDailyInfoFinish,
  isImportStockDailyInfoLoading,
  handleImportStockDailyInfo,
}) => {
  const [stockDailyInfoImportFileList, setImportStockDailyInfoFileList] = useState<RcFile[]>([]);
  const [CreateStockDailyInfoList, setCreateStockDailyInfoList] = useState<CreateStockDailyInfo[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportStockDailyInfoCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportStockDailyInfoLoading} onClick={handleImportStockDailyInfoConfirm}>
      确定
    </Button>,
  ];

  const handleImportStockDailyInfoConfirm = async () => {
    if (isUploadShow) {
      if (stockDailyInfoImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importStockDailyInfoResponse = await onImportStockDailyInfoFinish(stockDailyInfoImportFileList);
        setIsUploadShow(false);
        setCreateStockDailyInfoList(importStockDailyInfoResponse.stockDailyInfos);
      } finally {
        setImportStockDailyInfoFileList([]);
      }
    } else {
      handleImportStockDailyInfo();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const StockDailyInfoColumns: ColumnsType<CreateStockDailyInfo> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateStockDailyInfo, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "股票代码",
      dataIndex: "stock_symbol_full",
      key: "stock_symbol_full",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "交易日期",
      dataIndex: "trade_date",
      key: "trade_date",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "开盘价",
      dataIndex: "open_price",
      key: "open_price",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "收盘价",
      dataIndex: "close_price",
      key: "close_price",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "最高价",
      dataIndex: "high_price",
      key: "high_price",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "最低价",
      dataIndex: "low_price",
      key: "low_price",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "成交量",
      dataIndex: "volume",
      key: "volume",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "成交额",
      dataIndex: "turnover",
      key: "turnover",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "涨跌额",
      dataIndex: "change_amount",
      key: "change_amount",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "涨跌幅",
      dataIndex: "change_rate",
      key: "change_rate",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "市盈率",
      dataIndex: "pe_ratio",
      key: "pe_ratio",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "市净率",
      dataIndex: "pb_ratio",
      key: "pb_ratio",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "总市值",
      dataIndex: "market_cap",
      key: "market_cap",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "流通市值",
      dataIndex: "circulating_market_cap",
      key: "circulating_market_cap",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "换手率",
      dataIndex: "turnover_rate",
      key: "turnover_rate",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "买一价",
      dataIndex: "bid_price1",
      key: "bid_price1",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "买二价",
      dataIndex: "bid_price2",
      key: "bid_price2",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "买三价",
      dataIndex: "bid_price3",
      key: "bid_price3",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "买四价",
      dataIndex: "bid_price4",
      key: "bid_price4",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "买五价",
      dataIndex: "bid_price5",
      key: "bid_price5",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "买一量",
      dataIndex: "bid_volume1",
      key: "bid_volume1",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "买二量",
      dataIndex: "bid_volume2",
      key: "bid_volume2",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "买三量",
      dataIndex: "bid_volume3",
      key: "bid_volume3",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "买四量",
      dataIndex: "bid_volume4",
      key: "bid_volume4",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "买五量",
      dataIndex: "bid_volume5",
      key: "bid_volume5",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "卖一价",
      dataIndex: "ask_price1",
      key: "ask_price1",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "卖二价",
      dataIndex: "ask_price2",
      key: "ask_price2",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "卖三价",
      dataIndex: "ask_price3",
      key: "ask_price3",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "卖四价",
      dataIndex: "ask_price4",
      key: "ask_price4",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "卖五价",
      dataIndex: "ask_price5",
      key: "ask_price5",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "卖一量",
      dataIndex: "ask_volume1",
      key: "ask_volume1",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "卖二量",
      dataIndex: "ask_volume2",
      key: "ask_volume2",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "卖三量",
      dataIndex: "ask_volume3",
      key: "ask_volume3",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "卖四量",
      dataIndex: "ask_volume4",
      key: "ask_volume4",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "卖五量",
      dataIndex: "ask_volume5",
      key: "ask_volume5",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "错误信息",
      dataIndex: "errMsg",
      key: "errMsg",
      render: (text) => (text ? text : "-"),
    },
  ];

  const handleStockDailyInfoExportTemplate = async () => {
    await exportStockDailyInfoTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportStockDailyInfoFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportStockDailyInfoFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportStockDailyInfoCancel = () => {
    onImportStockDailyInfoCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="股票每日信息导入"
      open={isImportStockDailyInfoModalVisible}
      onCancel={handleImportStockDailyInfoCancel}
      footer={footerButtons}
      width={'70%'}
    >
      {isUploadShow ? (
        <div>
          <div>
            <Upload.Dragger
              name="file"
              multiple
              accept=".xlsx,.xls"
              onRemove={handleRemove}
              fileList={ stockDailyInfoImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleStockDailyInfoExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ StockDailyInfoColumns}
            dataSource={ CreateStockDailyInfoList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportStockDailyInfoComponent;