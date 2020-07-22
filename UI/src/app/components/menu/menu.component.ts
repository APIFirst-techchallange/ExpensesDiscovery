import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor() { }

  ngOnInit() {
    this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  }

  endJourney(){
    localStorage.removeItem("initialJourney");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "http://localhost:4200";
  }

}
