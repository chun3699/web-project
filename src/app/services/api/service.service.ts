import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private constants : Constants, private http: HttpClient) { }

  public async getUploadImega(body : any,options?: any){
    const url = this.constants.API_ENDPOINT + '/images/uploadMySql';
    const response = await lastValueFrom(
      this.http.post(url,JSON.stringify(body))
    );
    return response;
  }
}
