import { Injectable } from '@nestjs/common';
import { IProxy } from './proxy.interface';
import { ThirdPartyProxy } from './third-party.proxy';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class DbProxy implements IProxy {
  constructor(
    private readonly thirdPartyProxy: ThirdPartyProxy,
    private readonly userRepository: UserRepository,
  ) {}

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.getOne(id);
    if (!user) {
      const fetchedUser = await this.thirdPartyProxy.getUser(id);
      await this.userRepository.insertOne(fetchedUser);
      return fetchedUser;
    }
    return user;
  }
}
