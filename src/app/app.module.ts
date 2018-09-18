import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FakeBackend} from './fake-backend';
import {InfoComponent} from './components/info/info.component';

@NgModule({
    declarations: [
        AppComponent,
        InfoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: FakeBackend, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
