import { EntityRepository, Repository } from 'typeorm';
import Contries from '../entities/Contries';

@EntityRepository(Contries)
export default class ContriesRepository extends Repository<Contries> {
  async findByName(name: string): Promise<Contries | undefined> {
    return await this.findOne({
      where: {
        name,
      },
    });
  }
  async findById(id: string): Promise<Contries | undefined> {
    return await this.findOne({
      where: {
        id,
      },
    });
  }
}
