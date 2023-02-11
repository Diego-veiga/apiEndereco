import ContriesRepository from '@modules/countries/typeorm/repositories/ContriesRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import States from '../typeorm/entities/states';
import StatesRepository from '../typeorm/repositories/StatesRepository';

interface IRequest {
  id: string;
  name: string;
  abbreviation: string;
  contry_id: string;
  active?: boolean;
}

export default class UpdateStateService {
  async execute({
    id,
    name,
    abbreviation,
    contry_id,
  }: IRequest): Promise<States> {
    const statesRepository = getCustomRepository(StatesRepository);
    const contryRepository = getCustomRepository(ContriesRepository);

    const states = await statesRepository.findById(id);

    if (!states) {
      throw new AppError('state not found');
    }
    const contryExist = await contryRepository.findById(contry_id);

    if (!contryExist) {
      throw new AppError('contry not exist');
    }
    const stateNameExist = await statesRepository.findByName(name);
    if (stateNameExist && stateNameExist.id !== states.id) {
      throw new AppError('There is already one state with this name');
    }

    states.name = name;
    states.abbreviation = abbreviation;
    states.contry = contryExist;

    return await statesRepository.save(states);
  }
}
