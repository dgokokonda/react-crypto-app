export interface Asset {
  id: string
  amount: number
  price: number
  date: Date
}

export interface AssetStats {
  grow: boolean
  growPercent: number
  totalAmount: number
  totalProfit: number
}

export type AssetWithStats = Asset & AssetStats

export interface CryptoCoin {
  id: string
  name: string
  symbol: string
  price: number
  [key: string]: unknown
}

export interface CryptoMeta {
  page: number
  limit: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface CryptoData {
  result: CryptoCoin[]
  meta: CryptoMeta
}