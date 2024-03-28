import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ServiceService } from '../services/api/service.service';
import { getImage } from '../../model/getImage';
import { vote } from '../../model/vote';
import { HeaderComponent } from '../header/header.component'; 

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent {
  
  imgvote: getImage[] = []; //ภาพที่ชนะ[0] แพ้[1]
  images: getImage[] = []; 
  selectedImages: getImage[] = [];
  score: vote[] = [];

  constructor(private service: ServiceService) {}

  async ngOnInit(){
    this.images = await this.service.allimg();
    this.selectRandomImages();
  }

  selectRandomImages() {
    this.imgvote = [];
    this.score = [];
    this.selectedImages = [];
    const index1 = Math.floor(Math.random() * this.images.length);
    let index2 = Math.floor(Math.random() * this.images.length);
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * this.images.length);
    }
    this.selectedImages = [this.images[index1], this.images[index2]];
  }

  calculateEloScore_Win(scoreA: number, scoreB: number): void {
    const K = 10; // ค่าคงที่ K สำหรับ Elo Rating Algorithm
    const E = 1 / (1 + Math.pow(10, (scoreB - scoreA) / 400)); // คำนวณค่าคาดการณ์ความน่าจะเป็นของการชนะ
    console.log("win"+E);
    const S = 1;
    let newScore = scoreA + K * (S - E); // คำนวณคะแนนใหม่
    newScore = Math.round(newScore); // ทำเป็นจำนวนเต็ม
    if (newScore < 0) {
      newScore = 0; // ตรวจสอบและกำหนดให้คะแนนใหม่ไม่ต่ำกว่า 0
    }
      this.score[0].did = this.imgvote[0].did
      this.score[0].score = newScore;
      this.score[0].E = E;
      this.score[1].S = S;
      this.score[0].K = K;
      this.score[0].sA = scoreA;
      this.score[0].sB = scoreB;
      this.score[0].ss = K * (S - E);
      console.log("win"+this.score[0].ss);
  }

  calculateEloScore_Lose(scoreA: number, scoreB: number): void {
    const K = 10; // ค่าคงที่ K สำหรับ Elo Rating Algorithm
    const E = 1 / (1 + Math.pow(10, (scoreB - scoreA) / 400)); // คำนวณค่าคาดการณ์ความน่าจะเป็นของการชนะ
    console.log("Lose"+E);
    const S = 0;
    let newScore = scoreA + K * (S - E); // คำนวณคะแนนใหม่
    newScore = Math.round(newScore); // ทำเป็นจำนวนเต็ม
    console.log("news"+newScore);
    
    if (newScore < 0) {
      newScore = 0; // ตรวจสอบและกำหนดให้คะแนนใหม่ไม่ต่ำกว่า 0
    }
      this.score[1].did = this.imgvote[1].did
      this.score[1].score = newScore;
      this.score[1].E = E;
      this.score[1].S = S;
      this.score[1].K = K;
      this.score[1].sA = scoreA;
      this.score[1].sB = scoreB;
      this.score[1].ss = K * (S - E);
      console.log("Lose"+this.score[0].ss);
  }

   vote(index: number): void {
    this.imgvote = [];
    this
    if (this.selectedImages[0].did === index) {
      // ถ้ารูปภาพที่โหวตเป็นรูปภาพที่ 1
      this.imgvote.push(this.selectedImages[0]);
      this.imgvote.push(this.selectedImages[1]);
      
  } else if (this.selectedImages[1].did === index) {
      // ถ้ารูปภาพที่โหวตเป็นรูปภาพที่ 2
      this.imgvote.push(this.selectedImages[1]);
      this.imgvote.push(this.selectedImages[0]);
  }else{
    console.log("error");
  }
  this.score[0] = {E: 0,sA: 0,sB: 0,K: 0,S: 0,score: 0,ss: 0,did: 0};
  this.score[1] = {E: 0,sA: 0,sB: 0,K: 0,S: 0,score: 0,ss: 0,did: 0};
  
  this.calculateEloScore_Win(this.imgvote[0].vote_count, this.imgvote[1].vote_count);
  this.calculateEloScore_Lose(this.imgvote[1].vote_count, this.imgvote[0].vote_count);

  // เรียกใช้งาน putvote เพื่อส่งข้อมูลโหวตไปยัง API
  this.putvote();

  // เรียกใช้งาน delayRandomImages หลังจากที่คำนวณคะแนนแล้ว
  this.delayRefresh();
  }

  delayRefresh(): void {
    setTimeout(() => {
      // รีเฟรชหน้าใหม่หลังจาก delay 3 วินาที
      window.location.reload();
    }, 1500);
  }

  async putvote(): Promise<void> {
    for (let item of this.score) {
      let did = item.did;
      let score = item.score;
      const vote = await this.service.vote(did, score);
      console.log("vote" + vote);
    }
  }
}
