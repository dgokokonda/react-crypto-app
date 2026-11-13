import { useRef, useState } from "react"
import { Select, Space, Divider, Form, Button, InputNumber, DatePicker, Result } from "antd"
import type { Asset, CryptoCoin } from "../../types"
import { useCrypto } from "../../context/crypto-context"
import CoinInfo from "./CoinInfo"

interface AssetFormProps {
  onClose: () => void
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} in not valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

export default function AssetForm({ onClose }: AssetFormProps) {
  const { crypto, addAsset } = useCrypto()
  const [coin, setCoin] = useState<CryptoCoin | null>(null)
  const [form] = Form.useForm<Asset>()
  const [submitted, setSubmitted] = useState(false)
  const assetRef = useRef<Asset | null>(null)

  if (submitted) {
    const currentAsset = assetRef.current
    return (
      <Result
        status="success"
        title="New asset added"
        subTitle={currentAsset && coin
          ? `Added ${currentAsset.amount} of ${coin.name} by price ${currentAsset.price}$`
          : ""
        }
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }

  function handleSelect(value: string) {
    const selected = crypto.find(c => c.id === value)
    setCoin(selected ?? null)
  }

  if (!coin) return (
    <Select
      style={{ width: '100%' }}
      onSelect={handleSelect}
      value="Select coin"
      options={crypto.map((c) => ({
        label: c.name,
        value: c.id,
        icon: c.icon,
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
  )

  function onFinish(values: Asset) {
    const newAsset: Asset = {
      id: coin!.id,
      amount: values.amount,
      price: values.price,
      date: (values.date?.$d ?? new Date()) as Date & { $d: Date }
    }
    assetRef.current = newAsset
    setSubmitted(true)
    addAsset(newAsset)
  }
  function handleAmountChange(value: number | null) {
    const price = form.getFieldValue('price')
    form.setFieldsValue({
      total: +(value! * price).toFixed(2)
    })
  }
  function handlePriceChange(value: number | null) {
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(amount! * value!).toFixed(2)
    })
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 18,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  )
}