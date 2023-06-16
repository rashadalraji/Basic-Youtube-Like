import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';



@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: any;
  public startedPlay: boolean = false;
  public show: boolean = false;

  constructor(private commonService: CommonService) {

  }

  videoList: any;
  suggestionList: any;
  isVideoAvailable: boolean = true;
  isSmallVideoAvailable: boolean = false;
  isVideoClicked: boolean = false;
  isSmallVideoClicked: boolean = false;
  search : any = '';
  suggestionListBackUp : any;

  ngOnInit() {
    this.getVideList()
    
  }

  getVideList(){
    this.commonService.getVideoList().subscribe((res: any) => {
      if (res) {
        this.videoList = res;
        this.suggestionList = [...this.videoList];
        this.suggestionListBackUp = [...this.videoList];
        this.isVideoAvailable = true;
        this.isSmallVideoAvailable = true;
      }else{
        this.isVideoAvailable = false;
      }
    })
  }

  onClickHomeBtn(){
    this.isVideoClicked = ! this.isVideoClicked;
    this.getVideList()
  }


  pauseVideo(videoplayer: any) {
    videoplayer.nativeElement.play();    
    // setTimeout(() => {
      
      if (videoplayer.nativeElement.paused) {
        this.show = !this.show;
      }
      if(this.show){
        videoplayer.nativeElement.pause();
      }
    // }, 5000);
    // }
  }

  closebutton(videoplayer: any) {
    this.show = !this.show;
    videoplayer.nativeElement.play();
  }
  // listName:string = 'videoList'

  onClickSearchBtn(listName:string = 'videoList') {
   
    setTimeout(()=>{
      if (this.search) {
        if(listName == 'videoList'){
          this.videoList = this.videoList.filter((el: any) => el.title.toLowerCase().includes(this.search.toLowerCase()));
        if(this.videoList && this.videoList.length > 0){
          this.isVideoAvailable = true;
        }else{
          this.isVideoAvailable = false;
        }
      }else{

        this.suggestionList = this.suggestionList.filter((el: any) => el.title.toLowerCase().includes(this.search.toLowerCase()));
        if(this.suggestionList && this.suggestionList.length > 0){
          this.isSmallVideoAvailable = true;
        }else{
          this.isSmallVideoAvailable = false;
        }
      }
      } else {
        if(listName == 'videoList'){
          this.getVideList()
        }else{          
          this.suggestionList = [...this.suggestionListBackUp]
          this.isSmallVideoAvailable = true;
        }
        
      }
    },1000)
   
  }

  onClickVideoInfo(id:string){
    this.isVideoClicked = true;
    this.isSmallVideoClicked = false;
    let index = this.suggestionList.findIndex((el:any)=>el.id==id);
    let masterIndex = this.videoList.findIndex((el:any)=>el.id==id);
    if(index >= 0){
      this.suggestionList.splice(index,1);
      // this.videoList = this.videoList.slice(masterIndex,1);
    }
    if(masterIndex >= 0){    
      this.videoList = this.videoList.slice(masterIndex,masterIndex+1);
      
    }
    
  }


  onClickSmallVideoInfo(data:any){
    this.isSmallVideoClicked = true;
    // this.isVideoClicked = false;

    
    let tempData = data;
    let index = this.suggestionList.findIndex((el:any)=>el.id==data.id);
    
    if(index >= 0){
      this.suggestionList.splice(index,1,this.videoList[0]);
      this.suggestionListBackUp.splice(index,1,this.videoList[0]);
      
    }

    this.videoList[0] = tempData;
   
    
  }

 

}
