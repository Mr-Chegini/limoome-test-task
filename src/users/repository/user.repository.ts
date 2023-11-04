import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

    
  async insertOne(user: User): Promise<void> {
    await this.userRepository.save({ id: user.id, name: user.name });
  }
}
