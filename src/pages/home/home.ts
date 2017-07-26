import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ModalController} from 'ionic-angular';
import {RecmodalhomepagePage} from '../recmodalhomepage/recmodalhomepage';
import {PickleBallservices} from '../../providers/pickle-ballservices';
import{LoginpagePage} from '../loginpage/loginpage';
import { Refereescoreboardwinby1Page} from '../refereescoreboardwinby1/refereescoreboardwinby1';
import { Refereescoreboardwinby2Page} from '../refereescoreboardwinby2/refereescoreboardwinby2';
import { SpectatorhomePage } from '../Spectatorhome/Spectatorhome';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[PickleBallservices]
})
export class HomePage {
  createtournmentshow=false;
  Homepageobj:any={};
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,public service:PickleBallservices,public storage: Storage,public Modal:ModalController) {}
  //function for page onload.
  	ionViewDidLoad(){
          this.storage.get('loginUser-Token').then((val)=>{
              if(val!==null){
                  this.service.RefereeReloadScoreBoard(val).subscribe(response => {
                    if(response.Matchs.GameFormat==="1 To 15 Win By 1" || response.Matchs.GameFormat==="1 To 21 Win By 1"){
                        this.navCtrl.push(Refereescoreboardwinby1Page,response.Matchs).then(() => {
                            this.navCtrl.remove(0);
                        });
                        // this.navCtrl.push(Refereescoreboardwinby1Page,response.Matchs);
                    }else{
                       this.navCtrl.push(Refereescoreboardwinby2Page,response.Matchs).then(() => {
                            this.navCtrl.remove(0);
                        });  
                    }
			    },err =>{
				});
              }
                
                
            });
          this.Homepageobj.SignInShow=false;
      }
  //function for TournmentDirector opstion click.
  TournmentDirectors(){
      let obj:any={"TournmentDirectors":1};
      this.navCtrl.push(LoginpagePage,obj).then(() => {
                this.navCtrl.remove(0);
    });

  }

  //function for Referee opstion click.
  Referee(){
      this.navCtrl.push(LoginpagePage).then(() => {
                this.navCtrl.remove(0);
    });
    //   .then(() => {
    //             this.navCtrl.remove(0);
    // });
    
  }
  //function for Referee login service call and validasionse.
//    LoginReferee(){
//       if(this.Homepageobj.LoginUserName===null){
//             this.AlertMethode("Enter coruct UserName");
//       }else if(this.Homepageobj.LoginPassword ===null){
//             this.AlertMethode("Enter coruct password");
//       }else{
//           let obj:any={};
//               obj.RefereeName=this.Homepageobj.LoginUserName;
//               obj.RefereePassword=this.Homepageobj.LoginPassword;
//              this.service.RefereeLoginService(obj).subscribe(response => {
//                 this.storage.set('loginUser-Token',response.Token);
//                 this.storage.set('loginUser-Role',response.role);
//                 if(response.Matchs!=undefined){
//                     if(response.Matchs.GameFormat==="1 To 15 Win By 1" || response.Matchs.GameFormat==="1 To 21 Win By 1"){
//                         this.navCtrl.push(Refereescoreboardwinby1Page,response.Matchs);
//                     }else{
//                         this.navCtrl.push(Refereescoreboardwinby2Page,response.Matchs); 
//                     }
//                 }else{
//                    this.AlertMethode(response); 
//                 }    
//                 this.Homepageobj.LoginUserName=null;
//                 this.Homepageobj.LoginPassword=null;
//                 this.Homepageobj.SignInShow=false;
//                 this.Homepageobj.Refereelogin=false;
                
//              },err =>{
//                 this.AlertMethode("Please Enter valid email and Password");
//                 this.Homepageobj.LoginUserName=null;
//                 this.Homepageobj.LoginPassword=null;
//              });

           
//       }
//   }


  // function for Show creae tournment.
  createtournment(){

    if(this.Homepageobj.TournamentTitle===null){
          this.AlertMethode("Fill TournamentTitle Details");
      }else if(this.Homepageobj.UserId===null){
          this.AlertMethode("Fill Tournament User Details");
      }else if(this.Homepageobj.Password===null){
          this.AlertMethode("Fill Password");
      }else if(this.Homepageobj.TournamentLogo===null){
          this.AlertMethode("Fill TournamentLogo Details");
      }else if(this.Homepageobj.TournamentStartDate===null){
          this.AlertMethode("Fill TournamentStartDate Details");
      }else if(this.Homepageobj.TournamentEndDate===null){
          this.AlertMethode("Fill TournamentEndDate Details");
      }else if(this.Homepageobj.TournamentAddress===null){
          this.AlertMethode("Fill TournamentAddress Details");
      }else if(this.Homepageobj.TournamentZipcode===null){
          this.AlertMethode("Fill TournamentZipcode Details");
      }else if(this.Homepageobj.TournamentCity===null){
          this.AlertMethode("Fill TournamentCity Details");
      }else{
          this.createtournmentshow=false;
          this.Homepageobj.TournamentLogo="assets/icon/newicon.png";
      }

  }
  SpectatorMatchesdata(){
      this.service.SpectatorGetTournamentList().subscribe(response=>{
          this.navCtrl.push(SpectatorhomePage,response);
      }, err=>{

      })
  }

  //function for RecMode methode.
  RecMode(){
      this.navCtrl.push(RecmodalhomepagePage);
  }

  

  //function for alert messages
    AlertMethode(str){
          let prompt = this.alertCtrl.create({
          message: str,
          buttons: [
            {
            text: 'ok',
            handler: data => {
            }
          }
        ]
      });
      prompt.present();
    }

  
    



}
