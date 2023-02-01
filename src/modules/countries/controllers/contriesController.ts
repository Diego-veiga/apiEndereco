import { Request, Response } from 'express';
import CreateContriesService from '../services/CreateContriesService';
import DeleteContriesService from '../services/DeleteContriesService';
import ListContriesService from '../services/ListContriesService ';
import ShowContriesService from '../services/ShowContriesService';
import UpdateContriesService from '../services/UpdateContriesService';

export default class ContriesController {
  async create(request: Request, response: Response): Promise<Response> {
    const createContriesService = new CreateContriesService();
    const { name } = request.body;

    const newContries = await createContriesService.execute(name);

    return response.json(newContries).status(201);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listContriesService = new ListContriesService();

    const contries = await listContriesService.execute();

    return response.json(contries).status(200);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showContriesService = new ShowContriesService();
    const { id } = request.params;

    const contry = await showContriesService.execute(id);

    return response.json(contry).status(200);
  }
  async update(request: Request, response: Response): Promise<Response> {
    const updateContriesService = new UpdateContriesService();
    const { id } = request.params;
    const { name } = request.body;

    const contryUpdated = await updateContriesService.execute({ id, name });

    return response.json(contryUpdated).status(200);
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const deleteContriesService = new DeleteContriesService();
    const { id } = request.params;

    await deleteContriesService.execute(id);

    return response.json().status(200);
  }
}
