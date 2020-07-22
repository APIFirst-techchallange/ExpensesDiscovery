import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountServiceInterface} from "./service_interface/accountServiceInterface";
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'querystring';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  
  accounts: any[] = [];
  token_request_payload: any[] = []; 
  transactions: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private accountServiceInterface: AccountServiceInterface,
    private router: Router) { 
      this.loading();
    }

  ngOnInit(){
    this.beginJourney();
    this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  }

  ngOnDestroy(){
    localStorage.removeItem("initialJourney");
    localStorage.removeItem("isLoggedIn");
  }

  loading(){
    if(String(localStorage.getItem("isLoggedIn")) !== 'true')
      this.isLoggedIn = false;
  }

  beginJourney(){
    let token_body = {
      "grant_type":"client_credentials",
      "client_id":"jdsyqUg7v7CvTqG6wRYwZHSIoz-7V7XfQctTWLirACE=",
      "client_secret":"NaNo2Wb_gD8Uke2mQyS7Sdf4s8e2enCJ-jtIXtcrQBA=",
      "scope":"accounts"
    }

    let access_consent_body = {
      "Data" :{
        "Permissions" : ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances",
                      "ReadBeneficiariesBasic", "ReadBeneficiariesDetail", "ReadDirectDebits",
                      "ReadProducts", "ReadStandingOrdersBasic", "ReadStandingOrdersDetail",
                      "ReadTransactionsBasic", "ReadTransactionsCredits", "ReadTransactionsDebits",
                      "ReadTransactionsDetail"]
                      
      },

      "Risk": {}
    }
    
    this.accountServiceInterface.getToken(token_body).subscribe(response => {
      let access_token = response.access_token;
       console.log("Step 1: Access token service invocation", access_token);
        this.accountServiceInterface.getAccessConsent(access_token, access_consent_body).subscribe(response2 => {
           let consent_id = response2.Data.ConsentId
           console.log("Step 2: Access consent service invocation - consent id:", consent_id);
            this.accountServiceInterface.getAuthoriseConsentUri(access_token, consent_id).subscribe (response3 => {
              console.log("Step 3: Get Consent URI:", response3);
              if(String(localStorage.getItem("isLoggedIn")) !== 'true') {
                localStorage.setItem("initialJourney",'1');
                localStorage.setItem("isLoggedIn",'true');
                window.location.href = response3; //redirect to the consent URI
              }
             })
        })
      });
    
  }
  exitJourney(){
    localStorage.removeItem("initialJourney");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "http://localhost:4200";
  }
 


}
