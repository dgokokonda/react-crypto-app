export interface Asset {
  id: string;
  name?: string;
  amount: number;
  price: number;
  date: Date & { $d?: Date };
  total?: number;
}

export interface AssetStats {
  grow: boolean;
  growPercent: number;
  totalAmount: number;
  totalProfit: number;
}

export type AssetWithStats = Asset & AssetStats;

export interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  icon: string;
  priceChange1h: number;
  priceChange1d: number;
  priceChange1w: number;
  priceBtc: number;
  marketCap: number;
  contractAddress?: string | null;
  decimals?: number;
  [key: string]: unknown;
}

export interface CryptoMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface CryptoData {
  result: CryptoCoin[];
  meta: CryptoMeta;
}
