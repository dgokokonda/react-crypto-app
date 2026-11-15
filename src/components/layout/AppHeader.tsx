import { useState, useEffect, type CSSProperties } from 'react';
import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from '../../context/crypto-context';
import type { CryptoCoin } from '../../types';
import CoinInfoModal from '../common/CoinInfoModal';
import AssetForm from '../common/AssetForm';

const headerStyle: CSSProperties = {
  width: '100%',
  textAlign: "center",
  height: 60,
  padding: '1rem',
  position: 'fixed',
  display: "flex",
  justifyContent: "space-between",
  alignItems: 'center',
  color: '#fff',
  backgroundColor: '#011c4c'
};


export default function AppHeader() {
  const { crypto } = useCrypto()
  const [select, setSelect] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [coin, setCoin] = useState<CryptoCoin | null>(null)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const keypress = (event: KeyboardEvent) => {
      if (event.key === '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value: string) {
    const selected = crypto.find(c => c.id === value)
    setCoin(selected ?? null)
    setModal(true)
    setSelect(false)
  }

  return <Layout.Header style={headerStyle}>
    <Select
      style={{
        width: 250,
      }}
      open={select}
      onSelect={handleSelect}
      onClick={() => setSelect((prev) => !prev)}
      value="Get asset info"
      options={crypto.map((coin) => ({
        label: coin.name,
        value: coin.id,
        icon: coin.icon,
      }))}
      optionRender={(option) => (
        <Space>
          <img
            style={{ width: 20 }}
            src={option.data.icon}
            alt={option.data.label}
          />{' '}
          {option.data.label}
        </Space>
      )}
    />

    <Button type="primary" onClick={() => setDrawer(true)}>
      Add asset
    </Button>

    <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
      <CoinInfoModal coin={coin} />
    </Modal>

    <Drawer
      placement="right"
      bodyStyle={{ overflow: 'auto', maxHeight: '100vh' }}
      title="Add asset"
      onClose={() => setDrawer(false)}
      open={drawer}
      destroyOnHidden
    >
      <AssetForm onClose={() => setDrawer(false)} />
    </Drawer>
  </Layout.Header>;
}
