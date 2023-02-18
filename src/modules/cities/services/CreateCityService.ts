import StatesRepository from '@modules/states/typeorm/repositories/StatesRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import City from '../typerom/entities/City';

import CitiesRepository from '../typerom/repositories/CitiesRepository';

interface IRequest {
  name: string;
  state_id: string;
  active?: boolean;
}

export default class CreateCityService {
  async execute({ name, state_id }: IRequest): Promise<City> {
    const statesRepository = getCustomRepository(StatesRepository);
    const citiesRepository = getCustomRepository(CitiesRepository);

    const stateExist = await statesRepository.findById(state_id);

    if (!stateExist) {
      throw new AppError('state not exist');
    }
    const cityWithNameExist = await citiesRepository.findByName(name);

    if (cityWithNameExist) {
      throw new AppError('There is already a city with this name');
    }

    return await citiesRepository.createCity({
      name,
      state: stateExist,
    });
  }
}
