// SPDX-License-Identifier: MIT
import { exportStockBasicInfoTemplate } from '@/service/stock-basic-info';
import { CreateStockBasicInfo, ImportStockBasicInfosResponse} from '@/types/stock-basic-info';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportStockBasicInfoProps {
  isImportStockBasicInfoModalVisible: boolean;
  isImportStockBasicInfoLoading: boolean;
  onImportStockBasicInfoCancel: () => void;
  onImportStockBasicInfoFinish: (fileList: RcFile[]) => Promise<ImportStockBasicInfosResponse>;
  handleImportStockBasicInfo: () => void;
}

const ImportStockBasicInfoComponent: React.FC<ImportStockBasicInfoProps> = ({
  isImportStockBasicInfoModalVisible,
  onImportStockBasicInfoCancel,
  onImportStockBasicInfoFinish,
  isImportStockBasicInfoLoading,
  handleImportStockBasicInfo,
}) => {
  const [stockBasicInfoImportFileList, setImportStockBasicInfoFileList] = useState<RcFile[]>([]);
  const [CreateStockBasicInfoList, setCreateStockBasicInfoList] = useState<CreateStockBasicInfo[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportStockBasicInfoCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportStockBasicInfoLoading} onClick={handleImportStockBasicInfoConfirm}>
      确定
    </Button>,
  ];

  const handleImportStockBasicInfoConfirm = async () => {
    if (isUploadShow) {
      if (stockBasicInfoImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importStockBasicInfoResponse = await onImportStockBasicInfoFinish(stockBasicInfoImportFileList);
        setIsUploadShow(false);
        setCreateStockBasicInfoList(importStockBasicInfoResponse.stockBasicInfos);
      } finally {
        setImportStockBasicInfoFileList([]);
      }
    } else {
      handleImportStockBasicInfo();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const StockBasicInfoColumns: ColumnsType<CreateStockBasicInfo> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateStockBasicInfo, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "股票编号",
      dataIndex: "symbol",
      key: "symbol",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股票代码",
      dataIndex: "symbol_full",
      key: "symbol_full",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股票名称",
      dataIndex: "name",
      key: "name",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "交易所",
      dataIndex: "exchange",
      key: "exchange",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "上市日期",
      dataIndex: "listing_date",
      key: "listing_date",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "行业",
      dataIndex: "industry",
      key: "industry",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "细分行业",
      dataIndex: "industry_gy",
      key: "industry_gy",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "省份",
      dataIndex: "province",
      key: "province",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "城市",
      dataIndex: "city",
      key: "city",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "官网",
      dataIndex: "website",
      key: "website",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "最小报价单位，1表示0.01元",
      dataIndex: "price_tick",
      key: "price_tick",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "数据来源",
      dataIndex: "data_source",
      key: "data_source",
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

  const handleStockBasicInfoExportTemplate = async () => {
    await exportStockBasicInfoTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportStockBasicInfoFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportStockBasicInfoFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportStockBasicInfoCancel = () => {
    onImportStockBasicInfoCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="股票基本信息导入"
      open={isImportStockBasicInfoModalVisible}
      onCancel={handleImportStockBasicInfoCancel}
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
              fileList={ stockBasicInfoImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleStockBasicInfoExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ StockBasicInfoColumns}
            dataSource={ CreateStockBasicInfoList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportStockBasicInfoComponent;