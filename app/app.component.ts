import { Component } from '@angular/core';

@Component({
  selector: 'step',
  template: `<h1>Hello {{name}}</h1>`
})
export class AppComponent { name = 'Angular'; }