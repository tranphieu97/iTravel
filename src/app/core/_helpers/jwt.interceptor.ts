import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class JWTInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('/api/') !== -1 || req.url.indexOf('/auth/') !== -1) {
            //
            if (req.url.indexOf('/api/upload') !== -1) {
                // keep request allow
                return next.handle(req);
            } else {
                //
                const headers = req.headers
                    .set('Content-Type', 'application/json');
                const authReq = req.clone({ headers });
                return next.handle(authReq);
            }

        } else {
            const jwtToken = JSON.parse(localStorage.getItem('itravel_currentUser'));
            if (jwtToken) {
                // const headers = req.headers
                //     // .set('Content-Type', 'application/json')
                //     .set('Authorization', 'Bearer ' + jwtToken);
                const authReq = req.clone({
                    setHeaders: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });
                return next.handle(authReq);
            }
        }
    }
}
