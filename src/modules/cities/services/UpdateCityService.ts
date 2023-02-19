import StatesRepository from '@modules/states/typeorm/repositories/StatesRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import City from '../typeorm/entities/City';
import CitiesRepository from '../typeorm/repositories/CitiesRepository';

interface IRequest {
  id: string;
  name: string;
  state_id: string;
  active?: boolean;
}

export default class UpdateCityService {
  async execute({ id, name, state_id }: IRequest): Promise<City> {
    const statesRepository = getCustomRepository(StatesRepository);
    const cityRepository = getCustomRepository(CitiesRepository);

    const city = await cityRepository.findById(id);

    if (!city) {
      throw new AppError('city not found');
    }
    const stateExist = await statesRepository.findById(state_id);

    if (!stateExist) {
      throw new AppError('state not exist');
    }
    const cityNameExist = await cityRepository.findByName(name);
    if (cityNameExist && cityNameExist.id !== cityNameExist.id) {
      throw new AppError('There is already one state with this name');
    }

    city.name = name;
    city.state = stateExist;

    return await cityRepository.save(city);
  }
}
