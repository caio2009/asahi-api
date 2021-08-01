import { container } from 'tsyringe';
import { Request, Response } from 'express';
import SignInService from '@modules/session/services/sessions/SignInService';
import RefreshTokenService from '@modules/session/services/sessions/RefreshTokenService';
import SignOutService from '@modules/session/services/sessions/SignOutService';

class SessionsController {
  async create(req: Request, res: Response) {
    const { username, password } = req.body;

    const signIn = container.resolve(SignInService);
    const authData = await signIn.execute({ username, password });

    return res.json(authData);
  }

  async update(req: Request, res: Response) {
    const { refreshToken: token } = req.body;

    const refreshToken = container.resolve(RefreshTokenService);
    const authData = await refreshToken.execute(token);

    return res.json(authData);
  }

  async delete(req: Request, res: Response) {
    const { refreshToken } = req.body;

    const signOut = container.resolve(SignOutService);
    await signOut.execute(refreshToken);

    return res.status(204).send();
  }
}

export default SessionsController;