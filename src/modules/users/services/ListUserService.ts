import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user';
import UsersRepository from '../typeorm/respositories/UserRepository';

export default class ListUserService {
  async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    return await usersRepository.find();
  }
}
