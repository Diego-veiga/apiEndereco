import { getCustomRepository } from 'typeorm';
import States from '../typeorm/entities/states';
import StatesRepository from '../typeorm/repositories/StatesRepository';

export default class ListStateService {
  async execute(): Promise<States[]> {
    const statesRepository = getCustomRepository(StatesRepository);

    return await statesRepository.find({ relations: ['contry'] });
  }
}
