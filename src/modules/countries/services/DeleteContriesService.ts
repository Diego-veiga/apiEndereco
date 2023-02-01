import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Contries from '../typeorm/entities/Contries';
import ContriesRepository from '../typeorm/repositories/ContriesRepository';

export default class DeleteContriesService {
  async execute(id: string): Promise<void> {
    const contriesRepository = getCustomRepository(ContriesRepository);

    const contryExist = await contriesRepository.findOne({ where: { id } });

    if (!contryExist) {
      throw new AppError('Contry not found');
    }

    await contriesRepository.remove(contryExist);
  }
}
