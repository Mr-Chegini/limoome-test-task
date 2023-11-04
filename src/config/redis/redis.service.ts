import { Redis } from 'ioredis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CustomRedisService {
  static readonly TTL = 60 * 60;
  private readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis({
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
    });
  }

  async set(id: number, data: User): Promise<void> {
    await this.client.hset(this.getKey(id), data);
    await this.client.expire(this.getKey(id), CustomRedisService.TTL);
  }

  async get(id: number): Promise<User | null> {
    const cachedUser = await this.client.hgetall(this.getKey(id));
    if (Object.keys(cachedUser).length === 0) {
      return null;
    }
    return {
      id,
      name: cachedUser.name,
    };
  }

  private getKey(id: number): string {
    return `USER:${id}`;
  }
}
