import React from 'react';
import { Layout, Typography } from "antd";
import { useCrypto } from '../../context/crypto-context';
import type { CryptoCoin } from '../../types';
import PortfolioChart from '../common/PortfolioChart';
import AssetsTable from '../common/AssetsTable';

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#072a66",
  padding: "1rem",
  paddingLeft: '335px',
  paddingTop: '80px'
};


export default function AppContent() {
  const { assets, crypto } = useCrypto()
  const cryptoPriceMap = crypto.reduce((acc: Record<string, number>, c: CryptoCoin) => {
    acc[c.id] = c.price
    return acc
  }, {})

  return <Layout.Content style={contentStyle}>
    <Typography.Title level={3} style={{ textAlign: 'center', color: '#fff' }}>
      Portfolio: {
        assets.map(asset => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => acc + v, 0)
          .toFixed(2)
      }$
    </Typography.Title>
    <PortfolioChart />
    <AssetsTable />
  </Layout.Content>;
}
