import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'VolleyApp';

  constructor(private primengConfig: PrimeNGConfig, private router: Router) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;  
  }
  
}
