import { faker } from "@faker-js/faker";
import { User, UserID } from "../../entity/user";
import { UserGateway } from "../abst/user";

export class UserGatewayImpl implements UserGateway {
  async fetchById(id: UserID): Promise<User> {
    await new Promise((res) => setTimeout(res, 1000));

    return {
      id,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`
    }
  }
}
