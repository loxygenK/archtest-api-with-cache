import { User, UserID } from "../../entity/user";

export interface UserGateway {
  fetchById(id: UserID): Promise<User>;
}
