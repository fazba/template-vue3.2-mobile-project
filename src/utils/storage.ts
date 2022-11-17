class MyCache {
  private storage: Storage
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage : sessionStorage
  }

  setItem(key: string, value: any) {
    if (['object', 'string'].includes(typeof value)) value = JSON.stringify(value)
    this.storage.setItem(key, value)
  }

  getItem(key: string) {
    const val = this.storage.getItem(key)
    return val ? JSON.parse(val) : val
  }

  removeItem(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }

  key(index: number) {
    return this.storage.key(index)
  }

  get length() {
    return this.storage.length
  }
}

const localCache = new MyCache()
const sessionCache = new MyCache(false)

export { localCache, sessionCache }
