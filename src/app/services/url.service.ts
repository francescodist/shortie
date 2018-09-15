import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UrlService {

    constructor(public http: HttpClient) {

    }

    shortenURL(url: string): Observable<any> {
        return this.http.post('/shorturl', {originalUrl: url});
    }
}
