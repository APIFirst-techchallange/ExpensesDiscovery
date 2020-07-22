import { Component, OnInit } from '@angular/core';
import { AccountServiceInterface} from "../../service_interface/accountServiceInterface";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountServiceInterface: AccountServiceInterface,
    private router: Router) { }

  ngOnInit() {
  }

  
  initialJourney(){
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
    /*get token*/
    this.accountServiceInterface.getToken(token_body).subscribe(response => {
      let access_token = response.access_token;
       console.log("Step 1: Access Token Service called", access_token);
        this.accountServiceInterface.getAccessConsent(access_token, access_consent_body).subscribe(response2 => {
           let consent_id = response2.Data.ConsentId
           console.log("Step 2: Access consent called - consent id:", consent_id);
            this.accountServiceInterface.getAuthoriseConsentUri(access_token, consent_id).subscribe (response3 => {
              console.log("Step 3: Get Consent URI:", response3);
              if(localStorage.getItem("initialJourney") === null) {
                localStorage.setItem("initialJourney",'1');
                localStorage.setItem("isLoggedIn",'true');
                window.location.href = response3;
               // this.router.navigate([response3]);
              }
             })
        })


        //  this.accountServiceInterface.getAccounts(response.access_token).subscribe(response => {
        //   console.log(response.Data);
        // });

      });
  }
}
