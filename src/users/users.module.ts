import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheProxy } from './proxy/cache.proxy';
import { UsersController } from './users.controller';
import { CustomRedisService } from 'src/config/redis/redis.service';
import { UserRepository } from './repository/user.repository';
import { DbProxy } from './proxy/db.proxy';
import { ThirdPartyProxy } from './proxy/third-party.proxy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    CacheProxy,
    CustomRedisService,
    UserRepository,
    CacheProxy,
    DbProxy,
    ThirdPartyProxy,
  ],
})
export class UsersModule {}
