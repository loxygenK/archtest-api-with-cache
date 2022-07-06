export class CacheKeyProvider<P = undefined> {
  namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  generateKey(param: P): [string, P] {
    return [this.namespace, param];
  }

  filterQueryKey(param?: P): (key: unknown) => boolean {
    return (key: unknown) => {
      if(!this.isOurCacheKey(key)) {
        return false;
      }

      return param !== undefined && key[1] === param;
    }
  }

  isOurCacheKey(key: unknown): key is [string, P] {
    if(!Array.isArray(key)) {
      return false;
    }

    if(key.length !== 2) {
      return false;
    }

    const [namespace, _] = key;

    if(namespace !== this.namespace) {
      return false;
    }

    return true;
  }
}
