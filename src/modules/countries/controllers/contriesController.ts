import { Request, Response } from 'express';
import CreateContriesService from '../services/CreateContriesService';

export default class ContriesController {
  async create(request: Request, response: Response): Promise<Response> {
    const createContriesService = new CreateContriesService();
    const { name } = request.body;

    const newContries = await createContriesService.execute(name);

    return response.json(newContries).status(201);
  }
}
