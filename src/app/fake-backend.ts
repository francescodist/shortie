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
        if (request.url === '/shorturl' && request.method === 'POST') {
            return this.sendFakeShortenedURL(request.body.originalUrl);
        }

        // stub for 'deleting short URL' API
        if (request.url.indexOf('/shorturl') !== -1 && request.method === 'DELETE') {
            return this.sendFakeDelete();
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

        // generates randomly an error for 'invalid URL'
        // otherwise it will give a successful response with a fake shortened URL
        const random = Math.floor(Math.random() * 10);
        if (random === 2 || random === 7) {
            const response = new HttpResponse({
                status: 504,
                statusText: 'Invalid URL'
            });
            return this.sendFakeRequest(response, 'fail');

        } else {
            const response = new HttpResponse({
                status: 200,
                body: {
                    id: Math.floor(Math.random() * 1000000),
                    originalUrl: originalUrl.substr(0, 4) === 'http' ?
                        originalUrl : 'http://' + originalUrl,
                    shortUrl: 'http://short.ie/' + this.randomString(6)
                }

            });
            return this.sendFakeRequest(response, 'success');
        }
    }


    /**
     * Simple function to return a random alphanumeric string
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


    sendFakeDelete(): Observable<HttpEvent<any>> {
        const response = new HttpResponse({
            status: 200,
            body: {}
        });
        return this.sendFakeRequest(response, 'success');
    }


    sendFakeRequest(payload: any, success: string): Observable<HttpEvent<any>> {
        // creates a fake delay for the request (min:300ms max:2000ms)
        const delay = Math.floor((Math.random() * 1700) + 300);

        // creates a fate http response and returns the relative observable
        return new Observable<HttpEvent<any>>(observer => {

            if (success === 'success') {
                setTimeout(() => {
                    // send success and completes the request after the delay
                    observer.next(payload);
                    observer.complete();
                }, delay);
            } else {
                setTimeout(() => {
                    // sends error and completes the request after the delay
                    observer.error(payload);
                }, delay);
            }
        });
    }
}
