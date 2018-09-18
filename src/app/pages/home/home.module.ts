import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {UrlShortenerComponent} from '../../components/url-shortener/url-shortener.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [HomeComponent, UrlShortenerComponent]
})
export class HomeModule {
}