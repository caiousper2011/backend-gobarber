import { v4 as uuid } from 'uuid';
import { IUserRepository } from '../IUsersRepository';
import User from '../../infra/typeorm/entities/User';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

export default class UserRepository implements IUserRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = {
      ...new User(),
      ...userData,
      id: uuid(),
    };

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(({ id }) => id === user.id);

    this.users[userIndex] = user;

    return user;
  }
}
