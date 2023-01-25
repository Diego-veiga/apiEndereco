import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export default class UserTokenRepository extends Repository<UserToken> {
  async findByToken(token: string): Promise<UserToken | undefined> {
    return await this.findOne({
      where: {
        token,
      },
    });
  }

  async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = this.create({
      user_id,
    });
    return await this.save(userToken);
  }
}
