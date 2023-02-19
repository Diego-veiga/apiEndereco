import { getCustomRepository } from 'typeorm';
import City from '../typeorm/entities/City';
import CitiesRepository from '../typeorm/repositories/CitiesRepository';

export default class ListCityService {
  async execute(): Promise<City[]> {
    const cityRepository = getCustomRepository(CitiesRepository);

    return await cityRepository.find({ relations: ['state'] });
  }
}
