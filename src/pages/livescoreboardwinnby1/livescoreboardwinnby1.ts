import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PickleBallservices} from '../../providers/pickle-ballservices';
import { HomePage } from '../home/home';
import{TournamentsdirectorhomePage} from '../tournamentsdirectorhome/tournamentsdirectorhome';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Livescoreboardwinnby1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-livescoreboardwinnby1',
  templateUrl: 'livescoreboardwinnby1.html',
	 providers:[PickleBallservices]
})
export class Livescoreboardwinnby1Page {

 scoresobj:any={};
	TeamAScore:any={};
	TeamBScore:any={};
	ScoringFormatObj={};
	Firstserve:any={};
	TimoutStop;
	timeMints=0;
	timeSecondes=0;
	time=false;
	SelectedTimeOutObj;
	timeformate:string = '1min';
	Lastopstionvalue;
	Add11formate=false;


  constructor(public navCtrl: NavController,public service:PickleBallservices,public navParams: NavParams,public storage:Storage) {
  }
  	//function for page onload.  
  	ionViewDidLoad(){
			this.Firstserve=this.navParams.data.TeamsWithServeDetails;
			this.scoresobj=this.navParams.data.ScoreBoard;
			this.MatchStartToEndTime();
			if(this.Firstserve.Team1Active){
				this.TeamAScore=this.scoresobj.Team1;
	  			this.TeamBScore=this.scoresobj.Team2;
			}else if(this.Firstserve.Team2Active){
				this.TeamAScore=this.scoresobj.Team2;
	  			this.TeamBScore=this.scoresobj.Team1;
			}
		

		if(this.navParams.data.Event === 'Doubles'){
			this.scoresobj.Team1.SetoneActive=false;
  			this.scoresobj.Team2.SetoneActive=false;
		}
		this.SocketonMatches(this.navParams.data._id);
		 
	}

	//socket on turnament drectore
        SocketonMatches(id){
            this.service.socket.on('livescore'+id, (response) =>{
				this.Firstserve=response.TeamsWithServeDetails;
				this.scoresobj=response.ScoreBoard;
				if(this.Firstserve.Team1Active){
					this.TeamAScore=this.scoresobj.Team1;
						this.TeamBScore=this.scoresobj.Team2;
				}else if(this.Firstserve.Team2Active){
					this.TeamAScore=this.scoresobj.Team2;
						this.TeamBScore=this.scoresobj.Team1;
				}
				if(this.navParams.data.Event === 'Doubles'){
						this.scoresobj.Team1.SetoneActive=false;
						this.scoresobj.Team2.SetoneActive=false;
				}
			})
        }

  //function for Match start to End showing time.
	MatchStartToEndTime(){
		if(this.Firstserve.GameStartSecondes===59){
			this.Firstserve.GameStartMints++;
			this.Firstserve.GameStartSecondes=0;
			if(this.Firstserve.GameStartMints===59){
				this.Firstserve.GameStartHovers++;
				this.Firstserve.GameStartMints=0;
			}
		
		}
	setTimeout(() => {
			this.Firstserve.GameStartSecondes++;
			if(this.Firstserve.Gamecomplete === undefined  && this.Firstserve.Winner === undefined){
	    		this.MatchStartToEndTime();
	    	}
		}, 1000);
	}
	//function for back to page.
	backtohome(){
  		if(this.navParams.data.Logout===undefined){
			this.navCtrl.push(TournamentsdirectorhomePage).then(() => {
                this.navCtrl.remove(0);
            });
		}else{
			this.navCtrl.pop();
		}
  }

	//function refaree logout.
    logout(){
        this.storage.clear().then(()=>{
         this.navCtrl.push(HomePage);
        });
     }

}
