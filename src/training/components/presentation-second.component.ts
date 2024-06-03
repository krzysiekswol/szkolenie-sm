import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  OnInit,
  inject,
} from '@angular/core';
import { LoggerService } from '../services/logger.service';

// const API_URL = new InjectionToken<string>('')

@Component({
  standalone: true,
  selector: 'itme-second-presentation',
  template: `
  <p>{{message}}</p>
  `,
  styles: `
  p {
    font-weight: 600;
    font-size: 20px;
  }
  `,
  providers: [
    {
      provide: 'API_URL',
      useValue: 'localhost:8084/chatGpt',
    },
    {
      provide: LoggerService,
      useClass: LoggerService, // typedToken
    },
    // {
    //   provide: API_URL,
    //   useValue: 'localhost:8084/Gemini', // overwrite......
    // },
  ],
  // providers: [LoggerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationSecondComponent implements OnInit {
  private logger: LoggerService = inject(LoggerService);

  constructor(@Inject('API_URL') private url: string) {}

  public message: string = '';

  public ngOnInit(): void {
    this.message = this.logger.showMessage(this.url);
  }
}
