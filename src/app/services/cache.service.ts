import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CacheService {

    constructor() {
    }


    /**
     * Save an item on localStorage
     * @param {string} key: the key for localStorage
     * @param value: the item to save
     */
    saveItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }


    /**
     * Get an item from localStorage
     * @param {string} key: the key of the item to get
     * @returns {any || null}
     */
    getItem(key: string) {
        return JSON.parse(localStorage.getItem(key)) || null;
    }
}
