import {
  ChangeDetectionStrategy,
  Component,
  INJECTOR,
  Inject,
  InjectionToken,
  OnInit,
  inject,
} from '@angular/core';
import { LoggerBService, LoggerService } from '../services/logger.service';
// import { LOGGER_A } from '../misc/misc';
// import { LOGGER_B } from '../misc/misc';

const LOGGER_A = 'LOGGER_SERVICE';
const LOGGER_B = 'LOGGER_SERVICE';

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
      provide: 'API_URL',
      useValue: 'localhost:8084:GEMINI'
    }
  ],
  // providers: [LoggerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationComponent implements OnInit {
  // private loggerA: LoggerService = inject(LoggerService);
  // private loggerB: LoggerBService = inject(LoggerBService);

  constructor(
    @Inject('API_URL') private url: string,
    @Inject(LOGGER_A) private loggerA: LoggerService,
    @Inject(LOGGER_B) private loggerB: LoggerBService,
  ) {}

  public message: string = '';
  public messageB: string = '';

  public ngOnInit(): void {
    this.message = this.loggerA.showMessage(this.url);
    this.messageB = this.loggerB.showMessage(this.url)
  }
}
