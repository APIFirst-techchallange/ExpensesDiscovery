import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/xml',
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJTYW1wbGUgQXBwIiwib3JnIjoidGVhbS5hY2Mub3JnIiwiaXNzIjoicmJzLnVzZWluZmluaXRlLmlvIiwidG9rZW5fdHlwZSI6IkFDQ0VTU19UT0tFTiIsImV4dGVybmFsX2NsaWVudF9pZCI6IlJnbUxjcVdjV0hfaFpSWXluVW1STkZ1ZXdVWFdkNkNrS1g0OWItQmNYcjg9IiwiY2xpZW50X2lkIjoiNGYwNzNhYzctOTkzZi00NTlhLThjOTQtY2NmODQ4MjZhOGVjIiwibWF4X2FnZSI6ODY0MDAsImF1ZCI6IjRmMDczYWM3LTk5M2YtNDU5YS04Yzk0LWNjZjg0ODI2YThlYyIsInVzZXJfaWQiOiIxMjM0NTY3ODkwMTJAdGVhbS5hY2Mub3JnIiwiZ3JhbnRfaWQiOiIzMmUyZGRjYS1iOTUzLTRiMWMtOTdhZS04NTkxZDE1N2NlODciLCJzY29wZSI6ImFjY291bnRzIG9wZW5pZCIsImNvbnNlbnRfcmVmZXJlbmNlIjoiNzgyYmI1NmEtODExOS00ODlhLTg4YmEtOWZjYTI2Y2Q3YWE1IiwiZXhwIjoxNTk1MTcyNjEzLCJpYXQiOjE1OTUxNzIzMTMsImp0aSI6ImQ2ZDBjNWI0LWQ1MDYtNGE4MS1iNjM5LTk3ODU0YzU0MzJhNSIsInRlbmFudCI6IlJCUyJ9.cl1edUXrMO1-grz5zGBRBvhZiX22Hz7LkXe-bi7U8s7_eet6XgGJGoKN_sWUA_YMfmqZpqlqGTUmXN_0m9G8SksenCLjvXFQsVtcXt30OxSVmNOhJmQUt2vk57RAsi7DrLYxfAo0ah7Z5FMHHd_s-yT5krKR3SLn0a5Hk06h0ZI-4DACOLT91rYvH578_YkAlxgJuOsC1bcEVDs161cGbM0Ggk_cr-pMiBImA5cdPo0JdwLC5IUXacyoE1-tDLI4regHEEFDoQgx32gdeb3NEwWbUJcOu24YIpTJOB5QQH3AHFSQsTHwvRha5R7W4sid6xPAbGEL5SwmUMT-2bBrBg',
     // 'Authorization': 'Bearer Njugff123Ahejkf8hbkkjjh',
    //    'refresh_token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJTYW1wbGUgQXBwIiwib3JnIjoidGVhbS5hY2Mub3JnIiwiaXNzIjoicmJzLnVzZWluZmluaXRlLmlvIiwidG9rZW5fdHlwZSI6IlJFRlJFU0hfVE9LRU4iLCJleHRlcm5hbF9jbGllbnRfaWQiOiJSZ21MY3FXY1dIX2haUll5blVtUk5GdWV3VVhXZDZDa0tYNDliLUJjWHI4PSIsImNsaWVudF9pZCI6IjRmMDczYWM3LTk5M2YtNDU5YS04Yzk0LWNjZjg0ODI2YThlYyIsIm1heF9hZ2UiOjg2NDAwLCJhdWQiOiI0ZjA3M2FjNy05OTNmLTQ1OWEtOGM5NC1jY2Y4NDgyNmE4ZWMiLCJ1c2VyX2lkIjoiMTIzNDU2Nzg5MDEyQHRlYW0uYWNjLm9yZyIsImdyYW50X2lkIjoiMzJlMmRkY2EtYjk1My00YjFjLTk3YWUtODU5MWQxNTdjZTg3Iiwic2NvcGUiOiJhY2NvdW50cyBvcGVuaWQiLCJjb25zZW50X3JlZmVyZW5jZSI6Ijc4MmJiNTZhLTgxMTktNDg5YS04OGJhLTlmY2EyNmNkN2FhNSIsImlhdCI6MTU5NTE3MjMxMywianRpIjoiMmQxY2ZmYjktZGEwOS00OWE1LWEzMzctN2I3ZDQzNTE0Yzg5IiwidGVuYW50IjoiUkJTIn0.gz4IYRzAsVANsw0mjOWJe-UD-F-p5JrgBK82Suobw8K6rqj7EhwvBDBL4Lb5pFV8tOSxJ5RFK4ZmAU49bcHLXTCjxyy59sI7RgPpJY9Uah-zOsbOp4sz6MdE6t5AyU1pmoEIiQ0EmtQYedr66wtpw6Un2o44AQIQFsP1QgrNowhkk7rPSjpxgjaM55F9mIyaIAiMrv2SJ9TNLPGj-gYIqxSEKa6Xo0T_l3XOKpoINDQ72uYetvW9deoCgCQteI7uEJxv-UpJd7hVWX0CBCfBYJ6EdjjbXvLXxPYocOOcCn7opK4EcXNqVysX8r52bNECRuQ-Eu0q-B1ZqNsDToazXw',
    //    'session_id': 'b700d3c1-788c-553d-9ac2-11eb1f4945c3'
    })
   
  };

  
  
