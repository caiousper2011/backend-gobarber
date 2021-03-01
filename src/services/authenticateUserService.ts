import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { request } from 'express';
import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('incorrect email/password combination');
    }

    const passworMatched = await compare(password, user.password);

    if (!passworMatched) {
      throw new Error('incorrect email/password combination');
    }
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ id: user.id }, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
