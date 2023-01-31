import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Contries from '../typeorm/entities/Contries';
import ContriesRepository from '../typeorm/repositories/ContriesRepository';

export default class CreateContriesService {
  async execute(name: string): Promise<Contries> {
    const contriesRepository = getCustomRepository(ContriesRepository);

    const contriesExist = await contriesRepository.findByName(name);

    if (contriesExist) {
      throw new AppError('Country already registered');
    }

    const contries = contriesRepository.create({
      name,
    });

    return await contriesRepository.save(contries);
  }
}
