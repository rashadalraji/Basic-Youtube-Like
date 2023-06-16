import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor(private commonService : CommonService){

  }

  videoList : any[] =[]

  ngOnInit(){
    console.log('inIt')
    this.commonService.getVideoList().subscribe((res:any)=>{
      if(res){
        this.videoList = res;
      }
    })
  }

}
