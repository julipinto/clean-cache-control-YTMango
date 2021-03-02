import { CacheStore } from '@/data/protocols/cache'
import { SavePurchase } from '@/domain/usecases'

export class LocalSavePurchases {
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly timestamp: Date
  ) {}
  async save(purchases: Array<SavePurchase.Params>): Promise<void> {
    this.cacheStore.replace('purchases', {
      timestamp: this.timestamp,
      value: purchases
    })
  }
}