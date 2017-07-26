import { Component } from '@angular/core';
import { NavController, NavParams,AlertController} from 'ionic-angular';
import{Page1Page} from '../page1/page1';
/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html'
})
export class TournamentsPage {
  //varaybule for Tournaments form show hide.
  TournamentShow=false;
  //varaybule for Tournaments list of array in gloable.
  TournamentList=[];
  //varaybule for Tournament page gloable object.
  Tournament:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {}

  ionViewDidLoad() {
  }

      //function for Scheduled Matches
      ScheduledMatches(){
        this.navCtrl.push(Page1Page);
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

        BackToPage(){
          this.navCtrl.pop();
        }

}
