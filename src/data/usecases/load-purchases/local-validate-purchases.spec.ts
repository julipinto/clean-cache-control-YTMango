import { LocalLoadPurchases } from '@/data/usecases'
import { mockPurchases, CacheStoreSpy } from '@/data/tests'


type SutTypes = {
  sut: LocalLoadPurchases
  cacheStore: CacheStoreSpy
}

const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy() 
  const sut = new LocalLoadPurchases(cacheStore, timestamp)
  return {
    sut,
    cacheStore
  }
}

describe('LocalSavePurchase', () => {
  test('Should not delete or insert cache on sut.init', () => {
    const { cacheStore } = makeSut()
    expect(cacheStore.actions).toEqual([])
  })

  test('Should delete cache if load fails',  () => {
    const { sut, cacheStore } = makeSut()
    cacheStore.simulateFetchError()
    sut.validate()
    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch, CacheStoreSpy.Action.delete])
    expect(cacheStore.deletekey).toEqual('purchases')
  })


})