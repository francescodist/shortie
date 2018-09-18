import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InfoService {

    // event to communicate with InfoComponent
    public onShowInfo = new EventEmitter<any>();

    constructor() {

    }


    /**
     * Emit the Event to show an info dialog from InfoComponent
     * @param {string} message: the message to show
     * @param {string} type: the type of info (default: 'info')
     */
    showInfo(message: string, type?: string) {
        this.onShowInfo.emit({
            message: message,
            type: type || 'info'
        });
    }


    /**
     * Call showInfo with 'error' type
     * @param {string} message
     */
    showError(message: string) {
        this.showInfo(message, 'error');
    }

}
