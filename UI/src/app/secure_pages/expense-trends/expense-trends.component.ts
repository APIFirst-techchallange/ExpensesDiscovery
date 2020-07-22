import { Component, OnInit } from '@angular/core';
import { AccountServiceInterface } from '../../service_interface/accountServiceInterface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-trends',
  templateUrl: './expense-trends.component.html',
  styleUrls: ['./expense-trends.component.css']
})
export class ExpenseTrendsComponent implements OnInit {

  code: any;
  serverTransactions: any[] = [];
  customTransactions: any[] = [];
  transactions: any[] = [];


  //filters
  filteredMerchantTransactions: any[] = [];
  filteredVariableTransactions: any[] = [];
  filteredCardsTransactions: any[] = [];

  toggleText: string = "show";
  toogleCardText: string = "show";
  toggleVariableText: string = "show";
  toggleSymbol: string = "+";
  toggleCardSymbol: string = "+";
  toggleVariableSymbol: string = "+";
  showMerchantTransaction: boolean = false;
  showVariableTransaction: boolean = false;
  showCardTransaction: boolean = false;

  isLoading: boolean = true;

  constructor(private accountServiceInterface: AccountServiceInterface,
    private activateRoute: ActivatedRoute) { 
     
    }

  ngOnInit() {
     
    this.code = localStorage.getItem('access_code');
    console.log('transaction code:', this.code);

    let req_pay_lod = {
      "code": this.code
    }
    this.accountServiceInterface.getOBToken(req_pay_lod).subscribe(response => {
        let access_token = response.access_token;
        this.accountServiceInterface.getAccounts(access_token).subscribe(response2 => {
          this.accountServiceInterface.getTransactionByAccountId('7850e336-df1d-438e-b214-69373b2ccc45',access_token).subscribe( response3 =>
            {
              this.serverTransactions = response3.Data.Transaction;

              this.accountServiceInterface.getCustomTransactions().subscribe(customTransactionsResponse => {
                this.customTransactions = customTransactionsResponse.Data.Transaction;
                this.transactions.push(...this.serverTransactions, ...this.customTransactions);
                this.isLoading = false;
              }) // custom + merge transactions
            })//transactions
          })//accounts
        },
        (error) => {
            //in case access code expired, do not throw an error. As it is demo, get a fallback transactions from getCustomTransaction() service
            this.accountServiceInterface.getCustomTransactions().subscribe(customTransactionsResponse => {
                  this.customTransactions = customTransactionsResponse.Data.Transaction;
                  this.transactions.push(...this.customTransactions);
                  this.isLoading = false;
            })
          } //error
        )//obtoken
      }
    
   

  // const mergeById = (array1, array2) =>
  //   array1.map(itm => ({
  //     ...array2.find((item) => (item.studentId === itm.studentId) && item),
  //     ...itm
  //   }));

  
  
  filterMerchantsTransactions(){
     this.filteredMerchantTransactions =  this.transactions.filter((item)=>{
       return item.ProprietaryBankTransactionCode.Code === "BIL"
      })

    //  this.filteredMerchantTransactions.forEach(item => {
    //    if(item.TransactionInformation === "House Rent"){

    //    }
    //  })

    //  if(this.filteredMerchantTransactions.length > 10){
    //   this.filteredMerchantTransactions.slice(1,10);
    // }

     //sort desc bsed on amount
     this.filteredMerchantTransactions = this.filteredMerchantTransactions.sort(this.sortAmount);   

  }

  filterVariableTransaction(){
    this.filteredVariableTransactions =  this.transactions.filter((item)=>{
      return item.ProprietaryBankTransactionCode.Code === "TFR"
    })

  }

  filterCardsTransaction(){
    this.filteredCardsTransactions =  this.transactions.filter((item)=>{
      return item.ProprietaryBankTransactionCode.Code === "POS"
    })
  }

  // filter(transactions: any, transactionType: string type: string){
  //   return transactions.filter((item)=>{
  //     return item.ProprietaryBankTransactionCode.Code === type;
  //   });
  // }

  sortAmount = function (transaction: any, transaction2: any) {  
    console.log(transaction.Amount.Amount );
    console.log(transaction2.Amount.Amount);
    if (transaction.Amount.Amount < transaction2.Amount.Amount) { return -1; }  
    else if (transaction.Amount.Amount > transaction2.Amount.Amount) {return 1; }  
    else return 0;  
}

  handleFixedAccordion(){
    console.log(this.toggleText);
    if(this.toggleText === 'show'){
      this.showMerchantTransaction = true;
      this.filterMerchantsTransactions();
      this.toggleText = "hide";
      this.toggleSymbol = "-";
    }
    else if(this.toggleText === 'hide'){
      this.showMerchantTransaction = false;
      this.toggleText = "show";
      this.toggleSymbol = "+";
    }

  }

  handleCardsAccordion(){
    if(this.toogleCardText  === 'show'){
      this.showCardTransaction = true;
      this.filterCardsTransaction();
      this.toogleCardText = "hide";
      this.toggleCardSymbol = "-";
    }
    else if(this.toogleCardText === 'hide'){
      this.showCardTransaction = false;
      this.toogleCardText = "show";
      this.toggleCardSymbol = "+";
    }
  }

  handleVariableAccordion(){
    
    if(this.toggleVariableText  === 'show'){
      console.log(this.toggleVariableText);
      this.showVariableTransaction = true;
      this.filterVariableTransaction();
      this.toggleVariableText = "hide";
      this.toggleVariableSymbol = "-";
    }
    else if(this.toggleVariableText === 'hide'){
      console.log(this.toggleVariableText);
      this.showVariableTransaction = false;
      this.toggleVariableText = "show";
      this.toggleVariableSymbol = "+";
    }
  }
}
