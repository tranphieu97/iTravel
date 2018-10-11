import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {

  timer: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.timer = 5;
    this.CountdownStart();
  }

  CountdownStart(): void {
    const interval = setInterval(() => {
      this.timer--;

      if (this.timer === 0) {
        clearInterval(interval);
        // Change page to redirect here!
        this.router.navigate(['']);
      }
    }, 1000);
  }
}
