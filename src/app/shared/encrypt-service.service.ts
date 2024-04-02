import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';
import { environnment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class EncryptService {
    private readonly KEY = environnment.SECRET_KEY;

    encrypt(data: any) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), this.KEY).toString();
    }

    decrypt(data: string) {
        const bytes = CryptoJS.AES.decrypt(data, this.KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
}