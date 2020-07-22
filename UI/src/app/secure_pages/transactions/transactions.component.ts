import { Component, OnInit } from '@angular/core';
import { AccountServiceInterface } from '../../service_interface/accountServiceInterface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  code: any;
  serverTransactions: any[] = [];
  customTransactions: any[] = [];
  transactions: any[] = [];
  isLoading: boolean = true;

  constructor(private accountServiceInterface: AccountServiceInterface,
    private activateRoute: ActivatedRoute) { 
     
    }

  ngOnInit() {
     
    // this.activateRoute.queryParams.subscribe(params => {
    //   console.log(params);
    //   this.code = params['code']
    // })

    // if(this.code === null || this.code === "") {
    //   this.code = localStorage.getItem('access_code');
    // }

    this.code = localStorage.getItem('access-code');
    console.log('access_code:', this.code);

    let req_pay_lod = {
      "code": this.code
    }
    // this.accountServiceInterface.getOBToken(req_pay_lod).subscribe(response => {
    //   console.log(response);
    //     let access_token = response.access_token;
    //   this.accountServiceInterface.getAccounts(access_token).subscribe(response2 => {
    //     console.log(response2);

    //       this.accountServiceInterface.getTransactionByAccountId('7850e336-df1d-438e-b214-69373b2ccc45',access_token).subscribe( response3 =>
    //         {
    //           this.serverTransactions = response3.Data.Transaction;

    //           this.accountServiceInterface.getCustomTransactions().subscribe(customTransactionsResponse => {
    //             this.customTransactions = customTransactionsResponse.Data.Transaction;

    //             this.transactions.push(...this.serverTransactions, ...this.customTransactions);
    //           })
    //         })
    //   })
    // })

    this.accountServiceInterface.getOBToken(req_pay_lod).subscribe(response => {
      let access_token = response.access_token;
      this.accountServiceInterface.getAccounts(access_token).subscribe(response2 => {
        this.accountServiceInterface.getTransactionByAccountId('7850e336-df1d-438e-b214-69373b2ccc45',access_token).subscribe( response3 =>
          {
            this.serverTransactions = response3.Data.Transaction;

            this.accountServiceInterface.getCustomTransactions().subscribe(customTransactionsResponse => {
              this.customTransactions = customTransactionsResponse.Data.Transaction;
              this.transactions.push(...this.serverTransactions, ...this.customTransactions);
              if(this.transactions.length > 10){
                this.transactions.slice(1,9);
              }
              this.isLoading = false;
            }) // custom + merge transactions
          })//transactions
        })//accounts
      },
      (error) => {
          //in case access code expired, do not throw an error. As it is demo, get a fallback transactions from getCustomTransaction() service
          console.log("error");
          this.accountServiceInterface.getCustomTransactions().subscribe(customTransactionsResponse => {
                this.customTransactions = customTransactionsResponse.Data.Transaction;
                this.transactions.push(...this.customTransactions);
                if(this.transactions.length > 10){
                  this.transactions.slice(1,9);
                }
                this.isLoading = false;
          })
        } //error
      )//obtoken
  }
}
