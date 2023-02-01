import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Contries from '../typeorm/entities/Contries';
import ContriesRepository from '../typeorm/repositories/ContriesRepository';

export default class ShowContriesService {
  async execute(id: string): Promise<Contries | undefined> {
    const contriesRepository = getCustomRepository(ContriesRepository);

    const contry = await contriesRepository.findOne({ where: { id } });
    if (!contry) {
      throw new AppError('Contry not found');
    }
    return contry;
  }
}
