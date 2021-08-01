import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserService from '@modules/session/services/users/CreateUserService';
import UpdateUserService from '@modules/session/services/users/UpdateUserService';

class UsersController {
  async create(req: Request, res: Response) {
    const { name, username, password } = req.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, username, password });

    res.location(`${process.env.API_URL}/users/${user.id}`);
    return res.status(201).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, password } = req.body;

    const updateUser = container.resolve(UpdateUserService);
    await updateUser.execute({ id, name, password });

    return res.status(204).send();
  }
}

export default UsersController;