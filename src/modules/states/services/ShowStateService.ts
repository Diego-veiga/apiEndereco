import { getCustomRepository } from 'typeorm';
import States from '../typeorm/entities/states';
import StatesRepository from '../typeorm/repositories/StatesRepository';

export default class ShowStateService {
  async execute(id: string): Promise<States | undefined> {
    const statesRepository = getCustomRepository(StatesRepository);
    return await statesRepository.findById(id);
  }
}
