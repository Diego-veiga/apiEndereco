import { EntityRepository, Repository } from 'typeorm';
import States from '../entities/states';

interface IContry {
  id: string;
}

interface IRequest {
  name: string;
  abbreviation: string;
  contry: IContry;
  active?: boolean;
}

@EntityRepository(States)
export default class StatesRepository extends Repository<States> {
  async findById(id: string): Promise<States | undefined> {
    return await this.findOne(id, { relations: ['contry'] });
  }
  async findByName(name: string): Promise<States | undefined> {
    return await this.findOne({ where: { name }, relations: ['contry'] });
  }
  async findByAbbreviation(abbreviation: string): Promise<States | undefined> {
    return await this.findOne({
      where: { abbreviation },
      relations: ['contry'],
    });
  }

  async createState({ name, abbreviation, contry }: IRequest): Promise<States> {
    console.log('{ name, abbreviation, contry }', {
      name,
      abbreviation,
      contry,
    });
    const state = await this.create({ name, abbreviation, contry });

    await this.save(state);
    return state;
  }
}
