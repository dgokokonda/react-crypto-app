import { cryptoAssets, cryptoData } from "./data";
import type { Asset, CryptoData } from "./types";

export function fakeFetchCrypto(): Promise<CryptoData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 10);
  });
}

export function fakeFetchAssets(): Promise<Asset[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 10);
  });
}
