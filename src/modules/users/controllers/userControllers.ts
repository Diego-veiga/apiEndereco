import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserServices';
import ListUserService from '../services/ListUserService';

export default class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();
    const users = await listUserService.execute();

    return response.json(users).status(200);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, lastName, email, password } = request.body;

    const createUserService = new CreateUserService();

    const newUser = await createUserService.execute({
      name,
      lastName,
      email,
      password,
    });

    return response.json(newUser).status(201);
  }
}
