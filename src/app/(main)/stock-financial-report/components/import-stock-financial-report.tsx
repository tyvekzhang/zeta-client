// SPDX-License-Identifier: MIT
import { exportStockFinancialReportTemplate } from '@/service/stock-financial-report';
import { CreateStockFinancialReport, ImportStockFinancialReportsResponse} from '@/types/stock-financial-report';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportStockFinancialReportProps {
  isImportStockFinancialReportModalVisible: boolean;
  isImportStockFinancialReportLoading: boolean;
  onImportStockFinancialReportCancel: () => void;
  onImportStockFinancialReportFinish: (fileList: RcFile[]) => Promise<ImportStockFinancialReportsResponse>;
  handleImportStockFinancialReport: () => void;
}

const ImportStockFinancialReportComponent: React.FC<ImportStockFinancialReportProps> = ({
  isImportStockFinancialReportModalVisible,
  onImportStockFinancialReportCancel,
  onImportStockFinancialReportFinish,
  isImportStockFinancialReportLoading,
  handleImportStockFinancialReport,
}) => {
  const [stockFinancialReportImportFileList, setImportStockFinancialReportFileList] = useState<RcFile[]>([]);
  const [CreateStockFinancialReportList, setCreateStockFinancialReportList] = useState<CreateStockFinancialReport[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportStockFinancialReportCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportStockFinancialReportLoading} onClick={handleImportStockFinancialReportConfirm}>
      确定
    </Button>,
  ];

  const handleImportStockFinancialReportConfirm = async () => {
    if (isUploadShow) {
      if (stockFinancialReportImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importStockFinancialReportResponse = await onImportStockFinancialReportFinish(stockFinancialReportImportFileList);
        setIsUploadShow(false);
        setCreateStockFinancialReportList(importStockFinancialReportResponse.stockFinancialReports);
      } finally {
        setImportStockFinancialReportFileList([]);
      }
    } else {
      handleImportStockFinancialReport();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const StockFinancialReportColumns: ColumnsType<CreateStockFinancialReport> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateStockFinancialReport, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "文件主键",
      dataIndex: "file_id",
      key: "file_id",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股票代码",
      dataIndex: "stock_symbol_full",
      key: "stock_symbol_full",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "报告期",
      dataIndex: "report_date",
      key: "report_date",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "报告类型",
      dataIndex: "report_type",
      key: "report_type",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营业收入",
      dataIndex: "total_revenue",
      key: "total_revenue",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净利润",
      dataIndex: "net_profit",
      key: "net_profit",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "总资产",
      dataIndex: "total_assets",
      key: "total_assets",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "总负债",
      dataIndex: "total_liabilities",
      key: "total_liabilities",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净资产",
      dataIndex: "net_assets",
      key: "net_assets",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "每股收益",
      dataIndex: "eps",
      key: "eps",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净资产收益率",
      dataIndex: "roe",
      key: "roe",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "毛利率",
      dataIndex: "gross_profit_margin",
      key: "gross_profit_margin",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "报告来源",
      dataIndex: "report_source",
      key: "report_source",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "预约披露日期",
      dataIndex: "earnings_announcement_date",
      key: "earnings_announcement_date",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "发布日期",
      dataIndex: "published_date",
      key: "published_date",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "备注",
      dataIndex: "comment",
      key: "comment",
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

  const handleStockFinancialReportExportTemplate = async () => {
    await exportStockFinancialReportTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportStockFinancialReportFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportStockFinancialReportFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportStockFinancialReportCancel = () => {
    onImportStockFinancialReportCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="股票财报导入"
      open={isImportStockFinancialReportModalVisible}
      onCancel={handleImportStockFinancialReportCancel}
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
              fileList={ stockFinancialReportImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleStockFinancialReportExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ StockFinancialReportColumns}
            dataSource={ CreateStockFinancialReportList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportStockFinancialReportComponent;