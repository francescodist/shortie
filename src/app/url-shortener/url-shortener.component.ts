import {Component, OnInit} from '@angular/core';
import {UrlService} from '../services/url.service';

@Component({
    selector: 'app-url-shortener',
    templateUrl: './url-shortener.component.html',
    styleUrls: ['./url-shortener.component.scss']
})
export class UrlShortenerComponent implements OnInit {

    results: any[]; // an array containing all the shortened URLs
    url: string; // the URL to shorten

    constructor(public urlService: UrlService) {
        this.results = [];
    }

    ngOnInit() {

    }

    shortenURL() {
        if (this.isValidURL()) {
            this.urlService.shortenURL(this.url).subscribe(data => {
               this.results.push(data);
            });
        }
    }

    isValidURL() {
        const regex = new RegExp('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        return regex.test(this.url);
    }

    copyURL(url: string) {
        const input = <HTMLInputElement> document.createElement('input');
        input.style.position = 'absolute';
        input.style.top = '0';
        input.style.left = '0';
        input.style.opacity = '0';
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
    }

    goTo(url: string) {
        window.open(url, '_blank');
    }

}
