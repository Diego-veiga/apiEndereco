import City from '../entities/City';
import { EntityRepository, Repository } from 'typeorm';

interface IState {
  id: string;
}

interface IRequest {
  name: string;
  state: IState;
  active?: boolean;
}

@EntityRepository(City)
export default class CitiesRepository extends Repository<City> {
  async findById(id: string): Promise<City | undefined> {
    return await this.findOne(id, { relations: ['state'] });
  }
  async findByName(name: string): Promise<City | undefined> {
    return await this.findOne({ where: { name }, relations: ['state'] });
  }

  async createCity({ name, state }: IRequest): Promise<City> {
    const city = await this.create({ name, state });

    await this.save(city);
    return city;
  }
}
