import { Request, Response } from 'express';
import CreateCityService from '../services/CreateCityService';
import DeleteCityService from '../services/DeleteCityService';
import ListCityService from '../services/ListCityService';
import ShowCityService from '../services/ShowCityService';
import UpdateCityService from '../services/UpdateCityService';

export default class CitiesController {
  async create(request: Request, response: Response): Promise<Response> {
    const createCitiesService = new CreateCityService();
    const { name, state_id } = request.body;

    const newCity = await createCitiesService.execute({ name, state_id });

    return response.json(newCity).status(201);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listCitiesService = new ListCityService();

    const cities = await listCitiesService.execute();

    return response.json(cities).status(200);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showCitiesService = new ShowCityService();
    const { id } = request.params;

    const cities = await showCitiesService.execute(id);

    return response.json(cities).status(200);
  }
  async update(request: Request, response: Response): Promise<Response> {
    const updateCitiesService = new UpdateCityService();
    const { id } = request.params;
    const { name, state_id } = request.body;

    const cityUpdated = await updateCitiesService.execute({
      id,
      name,
      state_id,
    });

    return response.json(cityUpdated).status(200);
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const deleteCitiesService = new DeleteCityService();
    const { id } = request.params;

    await deleteCitiesService.execute(id);

    return response.json().status(200);
  }
}
