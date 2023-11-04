import axios from 'axios';
import { IProxy } from './proxy.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ThirdPartyProxy implements IProxy {
  private readonly _url = 'https://jsonplaceholder.typicode.com/users';

  async getUser(id: number): Promise<any> {
    const response = (await axios.get(`${this._url}?id=${id}`)).data;
    if (!response.length) throw new NotFoundException('user not found');

    return {
      id: response[0].id,
      name: response[0].name,
    };
  }
}
