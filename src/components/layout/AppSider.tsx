import { useCrypto } from '../../context/crypto-context';
import { Card, Typography, Listy, Tag } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils'

const siderStyle: React.CSSProperties = {
  backgroundColor: "#094eaf",
  color: "#fff",
  minWidth: "320px",
  maxWidth: "360px",
  padding: '1.5rem 1rem',
  overflowY: 'auto',
  height: '100vh',
  position: 'fixed',
  top: '60px',
  boxShadow: '2px 0 8px rgba(0, 0, 0, 0.3)',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#002c72dc",
  marginBottom: '1rem',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
};

type ListyItem = {
  title: string
  value: number
  withTag?: boolean
  isPlain?: boolean
}

export default function AppSider() {
  const { assets } = useCrypto()

  if (!assets || assets.length === 0) {
    return (
      <div style={siderStyle}>
        <div style={{ textAlign: 'center', color: '#ffffff', padding: '2rem 0' }}>
          <Typography.Text style={{ color: '#85a1ff' }}>No assets</Typography.Text>
        </div>
      </div>
    )
  }

  return (
    <div style={siderStyle}>
      {assets.map(asset => (
        <Card key={asset.id} style={cardStyle} bordered={false} bodyStyle={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <Typography.Text style={{ color: '#f5f5f5', fontWeight: 'Bold', fontSize: '0.875rem', marginBottom: '0.25rem', marginRight: '0.5rem' }}>{capitalize(asset.id)}</Typography.Text>
              <Typography.Text style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff' }}>${asset.totalAmount.toFixed(2)}</Typography.Text>
            </div>
            <div style={{ textAlign: 'right' }}>
              {asset.grow ? <ArrowUpOutlined style={{ color: '#52c41a', fontSize: '1rem' }} /> : <ArrowDownOutlined style={{ color: '#ff4d4f', fontSize: '1rem' }} />}
            </div>
          </div>
          <Listy
            styles={{
              root: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
              item: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }
            }}
            items={[
              { title: 'Total Profit', value: asset.totalProfit, withTag: true },
              { title: 'Asset Amount', value: asset.amount, isPlain: true },
            ] as ListyItem[]}
            rowKey={(item) => item.title}
            itemRender={(item: ListyItem) => (
              <>
                <Typography.Text style={{ color: '#ddb9ec', fontSize: '0.875rem' }}>{item.title}</Typography.Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {item.withTag && <Tag color={asset.grow ? 'green' : 'red'} style={{ fontSize: '0.75rem' }}>{asset.growPercent.toFixed(1)}%</Tag>}
                  {item.isPlain && <Typography.Text style={{ color: '#fff', fontSize: '0.875rem' }}>{item.value.toFixed(4)}</Typography.Text>}
                  {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'} style={{ fontSize: '0.875rem' }}>${item.value.toFixed(2)}</Typography.Text>}
                </div>
              </>
            )}
          />
        </Card>
      ))}
    </div>
  );
}
