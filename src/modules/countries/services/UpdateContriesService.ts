import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Contries from '../typeorm/entities/Contries';
import ContriesRepository from '../typeorm/repositories/ContriesRepository';

interface IRequest {
  id: string;
  name: string;
}

export default class UpdateContriesService {
  async execute({ id, name }: IRequest): Promise<Contries> {
    const contriesRepository = getCustomRepository(ContriesRepository);

    const contry = await contriesRepository.findOne({ where: { id } });

    if (!contry) {
      throw new AppError('Country not found');
    }
    const contryNameExist = await contriesRepository.findByName(name);
    if (contryNameExist && contryNameExist.id !== contry.id) {
      throw new AppError('There is already one contry with this name');
    }

    contry.name = name;

    return await contriesRepository.save(contry);
  }
}
