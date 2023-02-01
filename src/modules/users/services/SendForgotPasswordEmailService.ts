import EtherealMail from '@config/mail/EtherealMail';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/respositories/UserRepository';
import UserTokenRepository from '../typeorm/respositories/UserTokensRepository';
interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.senMail({
      to: { name: user.name, email: user.email },
      subject: '[API Endereço] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:300/reset_password?token=${token?.token}`,
        },
      },
    });
  }
}
