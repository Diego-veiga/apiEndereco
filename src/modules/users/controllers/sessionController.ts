import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

export default class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionService();
    const user = await createSessionService.execute({
      email,
      password,
    });

    return response.json(user).status(200);
  }
}
