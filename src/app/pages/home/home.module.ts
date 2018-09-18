import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {FormsModule} from '@angular/forms';
import {UrlShortenerModule} from '../../components/url-shortener/url-shortener.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UrlShortenerModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule {
}
