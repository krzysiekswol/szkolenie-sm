import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  OnInit,
  inject,
} from '@angular/core';
import { LoggerBService, LoggerService } from '../services/logger.service';
import { LOGGER_A } from '../misc/misc';
import { LOGGER_B } from '../misc/misc';

// const LOGGER_A = 'LOGGER_SERVICE';
// const LOGGER_B = 'LOGGER_SERVICE';

export function serviceFactory(isRetry: number, serviceA: LoggerService, serviceB: LoggerBService) {
  return isRetry > 2 ? serviceA : serviceB;
}

const API_URL = new InjectionToken<string>('');

@Component({
  standalone: true,
  selector: 'itme-presentation',
  template: `
  <p>{{message}}</p>
  <p class="b">{{messageB}}</p>
  `,
  styles: `
  p {
    font-weight: 600;
    font-size: 20px;
  }

  .b {
    color: red;
  }
  `,
  providers: [
    // {
    //   provide: API_URL,
    //   useValue: 'localhost:8084/chatGpt',
    // },
    // {
    //   provide: LOGGER_A,
    //   useClass: LoggerService,  // InjectionToken
    // },
    // {
    //   provide: LOGGER_B,
    //   useClass: LoggerBService, // InjectionToken
    // },
    {
      provide: LOGGER_A,
      useClass: LoggerService,
    },
    {
      provide: LOGGER_B,
      useClass: LoggerBService,
    },
    {
      provide: API_URL,
      useValue:  1,
    },
    // {
    //   provide: 'API_URL',
    //   useFactory: () => {
    //     return {
    //       apiUrl: 'localhost:8084:GEMINI',
    //       retry: 3
    //     }
    //   }
    // }
    {
      provide: 'API_URL_CONDITION',
      useFactory: serviceFactory,
      deps: [API_URL, LOGGER_A, LOGGER_B]
    }
  ],
  // providers: [LoggerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationComponent implements OnInit {
  // private loggerA: LoggerService = inject(LoggerService);
  // private loggerB: LoggerBService = inject(LoggerBService);

  constructor(
    // @Inject('API_URL') private url: { apiUrl: string, retry: number },
    @Inject(API_URL) private url: any,
    // @Inject(LOGGER_A) private loggerA: LoggerService,
    // @Inject(LOGGER_B) private loggerB: LoggerBService,
    @Inject('API_URL_CONDITION') private logger: LoggerService | LoggerBService,
  ) {}

  public message: string | number = '';
  public messageB: string | number = '';

  public ngOnInit(): void {
    // this.message = this.logger.showMessage(this.url.apiUrl);
    // this.messageB = this.logger.showMessage(this.url.retry)
    // console.log(this.url)     // diff useValue/useFactory


    // Conditionally
    this.message = this.logger.showMessage(this.url);
    this.messageB = this.logger.showMessage(this.url)
  }
}
