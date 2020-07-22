import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountServiceInterface} from "./service_interface/accountServiceInterface";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RedirectingComponent } from './redirecting/redirecting.component';
import { HeaderComponent, FooterComponent} from './components';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent, TransactionsComponent, ExpenseTrendsComponent} from './secure_pages';
import { AlertsComponent } from './secure_pages/alerts/alerts.component';
import { AdviceComponent } from './secure_pages/advice/advice.component';

@NgModule({
  declarations: [
    AppComponent,
    RedirectingComponent,
    HeaderComponent,
    FooterComponent,
    TransactionsComponent,
    MenuComponent,
    DashboardComponent,
    ExpenseTrendsComponent,
    AlertsComponent,
    AdviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      // { path: '', component:LoginComponent},
      // { path: 'login', component:LoginComponent},
      { path: 'redirecting', component:RedirectingComponent },
      { path: 'secure/user/dashboard', component:DashboardComponent},
      { path: 'secure/user/transactions', component:TransactionsComponent},
      { path: 'secure/user/expense-trends', component:ExpenseTrendsComponent},
      { path: 'secure/user/alerts', component:AlertsComponent},
      { path: 'secure/user/advice', component:AdviceComponent}
    ])
  ],
  providers: [AccountServiceInterface],
  bootstrap: [AppComponent]
})
export class AppModule { }
