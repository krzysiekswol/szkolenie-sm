import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { PresentationComponent } from './training/components/presentation.component';
import { PresentationSecondComponent } from './training/components/presentation-second.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <itme-presentation/>
    <itme-second-presentation/>
  `,
  imports: [PresentationComponent, PresentationSecondComponent],
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