@Injectable({
    providedIn: 'root'
  })
export class AccountServiceInterface {
endpoint = 'http://localhost:8080/open-banking/v3/aisp/accounts';
accounts_endpoint = "http://localhost:8080/open-banking/v3.1/aisp/accounts";
token_endpoint = 'http://localhost:8080/open-banking/v3/token';
access_consent_endpoint = 'http://localhost:8080/open-banking/v3.1/aisp/account-access-consents';
authorise_consent_uri_endpoint = 'http://localhost:8080/open-banking/v3.1/aisp/authorization.oauth2?request=';
transaction_endpoint = "http://localhost:8080/open-banking/v3.1/aisp/accounts/"; 

custom_transaction_endpoint = "http://localhost:3080/api/v1/getCustomTransactions";


//token_endpoint = 'http://localhost:8080/token';

// endpoint = 'http://localhost:3001/aisp/accounts';

    constructor(private http: HttpClient) { }

    getToken(token_request_payload:any): Observable<any>{
        return this.http.post<any>(this.token_endpoint, token_request_payload);
    }

    getAccessConsent(access_token: string, body: any): Observable<any>{
        let httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + access_token,
                'session_id': 'b700d3c1-788c-553d-9ac2-11eb1f4945c3'
            })
        }

        return this.http.post<any>(this.access_consent_endpoint,body,httpOptions);
    }

    getAuthoriseConsentUri(access_token: string,consentId: string): Observable<string>{
        let req = this.authorise_consent_uri_endpoint + consentId ;
        return this.http.get(req, {responseType: 'text'});
    }

    getOBToken(req_pay_load): Observable<any>{
        return this.http.post<any>(this.token_endpoint, req_pay_load);
    }

    getAccounts(access_token: string): Observable<any> {
        console.log(access_token);
        let httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + access_token,
                //'session_id': 'b700d3c1-788c-553d-9ac2-11eb1f4945c3'
            })
        }
        
        return this.http.get<any>(this.accounts_endpoint,httpOptions);
    }

    getTransactionByAccountId(accountId:string, access_token): Observable<any>{
        let endpoint_tran = this.transaction_endpoint+ accountId + "/transactions";
        let httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + access_token,
                //'session_id': 'b700d3c1-788c-553d-9ac2-11eb1f4945c3'
            })
        }
        return this.http.get<any>(endpoint_tran,httpOptions);
    }

    getCustomTransactions(): Observable<any>{
       // return this.http.get<any>("assets/customTransactions.json");
       //call the node service to get the custom transaction
       return this.http.get<any>(this.custom_transaction_endpoint);
    }
}

