import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const data = [
      { id: 1, value: 'value1' },
      { id: 2, value: 'value2' },
    ];


    const secondData = [
      { id: 221, value: '22value1' },
      { id: 222, value: '22value2' },
    ];

    return { data: data, secondData: secondData };
  }
}
