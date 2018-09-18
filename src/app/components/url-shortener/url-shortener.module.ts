import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UrlShortenerComponent} from './url-shortener.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [UrlShortenerComponent],
    exports: [UrlShortenerComponent]
})
export class UrlShortenerModule {
}
