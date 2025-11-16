// SPDX-License-Identifier: MIT
import { exportStockDailyRecommendationTemplate } from '@/service/stock-daily-recommendation';
import { CreateStockDailyRecommendation, ImportStockDailyRecommendationsResponse} from '@/types/stock-daily-recommendation';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportStockDailyRecommendationProps {
  isImportStockDailyRecommendationModalVisible: boolean;
  isImportStockDailyRecommendationLoading: boolean;
  onImportStockDailyRecommendationCancel: () => void;
  onImportStockDailyRecommendationFinish: (fileList: RcFile[]) => Promise<ImportStockDailyRecommendationsResponse>;
  handleImportStockDailyRecommendation: () => void;
}

const ImportStockDailyRecommendationComponent: React.FC<ImportStockDailyRecommendationProps> = ({
  isImportStockDailyRecommendationModalVisible,
  onImportStockDailyRecommendationCancel,
  onImportStockDailyRecommendationFinish,
  isImportStockDailyRecommendationLoading,
  handleImportStockDailyRecommendation,
}) => {
  const [stockDailyRecommendationImportFileList, setImportStockDailyRecommendationFileList] = useState<RcFile[]>([]);
  const [CreateStockDailyRecommendationList, setCreateStockDailyRecommendationList] = useState<CreateStockDailyRecommendation[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportStockDailyRecommendationCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportStockDailyRecommendationLoading} onClick={handleImportStockDailyRecommendationConfirm}>
      确定
    </Button>,
  ];

  const handleImportStockDailyRecommendationConfirm = async () => {
    if (isUploadShow) {
      if (stockDailyRecommendationImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importStockDailyRecommendationResponse = await onImportStockDailyRecommendationFinish(stockDailyRecommendationImportFileList);
        setIsUploadShow(false);
        setCreateStockDailyRecommendationList(importStockDailyRecommendationResponse.stockDailyRecommendations);
      } finally {
        setImportStockDailyRecommendationFileList([]);
      }
    } else {
      handleImportStockDailyRecommendation();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const StockDailyRecommendationColumns: ColumnsType<CreateStockDailyRecommendation> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateStockDailyRecommendation, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "股票代码",
      dataIndex: "stock_symbol_full",
      key: "stock_symbol_full",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "推荐日期",
      dataIndex: "recommend_date",
      key: "recommend_date",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "推荐等级",
      dataIndex: "recommend_level",
      key: "recommend_level",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "当前价",
      dataIndex: "price",
      key: "price",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "目标价",
      dataIndex: "target_price",
      key: "target_price",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "推荐理由",
      dataIndex: "recommend_reason",
      key: "recommend_reason",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "分析师",
      dataIndex: "analyst",
      key: "analyst",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "机构名称",
      dataIndex: "institution",
      key: "institution",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "风险等级",
      dataIndex: "risk_level",
      key: "risk_level",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "有效期",
      dataIndex: "validity_period",
      key: "validity_period",
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

  const handleStockDailyRecommendationExportTemplate = async () => {
    await exportStockDailyRecommendationTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportStockDailyRecommendationFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportStockDailyRecommendationFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportStockDailyRecommendationCancel = () => {
    onImportStockDailyRecommendationCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="股票每日推荐导入"
      open={isImportStockDailyRecommendationModalVisible}
      onCancel={handleImportStockDailyRecommendationCancel}
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
              fileList={ stockDailyRecommendationImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleStockDailyRecommendationExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ StockDailyRecommendationColumns}
            dataSource={ CreateStockDailyRecommendationList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportStockDailyRecommendationComponent;