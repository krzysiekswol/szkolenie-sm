import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { PresentationComponent } from './training/components/presentation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <itme-presentation/>
  `,
  imports: [PresentationComponent],
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
