import { getRepository, Repository } from 'typeorm';
import IUserTokenRepository from '../../../repositories/IUserTokenRepository';
import UserToken from '../entities/UserToken';

export default class UsersTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.findOne({ where: { token } });

    return userToken;
  }

  async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
