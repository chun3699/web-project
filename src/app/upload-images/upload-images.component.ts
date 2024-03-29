import { Component, SimpleChange  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceService } from '../services/api/service.service';
import axios from "axios";
import { SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { image } from '../../model/image';
import { getImage } from '../../model/getImage';
import { User } from '../../model/model_uid';
import { Router } from '@angular/router';

const HOST: string = "http://localhost:3000";

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent, 
    ],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.scss'
})
export class UploadImagesComponent {
  imageUrl: string | null = null;
  isFirstUpload: boolean = true;
  getImage: getImage [] = []; 
  delete_Image :any;
  uuser: User[] = [];
  constructor(private http: HttpClient,private service: ServiceService ,private router: Router ) {}
  //แสดงรูป
  async delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }
  async ngOnInit(){
    const user = this.service.getUserCredentials();
    if (user) {
      this.uuser = await this.service.login(user.username, user.password);
      this.getImage = await this.service.getImage(this.uuser[0].uid);
      console.log(this.getImage);
      console.log(this.getImage.length);
      console.log(this.getImage[0].img);
      console.log('Call Completed')


    } else {
      // ไม่พบข้อมูล user และ password ใน sessionStorage
      this.router.navigate(['/vote']);
    }


  }
  // รีหน้าจอตลอดตอนคลิก
  async ngOnChanges(changes : SimpleChanges){
    this.getImage = await this.service.getImage(this.uuser[0].uid);
    console.log("ทำอยู่นะ")
  }
  //ลบรูป
  async deleteImage(did : number){
    this.delete_Image = await this.service.deleteImage(did);
    console.log(this.delete_Image);
    this.ngOnChanges({});
  }
  //อัพรูป
  async onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type == 'image/png' || file.type == 'image/jpeg') {
        const formData = new FormData();
        formData.append('image', file);
        const url = `${HOST}/images/`;
        console.log(url)
        try {
          // ตรวจสอบว่าเป็นการส่งข้อมูลครั้งแรกหรือไม่
          // if (!this.isFirstUpload) {
            // ล่าช้าการส่งข้อมูลถัดไป 5 วินาที (5000 milliseconds)
            // alert('Data sent after 5 seconds delay');
            // await this.delay(5000);
          // }
          const response = await axios.post(url, formData);
          
          console.log('Success:', response.data); // Log the response data if needed
         
          //ออกมาเป็น array
          console.log(JSON.parse(JSON.stringify(response.data)));

          const imgArray = response.data.img; // ดึง array ของ URL จาก response.data
          console.log(imgArray);
          const imageUrlString = imgArray[0];
          console.log(imageUrlString);

           // Set imageUrl to display the uploaded image
          this.imageUrl = response.data.imageUrl;
          this.isFirstUpload = false;

          //  UploadImage in to Mysql
           const body = {
              img: imageUrlString,
              uid: this.uuser[0].uid
           };
           console.log(body);
           console.log(JSON.stringify(body));
           const upImageMysql = await this.service.getUploadImega(body);
           console.log(upImageMysql);
           this.ngOnChanges({});
        } catch (error) {
          console.error('Error:', error);
        }
    } else {
      alert('Please select only jpeg and png');
    }
    }   
  }
  //เปลี่ยน image
  async ChangeImage(event:any,did : number){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type == 'image/png' || file.type == 'image/jpeg') {
        const formData = new FormData();
        formData.append('image', file);
        const url = `${HOST}/images/`;
        try {
          const response = await axios.post(url, formData);
          const imgArray = response.data.img; // ดึง array ของ URL จาก response.data
          const imageUrlString = imgArray[0];
          this.imageUrl = response.data.imageUrl;
          this.isFirstUpload = false;
           const body = {
              img: imageUrlString,
           };
          const change_Image = await this.service.changeImage(body,1);
          console.log(change_Image);
          this.ngOnChanges({});
        } catch (error) {
          console.error('Error:', error);
        }
    } else {
      alert('Please select only jpeg and png');
    }
    }
  }

}
