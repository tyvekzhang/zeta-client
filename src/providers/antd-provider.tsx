'use client';

import { APP_CONFIG } from '@/config';
import { StyleProvider } from '@ant-design/cssinjs';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import React from 'react';

export function AntdProvider({ children }: { children: React.ReactNode }) {

  const colorPrimary = '#5079f6';
  const primaryDarkBg = '#263238';
  const submenuDarkBg = '#202b30';
  const itemSelectedColor = '#e2e2e8';
  const itemHoverColor = '#e2e2e8';

  return (
    <AntdRegistry>
      <StyleProvider layer>
        <ConfigProvider
          prefixCls={APP_CONFIG.PREFIX_CLS}
          theme={{
            token: {
              colorPrimary: colorPrimary,
            },
            components: {
              Menu: {
                darkItemBg: primaryDarkBg,
                darkSubMenuItemBg: submenuDarkBg,
                darkPopupBg: submenuDarkBg,
                darkItemSelectedColor: itemSelectedColor,
                darkItemHoverColor: itemHoverColor,
              },
              Layout: {
                siderBg: primaryDarkBg,
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </StyleProvider>
    </AntdRegistry>
  );
}
