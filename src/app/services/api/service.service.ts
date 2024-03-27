import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { getImage } from '../../../model/getImage';

import { lastValueFrom } from 'rxjs';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private constants : Constants, private http: HttpClient) { }
  //upload รูปภาพ
  public async getUploadImega(body : any,options?: any){
    const url = `${this.constants.API_ENDPOINT}/images/uploadMySql`;
    const response = await lastValueFrom(
      this.http.post(url,body)
    );
    return response;
  }
  //แสดงรูปของ Uid
  public async getImage(options?:any){
    const url = `${this.constants.API_ENDPOINT}/images/UidIsImage/7`;
    const response = await lastValueFrom(
      this.http.get(url)
    );
    return response as getImage[];
  }
  // ลบ image
  public async deleteImage(did : number,options?:any){
    const url = `${this.constants.API_ENDPOINT}/images/deleteImage/${did}`;
    const response = await lastValueFrom(
      this.http.delete(url)
    );
    return response;
  }
  // เปลี่ยน image
  public async changeImage(body:any,did:number,options?:any){
    const url = `${this.constants.API_ENDPOINT}/images/ChangeImage/${did}`;
    const response = await lastValueFrom(
      this.http.put(url,body)
    );
    return response;
  }
  // แสดง rank
  public async appearRank(options?:any){
    const url = `${this.constants.API_ENDPOINT}/vote/rank`;
    const response = await lastValueFrom(
      this.http.get(url)
    );
    return response as getImage[];
  }
}
