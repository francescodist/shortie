import {Component, OnInit} from '@angular/core';
import {InfoService} from '../../services/info.service';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

    infos: string[] = []; // the queue for the dialogs

    constructor(public infoService: InfoService) {
        // subscribe to 'onShowInfo' event
        infoService.onShowInfo.subscribe(info => {
            // show info dialog whenever the event is emitted
           this.showInfo(info);
        });
    }

    ngOnInit() {
    }


    /**
     * Info Dialogs are implemented as a FIFO queue
     * Multiple Dialogs can exist at the same time but only the last
     * one will be visible
     * Each dialog stays on for 3s before fading away
     * @param info: the info to show
     */
    showInfo(info: any) {
        this.infos.push(info);
        setTimeout(() => {
            this.infos.shift();
        }, 3000);
    }

}
