'use client';

import { useEffect, useState } from 'react';
import { probeService } from '@/service/probe-service';
import { Card, Spin, Alert, Typography } from 'antd';

const { Title, Text } = Typography;

export default function Home() {
  const [probeData, setProbeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProbeData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await probeService();
        setProbeData(result);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch probe data');
      } finally {
        setLoading(false);
      }
    };

    fetchProbeData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Title level={2}>Home Page</Title>
      <Card title="Probe Service Result" className="mt-4">
        {probeData ? (
          <pre className="bg-gray-50 p-4 rounded overflow-auto">
            <Text code>
              {JSON.stringify(probeData, null, 2)}
            </Text>
          </pre>
        ) : (
          <Text type="secondary">No data available</Text>
        )}
      </Card>
    </div>
  );
}