import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {UrlShortenerComponent} from '../url-shortener/url-shortener.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [HomeComponent, UrlShortenerComponent]
})
export class HomeModule {
}
