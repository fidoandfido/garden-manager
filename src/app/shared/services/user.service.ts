import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LogMessageService } from './log-message.service';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private loggedIn = false;

    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private messages: string[] = [];

    constructor(private http: HttpClient, private logMessageService: LogMessageService) {
        this.loggedIn = !!localStorage.getItem('auth_token');
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    }

    login(userName: string, password: string) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        return this.http.post<{ auth_token: string }>('/api/auth/login', JSON.stringify({ userName, password }), { headers })
            .pipe(
                tap(res => {
                    localStorage.setItem('auth_token', res.auth_token);
                    this.loggedIn = true;
                    this._authNavStatusSource.next(true);
                    return true;
                }),
                catchError(this.generateHandleError()));
    }

    generateHandleError() {
        return <T>(error: any, result?: T): Observable<T> => {
            this.logMessageService.add('Error logging in: ' + error);

            const applicationError = error.headers.get('Application-Error');

            // either applicationError in header or model error in body?
            if (applicationError) {
                return throwError(applicationError);
            }

            // Possibly handle some errors here more betterer.

            // Model error?
            let modelStateErrors = '';
            if (error.json) {
                const serverError = error.json();
                if (!serverError.type) {
                    for (const key in serverError) {
                        if (serverError[key]) {
                            modelStateErrors += serverError[key] + '\n';
                        }
                    }
                }
            }
            modelStateErrors = modelStateErrors === '' ? null : modelStateErrors;
            if (modelStateErrors) {
                return throwError(modelStateErrors);
            }
            return throwError('Server Error');
        };
    }

    log(message: any) {
        this.messages.push(message);
    }
}
