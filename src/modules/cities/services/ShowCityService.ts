import { getCustomRepository } from 'typeorm';
import City from '../typeorm/entities/City';
import CitiesRepository from '../typeorm/repositories/CitiesRepository';

export default class ShowCityService {
  async execute(id: string): Promise<City | undefined> {
    const cityRepository = getCustomRepository(CitiesRepository);
    return await cityRepository.findById(id);
  }
}
