import { Request, Response } from 'express';
import CreateStateService from '../services/CreateStateService';
import DeleteStatesService from '../services/DeleteStatesService';
import ListStateService from '../services/ListStateService';
import ShowStateService from '../services/ShowStateService';
import UpdateStateService from '../services/UpdateStateService';

export default class StatesController {
  async create(request: Request, response: Response): Promise<Response> {
    const createStateService = new CreateStateService();
    const { name, abbreviation, contry_id } = request.body;

    const newState = await createStateService.execute({
      name,
      abbreviation,
      contry_id,
    });

    return response.json(newState).status(201);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listStateService = new ListStateService();

    const states = await listStateService.execute();

    return response.json(states).status(200);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showStateService = new ShowStateService();
    const { id } = request.params;

    const state = await showStateService.execute(id);

    return response.json(state).status(200);
  }
  async update(request: Request, response: Response): Promise<Response> {
    const updateStatesService = new UpdateStateService();
    const { id } = request.params;

    const { name, abbreviation, contry_id } = request.body;

    const statesUpdated = await updateStatesService.execute({
      id,
      name,
      abbreviation,
      contry_id,
    });

    return response.json(statesUpdated).status(200);
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const deleteContriesService = new DeleteStatesService();
    const { id } = request.params;

    await deleteContriesService.execute(id);

    return response.json().status(200);
  }
}
