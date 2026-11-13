import { Flex, Typography } from "antd"
import type { CryptoCoin } from "../../types"

interface CoinInfoProps {
  coin: CryptoCoin | null
  withSymbol?: boolean
}

export default function CoinInfo({ coin, withSymbol = false }: CoinInfoProps) {

  if (!coin) return null

  return (
    <Flex align='center'>
      <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
      <Typography.Title level={2} style={{ margin: 0, marginRight: 10 }}>
        {withSymbol && <span>{(coin.symbol)}</span>} {coin.name}
      </Typography.Title>
    </Flex>
  )
}