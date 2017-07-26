import { Component } from '@angular/core';

import { NavController,NavParams,ViewController} from 'ionic-angular';



@Component({
  selector: 'page-Third',
  templateUrl: 'ThirdPage.html'
})


export class Thirdpage {
  wristband:any={};
  wristbandDescription="";
  wristbandInput=false;
	 constructor(public nav:NavController,public viewCtrl:ViewController,public navParams:NavParams) {
		}
    ionViewDidLoad(){
      if(this.navParams.data.TeamAwristbandDescription ===undefined && this.navParams.data.TeamBwristbandDescription ===undefined ){
        this.wristbandInput=true;
      }else{
        this.wristbandInput=false;
      }
    }
    //function for Save wristband Description.
    Save(){
        let obj:any={};
        if(this.navParams.data.TeamPlayer != undefined && this.navParams.data.TeamPlayer==='A'){
            if(this.wristbandDescription !=""){
                obj.wristbandteamADescription=this.wristbandDescription;
                this.viewCtrl.dismiss(obj);
            }else{
                console.log("empty wristbandDescription");
            }
        }else if(this.navParams.data.TeamAwristbandDescription !=undefined){
            if(this.wristbandInput){
                if(this.wristbandDescription !=''){
                  obj.wristbandteamADescription=this.wristbandDescription;
                  this.viewCtrl.dismiss(obj);
                }else{
                  console.log("empty wristbandDescription");
                }
            }else{
              obj.wristbandteamADescription=this.navParams.data.TeamAwristbandDescription;
              this.viewCtrl.dismiss(obj);
            }
        }else if(this.navParams.data.TeamPlayer != undefined && this.navParams.data.TeamPlayer==='B'){
            if(this.wristbandDescription !=""){
                obj.wristbandteamBDescription=this.wristbandDescription;
                this.viewCtrl.dismiss(obj);
            }else{
                console.log("empty wristbandDescription");
            }
        }else if(this.navParams.data.TeamBwristbandDescription !=undefined){
              if(this.wristbandInput){
                  if(this.wristbandDescription !=""){
                    obj.wristbandteamBDescription=this.wristbandDescription;
                    this.viewCtrl.dismiss(obj);
                  }else{
                    console.log("empty wristbandDescription");
                  }
              }else{
                obj.wristbandteamBDescription=this.navParams.data.TeamBwristbandDescription;
                this.viewCtrl.dismiss(obj);
              }
            }
        
        this.wristbandDescription='';
    }
    // function for Edit wristbandDescription.
    EditwristbandDescription(){
      this.wristbandInput=true;
    }
	close(){
		this.viewCtrl.dismiss();
		}
}