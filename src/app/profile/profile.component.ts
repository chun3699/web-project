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
import { Router } from '@angular/router';
import { User } from '../../model/model_uid';

// const HOST: string = "http://localhost:3000";
const HOST: string = "https://node-project-ds4m.vercel.app/";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      HeaderComponent,
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  showProfile: boolean = true;
  imageUrl: string | null = null;
  isFirstUpload: boolean = true;
  getUid : User [] = [];
  
  constructor(private http: HttpClient,private service: ServiceService,private router: Router ){}
  async ngOnInit(){
    const user = this.service.getUserCredentials();
    if (user) {
      this.getUid = await this.service.login(user.username, user.password);
    } else {
      // ไม่พบข้อมูล user และ password ใน sessionStorage
      this.router.navigate(['/vote']);
    }
    this.showProfile;
    console.log(this.getUid);
    console.log(this.getUid[0].profile);
    console.log('Call Completed');
  }
  async ngOnChanges(changes : SimpleChanges){
    const user = this.service.getUserCredentials();
    if (user) {
      this.getUid = await this.service.login(user.username, user.password);
    } else {
      // ไม่พบข้อมูล user และ password ใน sessionStorage
    }
    console.log("getUid");
  }
  async ProfileImage(event:any){
      console.log("เจออะไรมั่ย");
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        if (file.type == 'image/png' || file.type == 'image/jpeg') {
          const formData = new FormData();
          formData.append('image', file);
          const url = `${HOST}/images/`;
          console.log(url)
          try {   
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
  
            //  UploadImage in to Mysql
             const body = {
              profile: imageUrlString, 
             };
             console.log(body);
             console.log(JSON.stringify(body));
             const UpProfile_P = await this.service.UpdateProfile(body,this.getUid[0].uid);
             console.log(UpProfile_P);
             this.ngOnChanges({});
             
          } catch (error) {
            console.error('Error:', error);
          }
      } else {
        alert('Please select only jpeg and png');
      }
      }   
  }

  async btnClick(text: HTMLInputElement) { 
    if(text.value.length > 0){
      console.log(text.value);
      const body = {
        name: text.value
    };
    const UpProfile_P = await this.service.UpdateProfile(body,this.getUid[0].uid);
    console.log(UpProfile_P);
    this.ngOnChanges({});
    text.value ='';
    }
  }
}
