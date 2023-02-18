import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import CitiesRepository from '../typerom/repositories/CitiesRepository';

export default class DeleteCityService {
  async execute(id: string): Promise<void> {
    const cityRepository = getCustomRepository(CitiesRepository);

    const cityExist = await cityRepository.findById(id);

    if (!cityExist) {
      throw new AppError('City not found');
    }
    cityExist.active = false;

    await cityRepository.save(cityExist);
  }
}
