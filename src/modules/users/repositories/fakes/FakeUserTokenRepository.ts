import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { v4 as uuid } from 'uuid';
import IUserTokenRepository from '../IUserTokenRepository';

export default class FakeUserTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  async generate(user_id: string): Promise<UserToken> {
    const userToken = {
      ...new UserToken(),
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}
