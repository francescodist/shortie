import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UrlService} from '../../services/url.service';
import {InfoService} from '../../services/info.service';

@Component({
    selector: 'app-url-shortener',
    templateUrl: './url-shortener.component.html',
    styleUrls: ['./url-shortener.component.scss']
})
export class UrlShortenerComponent implements OnInit {

    results: any[]; // an array containing all the shortened URLs
    url: string; // the URL to shorten
    isLoading: boolean; // true if waiting for POST request on short URL
    isDeleting: {}; // attributes are IDs of the URL (true if waiting for DELETE)
    isDeleted: {}; // attributes are IDs of the URL (true if successful DELETE)
    // container for the shortened URLs in the view
    @ViewChild('resultContainer') resultContainer: ElementRef;

    constructor(public urlService: UrlService, public infoService: InfoService) {
    }


    /**
     * Initialization of the data structures OnInit
     */
    ngOnInit() {
        this.results = this.urlService.getAllURLs();
        this.isDeleting = {};
        this.isDeleted = {};
    }


    /**
     * This will check if the URL is valid
     * then it will send it to the server to be shortened
     */
    shortenURL() {
        if (this.isValidURL()) {
            // stop other 'shorten URL' requests until isLoading is true
            this.isLoading = true;
            this.urlService.shortenURL(this.url).subscribe(
                data => {
                    // scroll top to show the animation for the new item
                    this.resultContainer.nativeElement.scrollTop = 0;
                    this.results.unshift(data);
                }, error => {
                    this.infoService.showError(error.statusText);
                }
            ).add(() => {
                // done, allow requests again
                this.isLoading = false;
            });
        }
        else {
            this.infoService.showError('Invalid URL');
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
        // show info about URL copied to clipboard
        this.infoService.showInfo('Copied to Clipboard!');
    }


    /**
     * Deletes a shortned URL from the list and from the server
     * @param {number} urlIndex: the local index of the URL
     * @param {number} urlId: the ID of the URL
     */
    deleteURL(urlId: number) {
        this.isDeleting[urlId] = true;
        this.urlService.deleteURL(urlId).subscribe(() => {
            // on success delete the element locally aswell
            this.isDeleted[urlId] = true;
            // waits for the animation to be over before deleting the element from the list
            setTimeout(() => {
                this.results = this.results.filter(url => {
                    delete this.isDeleted[urlId];
                    return url.id !== urlId;
                });
            }, 300);
        }).add(() => {
            this.isDeleting[urlId] = false;
        });
    }


    /**
     * Navigates to the selected URL in another tab
     * @param {string} url: the selected URL
     */
    goTo(url: string) {
        window.open(url, '_blank');
    }

}
