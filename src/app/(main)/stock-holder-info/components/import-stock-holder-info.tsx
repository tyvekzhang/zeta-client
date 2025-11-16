// SPDX-License-Identifier: MIT
import { exportStockHolderInfoTemplate } from '@/service/stock-holder-info';
import { CreateStockHolderInfo, ImportStockHolderInfosResponse} from '@/types/stock-holder-info';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportStockHolderInfoProps {
  isImportStockHolderInfoModalVisible: boolean;
  isImportStockHolderInfoLoading: boolean;
  onImportStockHolderInfoCancel: () => void;
  onImportStockHolderInfoFinish: (fileList: RcFile[]) => Promise<ImportStockHolderInfosResponse>;
  handleImportStockHolderInfo: () => void;
}

const ImportStockHolderInfoComponent: React.FC<ImportStockHolderInfoProps> = ({
  isImportStockHolderInfoModalVisible,
  onImportStockHolderInfoCancel,
  onImportStockHolderInfoFinish,
  isImportStockHolderInfoLoading,
  handleImportStockHolderInfo,
}) => {
  const [stockHolderInfoImportFileList, setImportStockHolderInfoFileList] = useState<RcFile[]>([]);
  const [CreateStockHolderInfoList, setCreateStockHolderInfoList] = useState<CreateStockHolderInfo[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportStockHolderInfoCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportStockHolderInfoLoading} onClick={handleImportStockHolderInfoConfirm}>
      确定
    </Button>,
  ];

  const handleImportStockHolderInfoConfirm = async () => {
    if (isUploadShow) {
      if (stockHolderInfoImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importStockHolderInfoResponse = await onImportStockHolderInfoFinish(stockHolderInfoImportFileList);
        setIsUploadShow(false);
        setCreateStockHolderInfoList(importStockHolderInfoResponse.stockHolderInfos);
      } finally {
        setImportStockHolderInfoFileList([]);
      }
    } else {
      handleImportStockHolderInfo();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const StockHolderInfoColumns: ColumnsType<CreateStockHolderInfo> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateStockHolderInfo, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "股票代码",
      dataIndex: "stock_symbol_full",
      key: "stock_symbol_full",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股东名称",
      dataIndex: "holder_name",
      key: "holder_name",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股东信息",
      dataIndex: "holder_info",
      key: "holder_info",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股东类型",
      dataIndex: "holder_type",
      key: "holder_type",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "持股数量",
      dataIndex: "share_amount",
      key: "share_amount",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "持股比例",
      dataIndex: "share_ratio",
      key: "share_ratio",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "持股变动数量",
      dataIndex: "change_amount",
      key: "change_amount",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "变动类型",
      dataIndex: "change_type",
      key: "change_type",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "报告日期",
      dataIndex: "report_date",
      key: "report_date",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "是否十大股东",
      dataIndex: "is_top_ten",
      key: "is_top_ten",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股东排名",
      dataIndex: "ranking",
      key: "ranking",
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

  const handleStockHolderInfoExportTemplate = async () => {
    await exportStockHolderInfoTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportStockHolderInfoFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportStockHolderInfoFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportStockHolderInfoCancel = () => {
    onImportStockHolderInfoCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="股东信息导入"
      open={isImportStockHolderInfoModalVisible}
      onCancel={handleImportStockHolderInfoCancel}
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
              fileList={ stockHolderInfoImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleStockHolderInfoExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ StockHolderInfoColumns}
            dataSource={ CreateStockHolderInfoList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportStockHolderInfoComponent;