import { getCustomRepository } from 'typeorm';
import City from '../typerom/entities/City';
import CitiesRepository from '../typerom/repositories/CitiesRepository';

export default class ListCityService {
  async execute(): Promise<City[]> {
    const cityRepository = getCustomRepository(CitiesRepository);

    return await cityRepository.find({ relations: ['state'] });
  }
}
