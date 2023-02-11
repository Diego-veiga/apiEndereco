import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import StatesRepository from '../typeorm/repositories/StatesRepository';

export default class DeleteStatesService {
  async execute(id: string): Promise<void> {
    const statesRepository = getCustomRepository(StatesRepository);

    const statesExist = await statesRepository.findById(id);

    if (!statesExist) {
      throw new AppError('State not found');
    }
    statesExist.active = false;

    await statesRepository.save(statesExist);
  }
}
