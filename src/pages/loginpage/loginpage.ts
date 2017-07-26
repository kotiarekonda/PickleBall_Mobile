import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {PickleBallservices} from '../../providers/pickle-ballservices';
import{TournamentsdirectorhomePage} from '../tournamentsdirectorhome/tournamentsdirectorhome';
import { Refereescoreboardwinby1Page} from '../refereescoreboardwinby1/refereescoreboardwinby1';
import { Refereescoreboardwinby2Page} from '../refereescoreboardwinby2/refereescoreboardwinby2';
// import { HomePage } from '../home/home';
/*
  Generated class for the Loginpage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-loginpage',
  templateUrl: 'loginpage.html',
  providers:[PickleBallservices]
})
export class LoginpagePage {
  Loginobj:any={};
  clicktournament=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:PickleBallservices,public storage: Storage,public alertCtrl: AlertController,public viewCtrl:ViewController) {}

  ionViewDidLoad() {
    if(this.navParams.data.TournmentDirectors===1){
      this.clicktournament=true;
    }else{
      this.clicktournament=false;
    }
    
  }

 //function for TournmentDirector login and validastionse card.
   TournmentDirectorLogin(){

     
      if(this.Loginobj.LoginUserName===null){
            this.AlertMethode("Enter coruct UserName");
      }else if(this.Loginobj.LoginPassword ===null){
            this.AlertMethode("Enter coruct password");
      }else{
          let obj:any={};
              obj.email=this.Loginobj.LoginUserName;
              obj.password=this.Loginobj.LoginPassword;
             this.service.TournmentDirectorsLogin(obj).subscribe(response => {
                this.storage.set('loginUser-Token',response.token);
                this.storage.set('loginUser-Role',response.role);
                this.storage.set('loginUser-Id',response._id);
                // this.viewCtrl.dismiss();
                // this.navCtrl.push(TournamentsdirectorhomePage,response.token).then(() => {
                //   this.navCtrl.popToRoot(0);
                // });
                 this.navCtrl.push(TournamentsdirectorhomePage,response.token).then(() => {
                    this.navCtrl.remove(0);
                });

                // this.navCtrl.setRoot(TournamentsdirectorhomePage,response.token);
                // this.navCtrl.getRootNav().setRoot(LoginPage);
                // this.navCtrl.push(TournamentsdirectorhomePage,response.token);
                
             },err =>{
                 this.AlertMethode("Please Enter valid email and Password");
                this.Loginobj.LoginUserName=null;
                this.Loginobj.LoginPassword=null;
             });

           
      }
  }
//function for Referee login and validastionse card.
  LoginReferee(){
      if(this.Loginobj.LoginUserName===null){
            this.AlertMethode("Enter coruct UserName");
      }else if(this.Loginobj.LoginPassword ===null){
            this.AlertMethode("Enter coruct password");
      }else{
          let obj:any={};
              obj.RefereeName=this.Loginobj.LoginUserName;
              obj.RefereePassword=this.Loginobj.LoginPassword;
             this.service.RefereeLoginService(obj).subscribe(response => {
                this.storage.set('loginUser-Token',response.Token);
                this.storage.set('loginUser-Role',response.role);
                if(response.Matchs!=undefined){
                    if(response.Matchs.GameFormat==="1 To 15 Win By 1" || response.Matchs.GameFormat==="1 To 21 Win By 1"){
                        // this.viewCtrl.dismiss();

                        this.navCtrl.push(Refereescoreboardwinby1Page,response.Matchs).then(() => {
                            this.navCtrl.remove(0);
                        });
                        //  this.navCtrl.setRoot(Refereescoreboardwinby1Page,response.Matchs).then(() =>{
                        //     this.navCtrl.popToRoot();
                        //   });
                        // this.navCtrl.push(Refereescoreboardwinby1Page,response.Matchs).then(() => {
                        //     this.navCtrl.remove(0,1);
                        // });
                        // this.navCtrl.push(Refereescoreboardwinby1Page,response.Matchs);
                    }else{
                        // this.viewCtrl.dismiss();
                         this.navCtrl.push(Refereescoreboardwinby2Page,response.Matchs).then(() => {
                            this.navCtrl.remove(0,2);
                        });
                        // this.navCtrl.setRoot(Refereescoreboardwinby2Page,response.Matchs).then(() =>{
                        //     this.navCtrl.popToRoot();
                        //   });
                        // this.navCtrl.push(Refereescoreboardwinby2Page,response.Matchs).then(() => {
                        //     this.navCtrl.remove(1);
                        // });
                        // this.navCtrl.push(Refereescoreboardwinby2Page,response.Matchs); 
                    }
                }else{
                   this.AlertMethode(response); 
                }    
                this.Loginobj.LoginUserName=null;
                this.Loginobj.LoginPassword=null;
                
             },err =>{
                this.AlertMethode("Please Enter valid email and Password");
                this.Loginobj.LoginUserName=null;
                this.Loginobj.LoginPassword=null;
             });

           
      }
  }

  //back to home page.
  // backtohome(){
  //    this.navCtrl.pop();
  // } 

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
