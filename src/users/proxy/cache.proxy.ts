import { CustomRedisService } from 'src/config/redis/redis.service';
import { DbProxy } from './db.proxy';
import { IProxy } from './proxy.interface';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheProxy implements IProxy {
  constructor(
    private readonly redisService: CustomRedisService,
    private readonly dbProxy: DbProxy,
  ) {}

  async getUser(id: number): Promise<User> {
    const cachedUser: User = await this.redisService.get(id);
    if (!cachedUser) {
      const dbUser = await this.dbProxy.getUser(id);
      await this.redisService.set(id, dbUser);
      return dbUser;
    }

    return cachedUser;
  }
}
