import { useQuery, useQueryClient } from "react-query";
import { CacheKeyProvider } from "../cache/key";
import { UserID } from "../entity/user";
import { UserGateway } from "../gateway/abst/user";
import { useGatewaySet } from "../provider/gateway";

const cacheKeyProvider = new CacheKeyProvider<UserID>("user");

function useUserGateway(): UserGateway {
  const gateways = useGatewaySet();

  return gateways.user;
}

export function useUserById(id: UserID) {
  const userGateway = useUserGateway();

  return useQuery(
    cacheKeyProvider.generateKey(id),
    () => userGateway.fetchById(id)
  );
}

export function useInvalidateQuery() {
  const queryClient = useQueryClient();

  return {
    invalidate(id?: UserID) {
      queryClient.invalidateQueries({
        predicate: (q) => {
          return cacheKeyProvider.filterQueryKey(id)(q.queryKey);
        }
      })
    }
  }
}
