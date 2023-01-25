import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user';
import UsersRepository from '../typeorm/respositories/UserRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
}
export default class CreateUserService {
  async execute({ name, lastName, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const emailExist = await usersRepository.findByEmail(email);
    if (emailExist) {
      throw new AppError('Email address already user');
    }

    const hashedPassword = await hash(password, 8);

    const newCreated = usersRepository.create({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    return usersRepository.save(newCreated);
  }
}
