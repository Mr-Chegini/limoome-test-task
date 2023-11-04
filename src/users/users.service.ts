import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { CacheProxy } from './proxy/cache.proxy';

@Injectable()
export class UsersService {
  constructor(private readonly cachedProxy: CacheProxy) {}

  async getUser(id: number): Promise<User> {
    const user = await this.cachedProxy.getUser(id);
    return user;
  }
}
