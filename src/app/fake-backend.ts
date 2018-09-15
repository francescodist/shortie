import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class FakeBackend implements HttpInterceptor {

    shouldIntercept = true; // set this to false to stop using a FakeBackend

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // skips the interceptor logics
        if (!this.shouldIntercept) {
            return next.handle(request);
        }

        // stub for 'shortening URL' API
        if (request.url === '/shorturl') {
            return this.sendFakeShortenedURL(request.body.originalUrl);
        }

        // if no alternative action is taken, complete the original request
        return next.handle(request);
    }


    /**
     * Returns an Observable with a fake random shortened URL
     * it will randomly return an error for 'Invalid URL'
     * @param {string} originalUrl
     * @returns {Observable<HttpEvent<any>>}
     */
    sendFakeShortenedURL(originalUrl: string): Observable<HttpEvent<any>> {
        return new Observable<HttpEvent<any>>(observer => {
            const random = Math.floor(Math.random() * 10);
            let res;
            if (random === 5) {
                res = new HttpResponse({
                    status: 504,
                    statusText: 'Invalid URL'
                });
                observer.error(res);
            } else {
                res = new HttpResponse({
                    status: 200,
                    body: {
                        originalUrl: originalUrl.substr(0, 4) === 'http' ?
                            originalUrl : 'http://' + originalUrl,
                        shortUrl: 'http://short.ie/' + this.randomString(6)
                    }
                });
                observer.next(res);
            }
            observer.complete();
        });
    }


    /**
     * Simple function to return a random string with letters and numbers
     * @param {number} length: the length of the final string
     * @returns {string}
     */
    randomString(length: number): string {
        return Math.random()
            .toString(36)
            .substr(2, length)
            .split('')
            .map(letter => {
                if (Math.floor(Math.random() * 2) % 2) {
                    return letter.toUpperCase();
                }
                return letter;
            })
            .join('');
    }
}
