import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CacheService} from './cache.service';

@Injectable({
    providedIn: 'root'
})
export class UrlService {

    constructor(public http: HttpClient, public cacheService: CacheService) {

    }


    /**
     * Return the list of all shortened URLS cached in localStorage
     */
    getAllURLs(): any[] {
        return this.cacheService.getItem('shortenedURLs') || [];
    }


    /**
     * POST an URL to the server to be shortened
     * @param {string} url: the URL to be shortened
     * @returns {Observable<any>}
     */
    shortenURL(url: string): Observable<any> {
        return this.http.post('/shorturl', {originalUrl: url})
            .pipe(map(newURL => {
                // cache the result in loacalStorage
                return this.cacheNewURL(newURL);
            }));
    }


    /**
     * DELETE an URL from the server by id
     * @param {number} urlId: id of the URL to be deleted
     * @returns {Observable<any>}
     */
    deleteURL(urlId: number): Observable<any> {
        return this.http.delete('/shorturl/' + urlId).pipe(map(url => {
            // remove the deleted URL from cache
            this.deleteURLFromCache(urlId);
            return url;
        }));
    }


    /**
     * Save a shortened URL in the cached list
     * @param newURL: the URL to save in cache
     * @returns {any}: the URL saved in cache
     */
    cacheNewURL(newURL: any): any {
        // get complete URL list from cache
        const urlList = this.getAllURLs();
        // add new URL as first element of the list
        urlList.unshift(newURL);
        // cache the updated list
        this.cacheService.saveItem('shortenedURLs', urlList);
        // this will activate a visual effect for newly inserted URLs
        newURL.shouldAnimate = true;
        return newURL;
    }


    /**
     * Delete a shortened URL from the cached list
     * @param {number} urlId
     */
    deleteURLFromCache(urlId: number) {
        // get complete URL list from cache
        let urlList = this.getAllURLs();
        // filter out the URL to delete
        urlList = urlList.filter(url => {
            return url.id !== urlId;
        });
        // cache the updated list
        this.cacheService.saveItem('shortenedURLs', urlList);
    }
}
