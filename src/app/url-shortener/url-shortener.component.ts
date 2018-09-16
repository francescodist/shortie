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
    isLoading: boolean; // true if waiting for a response from server

    constructor(public urlService: UrlService) {
    }

    ngOnInit() {
        this.results = [];
    }


    /**
     * This will check if the URL is valid
     * then it will send it to the server to be shortened
     */
    shortenURL() {
        if (this.isValidURL()) {
            this.isLoading = true;
            this.urlService.shortenURL(this.url).subscribe(
                data => {
                    this.results.unshift(data);
                }, error => {
                    alert(error.statusText);
                }
            ).add(() => {
                this.isLoading = false;
            });
        }
    }


    /**
     * Checks if a URL is valid
     * @returns {boolean}
     */
    isValidURL() {
        const regex = new RegExp('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        return regex.test(this.url);
    }


    /**
     * Copies the selected URL to the clipboard
     * @param {string} url: the URL to be shortened
     */
    copyURL(url: string) {
        // first create an invisible input
        const input = <HTMLInputElement> document.createElement('input');
        input.style.position = 'absolute';
        input.style.top = '0';
        input.style.left = '0';
        input.style.opacity = '0';
        // set the value as the selected URL
        input.value = url;
        // append it to the view
        document.body.appendChild(input);
        // focus on the input
        input.select();
        // copy its value on the clipboard
        document.execCommand('copy');
        // remove the input element from the view
        input.remove();
    }


    /**
     * Navigates to the selected URL in another tab
     * @param {string} url: the selected URL
     */
    goTo(url: string) {
        window.open(url, '_blank');
    }

}
