import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/respositories/UserRepository';
import UserTokenRepository from '../typeorm/respositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await usersRepository.findById(userToken!.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken!.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token experid');
    }
    user.password = await hash(password, 8);
    usersRepository.save(user);
  }
}
