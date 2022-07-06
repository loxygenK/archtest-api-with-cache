import { UserGateway } from "../gateway/abst/user"
import { UserGatewayImpl } from "../gateway/impl/user";

export type GatewaySet = {
  user: UserGateway
}
const gatewaySet: GatewaySet = {
  user: new UserGatewayImpl()
};

export function useGatewaySet(): GatewaySet {
  return gatewaySet;
}
