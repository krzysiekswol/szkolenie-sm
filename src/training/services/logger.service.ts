import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  public showMessage(message: string): string {
    console.log('message', message);
    return message;
  }
}
