import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';
import { LoginUserDto, UserService } from '../users/index.js';
import { UserEntity } from '../users/user.entity.js';
import { AuthService, TokenPayload, JWT_ALGORITHM, JWT_EXPIRED } from './index.js';
import { RestSchema, Config } from '../../config/index.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../../libs/logger/index.js';
import { UserNotFoundException, UserPasswordIncorrectException } from './errors/index.js';

@injectable()
export class DefaultService implements AuthService {
   constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');

    const tokenPayload: TokenPayload ={
      name: user.author,
      email: user.email,
      id: user.id
    };

    this.logger.info(`Create token for ${user.email}`);

    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg:JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey)
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user =  await this.userService.findByEmail(dto.email);

    if(!user) {
      this.logger.warn(`User with ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if (! user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}

