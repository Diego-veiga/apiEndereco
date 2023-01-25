import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/respositories/UserRepository';
import uploadConfig from '@config/upload';
import fs from 'fs';
import User from '../typeorm/entities/user';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);
    return user;
  }
}
