import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import axios from "axios";

const HOST: string = "http://localhost:3000";

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    HttpClientModule 
    ],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.scss'
})
export class UploadImagesComponent {
  imageUrl: string | null = null;
  constructor(private http: HttpClient) {}
  ngOnInit():void{
  }
  async onChangeFile(event: any) {
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
          // Set imageUrl to display the uploaded image
          this.imageUrl = response.data.imageUrl;
        } catch (error) {
          console.error('Error:', error);
        }
    } else {
      alert('Please select only jpeg and png');
    }
      
        
    
    }
  }
}
