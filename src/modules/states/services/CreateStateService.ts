import ContriesRepository from '@modules/countries/typeorm/repositories/ContriesRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import States from '../typeorm/entities/states';
import StatesRepository from '../typeorm/repositories/StatesRepository';

interface IRequest {
  name: string;
  abbreviation: string;
  contry_id: string;
  active?: boolean;
}

export default class CreateStateService {
  async execute({ name, abbreviation, contry_id }: IRequest): Promise<States> {
    const statesRepository = getCustomRepository(StatesRepository);
    const contryRepository = getCustomRepository(ContriesRepository);

    const contryExist = await contryRepository.findById(contry_id);

    if (!contryExist) {
      throw new AppError('contry not exist');
    }
    const stateWithNameExist = await statesRepository.findByName(name);

    if (stateWithNameExist) {
      throw new AppError('There is already a state with this name');
    }
    const stateWithAbbreviationExist =
      await statesRepository.findByAbbreviation(abbreviation);

    if (stateWithAbbreviationExist) {
      throw new AppError('There is already a state with this abbreviation');
    }

    return await statesRepository.createState({
      name,
      abbreviation,
      contry: contryExist,
    });
  }
}
