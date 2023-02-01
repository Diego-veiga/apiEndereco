import { getCustomRepository } from 'typeorm';
import Contries from '../typeorm/entities/Contries';
import ContriesRepository from '../typeorm/repositories/ContriesRepository';

export default class ListContriesService {
  async execute(): Promise<Contries[]> {
    const contriesRepository = getCustomRepository(ContriesRepository);

    return await contriesRepository.find();
  }
}
