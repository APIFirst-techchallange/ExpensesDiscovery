import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private router: Router,) { }

  ngOnInit() {
  }

  viewTransactions(){
    this.router.navigate(['secure/user/transactions']);
  }

  viewCategorisedTransactions(){
    this.router.navigate(['secure/user/expense-trends']);
  }

  viewAdvices(){
    this.router.navigate(['secure/user/advice']);

  }

  viewAlerts(){
    this.router.navigate(['secure/user/alerts']);
  }

 
  

}

