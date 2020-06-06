import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Wyszukiwarka artykułów NYTime'
  today = new Date();

  fn(val) {
    console.warn ("zmiana licznika" +val );
  }

  posts = [
    {name: "link 1"},
    {name: "link 2"}
  ];

  
}
