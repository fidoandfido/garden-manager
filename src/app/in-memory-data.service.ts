import {
  InMemoryDbService,
  RequestInfoUtilities,
  ParsedRequestUrl,
  RequestInfo,
  STATUS,
  getStatusText,
  ResponseOptions
} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  // HTTP POST interceptor...
  post(reqInfo: RequestInfo) {
    // Intercept 'auth', otherwise use default in memory data service handler.
    const collectionName = reqInfo.collectionName;
    if (collectionName === 'auth') {
      return this.getAuthInfo(reqInfo);
    }
    return undefined;
  }

  // Create a response to a post to any auth end point - return a simple pretend JWT response
  private getAuthInfo(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      console.log('HTTP POST override');
      const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
      const data = {
        id: 'THIS-IS-A-TOTALLY-UNIQUE-GUIID-4',
        auth_token: 'JWTJWTJWTJWTJWTJWTJWT.MIDDLEBIT.LASTBITLASTBITLASTBIT-LE',
        expires_in: 7200
      };

      const options: ResponseOptions = {
        body: dataEncapsulation ? { data } : data,
        status: STATUS.OK
      };
      options.statusText = getStatusText(options.status);
      options.headers = reqInfo.headers;
      options.url = reqInfo.url;
      return options;
    });
  }



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
