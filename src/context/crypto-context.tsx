import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { fakeFetchAssets, fakeFetchCrypto } from '../api';
import type { AssetWithStats, CryptoCoin } from '../types';
import { percentDifference } from '../utils'

export interface CryptoContextValue {
  assets: AssetWithStats[]
  crypto: CryptoCoin[]
  loading: boolean
}

const CryptoContext = createContext<CryptoContextValue | undefined>(undefined)

export function CryptoContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState<CryptoCoin[]>([])
  const [assets, setAssets] = useState<AssetWithStats[]>([])

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await fakeFetchCrypto()
      const assetsData = await fakeFetchAssets()
      setAssets(
        assetsData.map((asset) => {
          const coin = result.find((c) => c.id === asset.id)
          const coinPrice = coin?.price ?? asset.price
          return {
            grow: asset.price < coinPrice,
            growPercent: percentDifference(asset.price, coinPrice),
            totalAmount: asset.amount * coinPrice,
            totalProfit: asset.amount * coinPrice - asset.amount * asset.price,
            ...asset
          }
        })
      )
      setCrypto(result)
      setLoading(false)
    }
    preload()
  }, [])

  return <CryptoContext.Provider value={{ loading, crypto, assets }}>{children}</CryptoContext.Provider>
}

export const useCrypto = () => {
  const context = useContext(CryptoContext)
  if (!context) {
    throw new Error("useCrypto must be used within CryptoContextProvider")
  }
  return context
}

export default CryptoContext