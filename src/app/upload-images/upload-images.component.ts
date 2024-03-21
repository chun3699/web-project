import { HttpClient } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.scss'
})
export class UploadImagesComponent {
  constructor(private http: HttpClient){
  }
  ngOnInit():void{

  }
  onChangeFile(event : any ){
    if(event.terget.files.length>0){
      const file = event.traget.files[0];
      if(file.type == 'image/png' || file.type == 'image/jpeg'){
        const formData = new FormData();
        formData.append('file',file);
        this.http.post('http://localhost:3000/images/',formData).subscribe((res:any)=>{
        debugger
      });
      }else {
        alert ('Plase select only jpeg and png');
      }
      
    }
    
  }
}
