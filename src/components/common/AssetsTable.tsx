import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useCrypto } from '../../context/crypto-context';

interface DataType {
  key: React.Key;
  name: string;
  amount: number;
  price: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Asset',
    dataIndex: 'name',
    sorter: (a, b) => a.name < b.name ? 1 : -1,
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount < b.amount ? 1 : -1,
    sortDirections: ['descend', 'ascend']
  },
];

export default function AssetsTable() {
  const { assets } = useCrypto()
  const dataSource = assets.map(a => ({ key: a.id, name: a.name ?? '', price: a.price, amount: a.amount }))

  return <Table<DataType> columns={columns} dataSource={dataSource} pagination={false} />;
}