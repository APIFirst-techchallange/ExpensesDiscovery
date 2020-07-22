import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AccountServiceInterface} from "../service_interface/accountServiceInterface";

@Component({
  selector: 'app-redirecting',
  templateUrl: './redirecting.component.html',
  styleUrls: ['./redirecting.component.css']
})
export class RedirectingComponent implements OnInit {
  

  constructor(private router: Router,
    private accountServiceInterface: AccountServiceInterface) { }

  ngOnInit() {

    let codeKey = window.location.hash.substring(window.location.hash.indexOf('code'),  window.location.hash.indexOf('&'))
    let code = codeKey.substring(codeKey.indexOf('=')+1);
   
    //store for future use
    localStorage.setItem("access_code", code);

    //navigate user securely to user dashboard
    if (localStorage.getItem("initialJourney") !== null){
       localStorage.removeItem("initialJourney");
       localStorage.setItem("access-code", code); //for further transactions this code is required
       this.router.navigate(['secure/user/dashboard']);
       //this.router.navigate(['secure/user/transactions'], {queryParams: {code: code}});

    }

    //  if (localStorage.getItem("initialJourney") !== null){
    //    this.router.navigate(['secure/transactions'], {queryParams: { code: code }});
    // //this.router.navigate(['secure/transactions?code=',code]);
    //   localStorage.removeItem("initialJourney");
    // }
  }

}
