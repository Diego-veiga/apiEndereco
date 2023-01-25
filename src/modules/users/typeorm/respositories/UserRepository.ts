import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/user';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  async findByName(name: string): Promise<User | undefined> {
    return await this.findOne({
      where: {
        name,
      },
    });
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.findOne({
      where: {
        id,
      },
    });
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({
      where: {
        email,
      },
    });
  }
}
