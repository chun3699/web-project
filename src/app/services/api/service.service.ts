import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { getImage } from '../../../model/getImage';
import { User } from '../../../model/model_uid';
import { lastValueFrom } from 'rxjs';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  uuser: User[] = [];
  //session
  //รับค่า user และ password
  setUserCredentials(username: string, password: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

  // อ่านข้อมูล user และ password 
  getUserCredentials(): { username: string, password: string } | null {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return (username && password) ? { username, password } : null;
  }

  // ลบข้อมูล user และ password 
  clearUserCredentials(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }
  



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

  //นำรูปทั้งหมดใส่ในตัวแปร
  public async allimg(){
    const url = `${this.constants.API_ENDPOINT}/images/selete`;
    const response = await lastValueFrom(
      this.http.get(url)
    );
    return response as getImage[];
  }

  //ใส่ค่าผลคะแนน
  public async vote(did:number,score:number){
    // console.log("serv"+did);
    const url = `${this.constants.API_ENDPOINT}/vote/scors/${did}/${score}`;
    const response = await lastValueFrom(
      this.http.put(url,{})
    );
    return response as getImage[];
  }
  //แสดง uid ทั้งหมด
  public async getAllUser(options?:any){
    const url = `${this.constants.API_ENDPOINT}/login`;
    const response = await lastValueFrom(
      this.http.get(url)
    );
    return response as User[];
  }
  //ทำไว้ก่อนนะ <-
  public async UserIsYou(options?:any){
    const url = `${this.constants.API_ENDPOINT}/login/saifa/saifa`;
    const response = await lastValueFrom(
      this.http.get(url)
    );
    return response as User[];
  };
  //updata profile <-
  public async UpdateProfile(body:any,uid:number,options?:any){
    const url = `${this.constants.API_ENDPOINT}/login/profile/1`;
    const response = await lastValueFrom(
      this.http.put(url,body)
    );
    return response as User[];
  }

  //login
  public async login(user: string,pass: string){
    const url = `${this.constants.API_ENDPOINT}/login/${user}/${pass}`;
    const response = await lastValueFrom(
      this.http.get(url)
    );
    return response as User[];
  }
  public async CrateUid(body:any){
    const url = `${this.constants.API_ENDPOINT}/login/`;
    const response =await lastValueFrom(
      this.http.post(url,body)
    );
    return response as User[];
  }
}
