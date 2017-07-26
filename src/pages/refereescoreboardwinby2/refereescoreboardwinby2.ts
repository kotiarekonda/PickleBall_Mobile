import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ModalController } from 'ionic-angular';
import { ScoreboardQuestionmodalPage } from '../Scoreboard-questionmodal/Scoreboard-questionmodal';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import {PickleBallservices} from '../../providers/pickle-ballservices';
import { Thirdpage } from '../ThirdPage/third';

/*
  Generated class for the Refereescoreboardwinby2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-refereescoreboardwinby2',
  templateUrl: 'refereescoreboardwinby2.html',
  providers:[PickleBallservices]
})
export class Refereescoreboardwinby2Page {

  scoresobj:any={};
	TeamAScore:any={};
	TeamBScore:any={};
	Firstserve:any={};
	TimoutStop;
	timeMints=0;
	timeSecondes=0;
	time=false;
	SelectedTimeOutObj;
	timeformate:string ='1min';
	Lastopstionvalue;
	CurentScore=0;
	Add11formate=false;


  constructor(public navCtrl: NavController,public service:PickleBallservices,public storage: Storage,public navParams: NavParams, public alertCtrl: AlertController,public Modal:ModalController) {
  }
  	//function for page onload.  
  	ionViewDidLoad(){
	  	
		 if(this.navParams.data.TeamsWithServeDetails!==undefined){
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
		}else{
			this.scoresobj=this.navParams.data.ScoreBoard;
			this.TeamAScore=this.scoresobj.Team1;
	  		this.TeamBScore=this.scoresobj.Team2;
			this.Firstserve.SideOutButtonActive=true;
			this.Firstserve.CourtChange=false;
			this.Firstserve.GameStartHovers=0;
			this.Firstserve.GameStartMints=0;
			this.Firstserve.GameStartSecondes=0;
			this.Firstserve.SetType="SetOneScores";
			let Questionmodal=this.Modal.create(ScoreboardQuestionmodalPage,this.navParams.data);
			Questionmodal.onDidDismiss(data => {
			if(data!=undefined){
				this.FirstServe(data);
			}
			});
			Questionmodal.present();
		} 
		
		if(this.navParams.data.GameFormat ==="2 Of 3 To 11 Win By 2"){
			this.Add11formate=true;
		}else{
			this.Add11formate=false;
		}

		if(this.navParams.data.Event === 'Doubles'){
			this.scoresobj.Team1.SetoneActive=false;
  			this.scoresobj.Team2.SetoneActive=false;
		}
	  	
		 
	}




	//function for back to home page.
	backtohome(){
		this.scoreboardeupdate();
		//this.navParams.data.GameStatus=false;
		window.location.reload(true);
  		this.navCtrl.pop();
  	}
	presentProfileModal(String) {
		let myobj:any={};
		let modal;
		if(String==='A'){
			if(this.Firstserve.TeamAwristbandDescription != undefined){
				myobj.TeamAwristbandDescription=this.Firstserve.TeamAwristbandDescription;
				 modal = this.Modal.create(Thirdpage,myobj);
			}else{
				myobj.TeamPlayer="A";
				modal = this.Modal.create(Thirdpage,myobj);
			}
		}else if(String==='B'){
			if(this.Firstserve.TeamBwristbandDescription != undefined){
				myobj.TeamBwristbandDescription=this.Firstserve.TeamBwristbandDescription;
				modal = this.Modal.create(Thirdpage,myobj);
			}else{
				myobj.TeamPlayer="B";
				modal = this.Modal.create(Thirdpage,myobj);
			}
		}
		 
		 modal.onDidDismiss(data => {
			 if(data!=undefined){
				if(data.wristbandteamADescription !=undefined){
					this.Firstserve.TeamAwristbandDescription=data.wristbandteamADescription;
				}else if(data.wristbandteamBDescription !=undefined){
					this.Firstserve.TeamBwristbandDescription=data.wristbandteamBDescription;
				}
			 }
  		});
        modal.present();
 }

  	//function for how is the first serve.
  	FirstServe(data){
		let SelectedTeam;
		if(data.SelectedTeam != undefined){
			  SelectedTeam=data.SelectedTeam;
			  if(SelectedTeam==="Team2"){
				  this.TeamAScore=this.scoresobj.Team2;
	  				this.TeamBScore=this.scoresobj.Team1;
			  }
			  if(data.Team1Sides){
				  this.Firstserve.Team1Side=data.Team1Sides;
				  this.Firstserve.Team2Side=data.Team2Sides;
			  }
		}else{
			SelectedTeam= data;
		}
	if(this.navParams.data.Event==="Singles"){
			this.scoresobj.Team1.SetoneActive=false;
  			this.scoresobj.Team2.SetoneActive=false;
			
  			if(SelectedTeam==="Team1"){
				  this.navParams.data.Team1.Players[0].Served=true;
				  this.navParams.data.Team2.Players[0].Served=false;
				  this.Firstserve.GameStart=true;
				   this.Firstserve.selectedTeam="Team1";
				if(this.scoresobj.FormateName==="2 Of 3 To 11 Win By 2"){
					this.scoresobj.Team1.SetOneServe=true;
					this.scoresobj.Team2.SetTwoServe=true;
					this.scoresobj.Team1.SetThreeServe=true;
					this.Firstserve.minValue=0;
					this.Firstserve.maxValue=11;
					this.scoresobj.Team2.SetOneServe=false;
					this.scoresobj.Team2.SetThreeServe=false;
					this.scoresobj.Team1.SetTwoServe=false;
				}else{
					if(this.scoresobj.FormateName==="1 To 15 Win By 2"){
						this.Firstserve.maxValue=15;
						this.Firstserve.minValue=0;
					}else{
						this.Firstserve.maxValue=21;
						this.Firstserve.minValue=0;
					}
					this.scoresobj.Team1.SetOneServe=true;
					this.scoresobj.Team2.SetOneServe=false;
				}
  				
  			}else{
				  this.navParams.data.Team1.Players[0].Served=false;
				  this.navParams.data.Team2.Players[0].Served=true;
				   this.Firstserve.GameStart=true;
				   this.Firstserve.selectedTeam="Team2";
				  if(this.scoresobj.FormateName==="2 Of 3 To 11 Win By 2"){
						this.scoresobj.Team2.SetOneServe=true;
						this.scoresobj.Team1.SetTwoServe=true;
						this.scoresobj.Team2.SetThreeServe=true;
						this.scoresobj.Team1.SetOneServe=false;
						this.scoresobj.Team2.SetTwoServe=false;
						this.scoresobj.Team1.SetThreeServe=false;
						this.Firstserve.minValue=0;
						this.Firstserve.maxValue=11;
					}else{
						if(this.scoresobj.FormateName==="1 To 15 Win By 2"){
							this.Firstserve.maxValue=15;
							this.Firstserve.minValue=0;
						}else{
							this.Firstserve.maxValue=21;
							this.Firstserve.minValue=0;
						}
						this.scoresobj.Team2.SetOneServe=true;
						this.scoresobj.Team1.SetOneServe=false;
					}
  			}
  			
	  		let Teama:any={};
	  		let Teamb:any={};
	  		Teama.nameA1=this.navParams.data.Team1.Players[0]['Name'];
	  		Teama.TeamAPoints=0;
	  		Teama.TeamAServeCount=1;
	  		Teamb.nameB1=this.navParams.data.Team2.Players[0]['Name'];
	  		Teamb.TeamBPoints=0;
	  		Teamb.TeamBServeCount=1;
	  		this.Firstserve.Team1=Teama;
	  		this.Firstserve.Team2=Teamb;
	  	}else{
				this.Firstserve.GameStart=true;
				this.Firstserve.SideOutButtonActive=true;
				let Teama:any={};
				let Teamb:any={};
				Teama.TeamAPoints=0;
				Teama.TeamAServeCount=2;
				Teamb.TeamBPoints=0;
				Teamb.TeamBServeCount=2;
				this.Firstserve.Team1=Teama;
				this.Firstserve.Team2=Teamb;
				if(SelectedTeam==="Team1"){
					this.Firstserve.selectedTeam="Team1";
					if(this.scoresobj.FormateName==="2 Of 3 To 11 Win By 2"){
						this.scoresobj.Team1.SetOneServe=true;
						this.scoresobj.Team2.SetTwoServe=true;
						this.scoresobj.Team1.SetThreeServe=true;
						this.Firstserve.minValue=0;
						this.Firstserve.maxValue=11;
						this.scoresobj.Team2.SetOneServe=false;
						this.scoresobj.Team2.SetThreeServe=false;
						this.scoresobj.Team1.SetTwoServe=false;
					}else{
						if(this.scoresobj.FormateName==="1 To 15 Win By 2"){
							this.Firstserve.maxValue=15;
							this.Firstserve.minValue=0;
						}else{
							this.Firstserve.maxValue=21;
							this.Firstserve.minValue=0;
						}
						this.scoresobj.Team1.SetOneServe=true;
						this.scoresobj.Team2.SetOneServe=false;
					}
					
					
				}else{
					this.Firstserve.selectedTeam="Team2";
					if(this.scoresobj.FormateName==="2 Of 3 To 11 Win By 2"){
						this.scoresobj.Team2.SetOneServe=true;
						this.scoresobj.Team1.SetTwoServe=true;
						this.scoresobj.Team2.SetThreeServe=true;
						this.Firstserve.minValue=0;
						this.Firstserve.maxValue=11;
						this.scoresobj.Team1.SetOneServe=false;
						this.scoresobj.Team2.SetTwoServe=false;
						this.scoresobj.Team1.SetThreeServe=false;
					}else{
						if(this.scoresobj.FormateName==="1 To 15 Win By 2"){
							this.Firstserve.maxValue=15;
							this.Firstserve.minValue=0;
						}else{
							this.Firstserve.maxValue=21;
							this.Firstserve.minValue=0;
						}
						this.scoresobj.Team2.SetOneServe=true;
						this.scoresobj.Team1.SetOneServe=false;
					}
					
				}
		}	
  	}

	//function for match start.
	MatchStart(){
		this.Firstserve.GameStart=false;
		this.scoresobj.Team1.SetoneActive=false;
  		this.scoresobj.Team2.SetoneActive=false;
	  	this.navParams.data.GameStatus=1;
		
		if(this.Firstserve.selectedTeam === "Team1"){
			if(this.Firstserve.Team1Side==="Left"){
				this.Firstserve.Team1Side="Left";
				this.Firstserve.Team2Side="Right";
			}else{
				this.Firstserve.Team1Side="Right";
				this.Firstserve.Team2Side="Left";
			}
			if(this.navParams.data.Event ==='Doubles'){
				this.Firstserve.serveChangeUndo=false;
				this.Firstserve.showhedding=true;
				if(this.navParams.data.Team1.Players[0].Served === true){
					this.Firstserve.nameA1=this.navParams.data.Team1.Players[0]['Name'];
					this.Firstserve.nameA2=this.navParams.data.Team1.Players[1]['Name'];
					this.Firstserve.Team1.nameA1=this.navParams.data.Team1.Players[0]['Name'];
					this.Firstserve.Team1.nameA2=this.navParams.data.Team1.Players[1]['Name'];
				}else{
					this.Firstserve.nameA1=this.navParams.data.Team1.Players[1]['Name'];
					this.Firstserve.nameA2=this.navParams.data.Team1.Players[0]['Name'];
					this.Firstserve.Team1.nameA1=this.navParams.data.Team1.Players[1]['Name'];
					this.Firstserve.Team1.nameA2=this.navParams.data.Team1.Players[0]['Name'];
				}
				if(this.navParams.data.Team2.Players[0].Served === true){
					this.Firstserve.nameB1=this.navParams.data.Team2.Players[0]['Name'];
					this.Firstserve.nameB2=this.navParams.data.Team2.Players[1]['Name'];
					this.Firstserve.Team2.nameB1=this.navParams.data.Team2.Players[0]['Name'];
					this.Firstserve.Team2.nameB2=this.navParams.data.Team2.Players[1]['Name'];
				}else{
					this.Firstserve.nameB1=this.navParams.data.Team2.Players[1]['Name'];
					this.Firstserve.nameB2=this.navParams.data.Team2.Players[0]['Name'];
					this.Firstserve.Team2.nameB1=this.navParams.data.Team2.Players[1]['Name'];
					this.Firstserve.Team2.nameB2=this.navParams.data.Team2.Players[0]['Name'];
				}
				this.Firstserve.Team1Active=true;
				this.Firstserve.Team2Active=false;
				this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.nameA1;
				this.Firstserve.ServingTeamActivePlayerSide="Right";
				this.Firstserve.ServingTeamPlayerName=this.Firstserve.nameA2;
				this.Firstserve.ServingTeamPlayerSide="Left";
				this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.nameB1;
				this.Firstserve.ReseivingTeamPlayerName=this.Firstserve.nameB2;
				this.Firstserve.ReseivingTeamActivePlayerSide="Right";
			}else{
				this.Firstserve.nameA1=this.navParams.data.Team1.Players[0]['Name'];
				this.Firstserve.nameB1=this.navParams.data.Team2.Players[0]['Name'];
				this.Firstserve.Team1.nameA1=this.navParams.data.Team1.Players[0]['Name'];
				this.Firstserve.Team2.nameB1=this.navParams.data.Team2.Players[0]['Name'];

				this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
				this.Firstserve.ServingTeamActivePlayerSide="Right";
				this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
				this.Firstserve.ReseivingTeamActivePlayerSide="Right";
			}

			this.Firstserve.Team1Active=true;
			this.Firstserve.Team2Active=false;
		  	this.TeamAScore=this.scoresobj.Team1;
	  		this.TeamBScore=this.scoresobj.Team2;
		}else{
			if(this.Firstserve.Team2Side==="Right"){
				this.Firstserve.Team1Side="Left";
				this.Firstserve.Team2Side="Right";
			}else{
				this.Firstserve.Team1Side="Right";
				this.Firstserve.Team2Side="Left";
			}
			if(this.navParams.data.Event ==='Doubles'){
					this.Firstserve.serveChangeUndo=false;
					this.Firstserve.showhedding=true;
					if(this.navParams.data.Team1.Players[0].Served === true){
						this.Firstserve.nameB1=this.navParams.data.Team1.Players[0]['Name'];
						this.Firstserve.nameB2=this.navParams.data.Team1.Players[1]['Name'];
						this.Firstserve.Team1.nameA1=this.navParams.data.Team1.Players[0]['Name'];
						this.Firstserve.Team1.nameA2=this.navParams.data.Team1.Players[1]['Name'];
					}else{
						this.Firstserve.nameB1=this.navParams.data.Team1.Players[1]['Name'];
						this.Firstserve.nameB2=this.navParams.data.Team1.Players[0]['Name'];
						this.Firstserve.Team1.nameA1=this.navParams.data.Team1.Players[1]['Name'];
						this.Firstserve.Team1.nameA2=this.navParams.data.Team1.Players[0]['Name'];
					}
					if(this.navParams.data.Team2.Players[0].Served === true){
						this.Firstserve.nameA1=this.navParams.data.Team2.Players[0]['Name'];
						this.Firstserve.nameA2=this.navParams.data.Team2.Players[1]['Name'];
						this.Firstserve.Team2.nameB1=this.navParams.data.Team2.Players[0]['Name'];
						this.Firstserve.Team2.nameB2=this.navParams.data.Team2.Players[1]['Name'];
					}else{
						this.Firstserve.nameA1=this.navParams.data.Team2.Players[1]['Name'];
						this.Firstserve.nameA2=this.navParams.data.Team2.Players[0]['Name'];
						this.Firstserve.Team2.nameB1=this.navParams.data.Team2.Players[1]['Name'];
						this.Firstserve.Team2.nameB2=this.navParams.data.Team2.Players[0]['Name'];
					}
					this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.nameA1;
					this.Firstserve.ServingTeamActivePlayerSide="Right";
					this.Firstserve.ServingTeamPlayerName=this.Firstserve.nameA2;
					this.Firstserve.ServingTeamPlayerSide="Left";
					this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.nameB1;
					this.Firstserve.ReseivingTeamPlayerName=this.Firstserve.nameB2;
					this.Firstserve.ReseivingTeamActivePlayerSide="Right";
					
			}else{
				this.Firstserve.nameA1=this.navParams.data.Team2.Players[0]['Name'];
				this.Firstserve.nameB1=this.navParams.data.Team1.Players[0]['Name'];
				this.Firstserve.Team1.nameA1=this.navParams.data.Team1.Players[0]['Name'];
				this.Firstserve.Team2.nameB1=this.navParams.data.Team2.Players[0]['Name'];
				this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
				this.Firstserve.ServingTeamActivePlayerSide="Right";
				this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
				this.Firstserve.ReseivingTeamActivePlayerSide="Right";
			}
			this.Firstserve.Team2Active=true;
			this.Firstserve.Team1Active=false;
			this.TeamAScore=this.scoresobj.Team2;
			this.TeamBScore=this.scoresobj.Team1;
		}
		this.scoresobj.Team1.SetOneTimeOuts[0].Status=true;
		this.scoresobj.Team2.SetOneTimeOuts[0].Status=true;
		this.scoresobj.Team1.SetOneScores[0].clicked=true;
		this.scoresobj.Team1.SetOneScores[0].Status=true;
		this.scoresobj.Team2.SetOneScores[0].clicked=true;
		this.scoresobj.Team2.SetOneScores[0].Status=true;
		this.scoresobj.Team1.SetOneScores[1].Status=true;
		this.scoresobj.Team2.SetOneScores[1].Status=true;
		this.scoresobj.Team1.SetOneScores[0].ServicesDowen=true;
		this.scoresobj.Team2.SetOneScores[0].ServicesDowen=true;
		this.navParams.data.TeamsWithServeDetails=this.Firstserve;
		
		//scoreboard update function.
		this.scoreboardeupdate();

		this.MatchStartToEndTime();
		this.Firstserve.Team1TimeOutobj=null;
		this.Firstserve.Team2TimeOutobj=null;
	}
	//scoreboard update services.
	scoreboardeupdate(){
		this.service.RefereeScoreBoardUpdate(this.navParams.data._id,this.navParams.data).subscribe(response => {
        	},err =>{
        });
	}	

	//function for TeampositionChangein refaree.
	TeampositionChange(){
		if(this.Firstserve.Team1Side==="Left"){
			this.Firstserve.Team1Side="Right";
			this.Firstserve.Team2Side="Left";
		}else{
			this.Firstserve.Team1Side="Left";
			this.Firstserve.Team2Side="Right";
		}
		
	}

  	// function for TeamB Select First Serve Player Name.
	TeamASelectFirstServePlayerName(myvalue){
		this.Firstserve.teamAserve=true;
		if(myvalue === 0){
			this.navParams.data.Team1.Players[0].Served = true;
			this.navParams.data.Team1.Players[1].Served = false;
		}else{
			this.navParams.data.Team1.Players[1].Served = true;
			this.navParams.data.Team1.Players[0].Served = false;
		}
		if(this.Firstserve.teamBserve !=undefined && this.Firstserve.GameStart===undefined){
			this.scoresobj.Team1.SetoneActive=true;
  			this.scoresobj.Team2.SetoneActive=true;
		 }
		 
	}

	// function for TeamB Select First Serve Player Name.
	TeamBSelectFirstServePlayerName(myvalue){
		this.Firstserve.teamBserve=true;
		if(myvalue === 0){
			this.navParams.data.Team2.Players[0].Served = true;
			this.navParams.data.Team2.Players[1].Served = false;
		}else{
			this.navParams.data.Team2.Players[1].Served = true;
			this.navParams.data.Team2.Players[0].Served = false;
		}

		if(this.Firstserve.teamAserve !=undefined && this.Firstserve.GameStart===undefined){
			this.scoresobj.Team1.SetoneActive=true;
  			this.scoresobj.Team2.SetoneActive=true;
		}
	}
	



  	//function for inter change the score board.
  	SideOut(){
  		
		if(this.Firstserve.Team1Active===true){
			this.Firstserve.serveChangeUndo=false;
  			if(this.Firstserve.Team1.TeamAPoints%2===0){
				if(this.navParams.data.Event === "Doubles"){
					this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
					this.Firstserve.ReseivingTeamPlayerName=this.Firstserve.Team1.nameA2;
					this.Firstserve.ReseivingTeamActivePlayerSide="Right";
				}  
  				
  			}else{
				  if(this.navParams.data.Event === "Doubles"){
						this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team1.nameA2;
						this.Firstserve.ReseivingTeamPlayerName=this.Firstserve.Team1.nameA1;
						this.Firstserve.ReseivingTeamActivePlayerSide="Right";
				  }
  			}

  			if(this.Firstserve.Team2.TeamBPoints%2===0){
				  if(this.navParams.data.Event === "Doubles"){
						this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
						this.Firstserve.ServingTeamActivePlayerSide="Right";
						this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team2.nameB2;
						this.Firstserve.ServingTeamPlayerSide="Left";
						this.Firstserve.Team2.TeamBServeCount=1;
						this.Firstserve.ServingTeamActiveTeamname="B1";
				  }else{
					 	this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
						this.Firstserve.ServingTeamActivePlayerSide="Right"; 
						this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
						this.Firstserve.ReseivingTeamActivePlayerSide="Right";
				  }
	  		}else{
				  if(this.navParams.data.Event === "Doubles"){
						this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB2;
						this.Firstserve.ServingTeamActivePlayerSide="Right";
						this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team2.nameB1;
						this.Firstserve.ServingTeamPlayerSide="Left";
						this.Firstserve.Team2.TeamBServeCount=1;
						this.Firstserve.ServingTeamActiveTeamname="B2";
				  }else{
					  	this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
						this.Firstserve.ServingTeamActivePlayerSide="Left"; 
						this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
						this.Firstserve.ReseivingTeamActivePlayerSide="Left";
				  }
	  		}
		}else if(this.Firstserve.Team2Active===true){
			this.Firstserve.serveChangeUndo=false;
  			if(this.Firstserve.Team2.TeamBPoints%2===0){
				 if(this.navParams.data.Event === "Doubles"){
						this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
						this.Firstserve.ReseivingTeamPlayerName=this.Firstserve.Team2.nameB2;
						this.Firstserve.ReseivingTeamActivePlayerSide="Right";
				 }
  			}else{
				  if(this.navParams.data.Event === "Doubles"){
						this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team2.nameB2;
						this.Firstserve.ReseivingTeamPlayerName=this.Firstserve.Team2.nameB1;
						this.Firstserve.ReseivingTeamActivePlayerSide="Right";
				  }
  			}
  			if(this.Firstserve.Team1.TeamAPoints%2===0){
				if(this.navParams.data.Event === "Doubles"){
					this.Firstserve.Team1.TeamAServeCount=1;
					this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
					this.Firstserve.ServingTeamActivePlayerSide="Right";
					this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team1.nameA2;
					this.Firstserve.ServingTeamPlayerSide="Left";
					this.Firstserve.ServingTeamActiveTeamname="A1";
				}else{
					this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
					this.Firstserve.ServingTeamActivePlayerSide="Right";
					this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
					this.Firstserve.ReseivingTeamActivePlayerSide="Right";
				}
	  		}else{
				if(this.navParams.data.Event === "Doubles"){
					this.Firstserve.Team1.TeamAServeCount=1;
					this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA2;
					this.Firstserve.ServingTeamActivePlayerSide="Right";
					this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team1.nameA1;
					this.Firstserve.ServingTeamPlayerSide="Left";
					this.Firstserve.ServingTeamActiveTeamname="A2";
				}else{
					this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
					this.Firstserve.ServingTeamActivePlayerSide="Left";
					this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
					this.Firstserve.ReseivingTeamActivePlayerSide="Left";
				}
	  		}	
  		}

		  if(this.Firstserve.Team1TimeOutobj !=null){
			  let obj=this.Firstserve.Team1TimeOutobj;
			  this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=false;
			  this.Firstserve.Team1TimeOutobj =null;
		  }else if(this.Firstserve.Team2TimeOutobj !=null){
			  let obj=this.Firstserve.Team2TimeOutobj;
			  this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=false;
			  this.Firstserve.Team2TimeOutobj =null;
		  }

  		if(this.Firstserve.Team1Active && this.navParams.data.GameStatus===1){
  			if(this.Firstserve.Team1.TeamAPoints!=0){
  				this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.Team1.TeamAPoints].Point=false;
  				this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.Team1.TeamAPoints]['ServicesDowen'] = true;
  				this.CurentScore=this.Firstserve.Team2.TeamBPoints;
  			}
  		}else if(this.Firstserve.Team2Active && this.navParams.data.GameStatus===1){
  			if(this.Firstserve.Team2.TeamBPoints!=0){
  				this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.Team2.TeamBPoints].Point=false;
  				this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.Team2.TeamBPoints]['ServicesDowen'] = true;
  				this.CurentScore=this.Firstserve.Team1.TeamAPoints;
  			}
  		}
		  
  		if(this.navParams.data.Event==="Singles"){
  			if(this.navParams.data.GameStatus===1){
	  			this.Firstserve.SideOutButtonActive = true;
	  			this.Firstserve.Team1Active = !this.Firstserve.Team1Active;
	  			this.Firstserve.Team2Active = !this.Firstserve.Team2Active;
  			}
  		}else{
  			if(this.Firstserve.Team1Active && this.navParams.data.GameStatus===1){
	  			this.Firstserve.Team2.TeamBServeCount=1;
	  		}else if(this.navParams.data.GameStatus===1){
	  			this.Firstserve.Team1.TeamAServeCount=1;
	  		}
	  		if(this.Firstserve.Team1Active===true || this.Firstserve.Team2Active===true ){
				if(this.navParams.data.GameStatus===1){
					this.Firstserve.SideOutButtonActive = !this.Firstserve.SideOutButtonActive;
				}
	  			
	  			this.Firstserve.Team1Active = !this.Firstserve.Team1Active;
	  			this.Firstserve.Team2Active = !this.Firstserve.Team2Active;
	  		}
  		}

  		
		if(this.TeamAScore.Team === 'Team1'){
  			this.TeamAScore=this.scoresobj.Team2;
  			this.TeamBScore=this.scoresobj.Team1;
		}else{
			this.TeamAScore=this.scoresobj.Team1;
			this.TeamBScore=this.scoresobj.Team2;
		}
		//scoreboard update function.
		this.scoreboardeupdate();
	}

  	//function for UpdateScore.
  	UpdateScore(score){

  		if(this.Firstserve.ServingTeamActivePlayerSide==="Right"){
			if(this.navParams.data.Event==="Doubles"){
				this.Firstserve.ServingTeamActivePlayerSide="Left"
				this.Firstserve.ServingTeamPlayerSide="Right";
				this.Firstserve.serveChangeUndo=false;
			}else{
				this.Firstserve.ServingTeamActivePlayerSide="Left"
				this.Firstserve.ReseivingTeamActivePlayerSide="Left";
			}
  		}else if(this.Firstserve.ServingTeamActivePlayerSide==="Left"){
			if(this.navParams.data.Event==="Doubles"){
				this.Firstserve.ServingTeamActivePlayerSide="Right";
				this.Firstserve.ServingTeamPlayerSide="Left";
				this.Firstserve.serveChangeUndo=false;
			}else{
				this.Firstserve.ServingTeamActivePlayerSide="Right";
				this.Firstserve.ReseivingTeamActivePlayerSide="Right";
			}
  		}
  		if(this.Firstserve.Team1Active){
			this.Firstserve.Team1.TeamAPoints=this.Firstserve.Team1.TeamAPoints+1;
			if(this.Firstserve.Team1TimeOutobj !=null){
				let obj=this.Firstserve.Team1TimeOutobj;
				let timervalue=this.Firstserve.Team1.TeamAPoints-obj.timeronpoint;
				if(timervalue===2){
					this.Firstserve.Team1TimeOutobj=null;
				}else{
					this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=false;
				}
		  	}
			if(this.Firstserve.Team2TimeOutobj !=null){
				let obj=this.Firstserve.Team2TimeOutobj;
				let timervalue=this.Firstserve.Team1.TeamAPoints-obj.timeronpoint;
				if(timervalue===2){
					this.Firstserve.Team2TimeOutobj=null;
				}else{
					this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=false;
				}
		  	}
  		}else{
			this.Firstserve.Team2.TeamBPoints=this.Firstserve.Team2.TeamBPoints+1;
			if(this.Firstserve.Team2TimeOutobj !=null){
				let obj=this.Firstserve.Team2TimeOutobj;
				let timervalue=this.Firstserve.Team2.TeamBPoints-obj.timeronpoint;
				if(timervalue===2){
					this.Firstserve.Team2TimeOutobj=null;
				}else{
					this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=false;
				}
		  	}
			if(this.Firstserve.Team1TimeOutobj !=null){
				let obj=this.Firstserve.Team1TimeOutobj;
				let timervalue=this.Firstserve.Team2.TeamBPoints-obj.timeronpoint;
				if(timervalue===2){
					this.Firstserve.Team1TimeOutobj=null;
				}else{
					this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=false;
				}
		  	}
  		}
		


  		let team = score.Team;
  		this.Firstserve.SetType= score.set;
  		let myscore =score.Score;
  		myscore=myscore;
		 if(this.scoresobj[team][this.Firstserve.SetType].length >myscore){
			this.scoresobj[team][this.Firstserve.SetType][myscore-1].Point=false;
			this.scoresobj[team][this.Firstserve.SetType][myscore].Point=true;
		}

  		if(this.scoresobj.FormateName==="1 To 15 Win By 2" && this.Firstserve.CourtChange===false){
			if(this.Firstserve.Team1.TeamAPoints>this.Firstserve.Team2.TeamBPoints && this.Firstserve.Team1.TeamAPoints === 8 ){
				this.Firstserve.CourtChange=true;
			 	let prompt = this.alertCtrl.create({
			      title: 'Players Change Sides',
			      	message: "Please change the Players side",
			      	buttons: [
			        	{
			          text: 'ok',
			          handler: data => {
			          }
			        }
			      ]
			    });
			    prompt.present();
			}else if(this.Firstserve.Team2.TeamBPoints>this.Firstserve.Team1.TeamAPoints && this.Firstserve.Team2.TeamBPoints === 8){
				this.Firstserve.CourtChange=true;
				let prompt = this.alertCtrl.create({
			      	title: 'Players Change Sides',
			      	message: "Please change the Players side",
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
		}else if(this.scoresobj.FormateName==="2 Of 3 To 11 Win By 2" && this.Firstserve.CourtChange===false && this.scoresobj[team][this.Firstserve.SetType][myscore].set==="SetThreeScores"){
			if(this.Firstserve.Team1.TeamAPoints>this.Firstserve.Team2.TeamBPoints && this.Firstserve.Team1.TeamAPoints === 6 ){
				this.Firstserve.CourtChange=true;
			 	let prompt = this.alertCtrl.create({
			      	title: 'Players Change Sides',
			      	message: "Please change the Players side",
			      	buttons: [
			        	{
			          text: 'ok',
			          handler: data => {
			          }
			        }
			      ]
			    });
			    prompt.present();
			}else if(this.Firstserve.Team2.TeamBPoints>this.Firstserve.Team1.TeamAPoints && this.Firstserve.Team2.TeamBPoints === 6){
				this.Firstserve.CourtChange=true;
				let prompt = this.alertCtrl.create({
					title: 'Players Change Sides',
			      	message: "Please change the Players side",
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
		}else if(this.scoresobj.FormateName==="1 To 21 Win By 2" && this.Firstserve.CourtChange===false){
			if(this.Firstserve.Team1.TeamAPoints>this.Firstserve.Team2.TeamBPoints && this.Firstserve.Team1.TeamAPoints === 11){
				this.Firstserve.CourtChange=true;
			 	let prompt = this.alertCtrl.create({
			      	title: 'Players Change Sides',
			      	message: "Please change the Players side",
			      	buttons: [
			        	{
			          text: 'ok',
			          handler: data => {
			          }
			        }
			      ]
			    });
			    prompt.present();
			}else if(this.Firstserve.Team2.TeamBPoints>this.Firstserve.Team1.TeamAPoints && this.Firstserve.Team2.TeamBPoints === 11){
				this.Firstserve.CourtChange=true;
				let prompt = this.alertCtrl.create({
			      	title: 'Players Change Sides',
			      	message: "Please change the Players side",
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
  		this.scoresobj[team][this.Firstserve.SetType][myscore].clicked = true;
  		myscore=myscore+1;

  		if(this.scoresobj[team][this.Firstserve.SetType].length >myscore){
  			if(this.Firstserve.Team1Active && this.navParams.data.Event==="Doubles"){
	  			this.Firstserve.Team2.TeamBServeCount=1;
	  		}else if(this.Firstserve.Team2Active && this.navParams.data.Event==="Doubles"){
	  			this.Firstserve.Team1.TeamAServeCount=1;
	  		}
	  		this.scoresobj[team][this.Firstserve.SetType][myscore].Status = true;
			if(this.scoresobj.FormateName ==="2 Of 3 To 11 Win By 2"){
				if(this.Firstserve.Team2.TeamBPoints>this.Firstserve.Team1.TeamAPoints && this.Firstserve.Team2.TeamBPoints-this.Firstserve.Team1.TeamAPoints >= 2 && this.Firstserve.Team2.TeamBPoints>=11){
					this.WinneingSets2of3();
				}else if(this.Firstserve.Team1.TeamAPoints>this.Firstserve.Team2.TeamBPoints && this.Firstserve.Team1.TeamAPoints-this.Firstserve.Team2.TeamBPoints >= 2 && this.Firstserve.Team1.TeamAPoints>=11){
					this.WinneingSets2of3();
				}else if(this.Firstserve.maxValue === myscore-1){ 
					this.ScoreboardExpand()
				}
			}else if(this.scoresobj.FormateName==="1 To 15 Win By 2"){
				if(this.Firstserve.Team2.TeamBPoints>this.Firstserve.Team1.TeamAPoints && this.Firstserve.Team2.TeamBPoints-this.Firstserve.Team1.TeamAPoints >= 2 && this.Firstserve.Team2.TeamBPoints>=15){
					this.scoresobj[team][this.Firstserve.SetType][myscore].Status =false;
					this.WinningGame1to15and1to21();
				}else if(this.Firstserve.Team1.TeamAPoints>this.Firstserve.Team2.TeamBPoints && this.Firstserve.Team1.TeamAPoints-this.Firstserve.Team2.TeamBPoints >= 2 && this.Firstserve.Team1.TeamAPoints>=15){
					this.scoresobj[team][this.Firstserve.SetType][myscore].Status =false;
					this.WinningGame1to15and1to21();
				}else if(this.Firstserve.maxValue === myscore-1){ 
					this.ScoreboardExpand()
				}
				
			}else if(this.scoresobj.FormateName==="1 To 21 Win By 2"){
				if(this.Firstserve.Team2.TeamBPoints>this.Firstserve.Team1.TeamAPoints && this.Firstserve.Team2.TeamBPoints-this.Firstserve.Team1.TeamAPoints >= 2 && this.Firstserve.Team2.TeamBPoints>=21){
					this.scoresobj[team][this.Firstserve.SetType][myscore].Status =false;
					this.WinningGame1to15and1to21();
				}else if(this.Firstserve.Team1.TeamAPoints>this.Firstserve.Team2.TeamBPoints && this.Firstserve.Team1.TeamAPoints-this.Firstserve.Team2.TeamBPoints >= 2 && this.Firstserve.Team1.TeamAPoints>=21){
					this.scoresobj[team][this.Firstserve.SetType][myscore].Status =false;
					this.WinningGame1to15and1to21();
				}else if(this.Firstserve.maxValue === myscore-1){ 
					this.ScoreboardExpand()
				}
			}
  		}
		  //scoreboard update function.
			this.scoreboardeupdate();
  		
	}


	//function for scoreBoard expand.
	ScoreboardExpand(){
			this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.maxValue+1].Hide=false;
			this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.maxValue+2].Hide=false;
			this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.maxValue+3].Hide=false;
			this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.maxValue+4].Hide=false;
			this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.maxValue+5].Hide=false;

			this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.maxValue+1].Hide=false;
			this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.maxValue+2].Hide=false;
			this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.maxValue+3].Hide=false;
			this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.maxValue+4].Hide=false;
			this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.maxValue+5].Hide=false;

			this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.minValue].Hide=true;
			this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.minValue+1].Hide=true;
			this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.minValue+2].Hide=true;
			this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.minValue+3].Hide=true;
			this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.minValue+4].Hide=true;

			this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.minValue].Hide=true;
			this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.minValue+1].Hide=true;
			this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.minValue+2].Hide=true;
			this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.minValue+3].Hide=true;
			this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.minValue+4].Hide=true;
			
			if(this.Firstserve.maxValue===11 || this.Firstserve.maxValue===15 || this.Firstserve.maxValue===21){
				if(this.Firstserve.maxValue===11){
					this.Firstserve.OldmaxValue=11;		
				}else if(this.Firstserve.maxValue===15){
					this.Firstserve.OldmaxValue=15;	
				}else if(this.Firstserve.maxValue===21){
					this.Firstserve.OldmaxValue=21
				}	
			}else{
				this.Firstserve.OldmaxValue=this.Firstserve.OldmaxValue+5;
			}
			this.Firstserve.maxValue=this.Firstserve.maxValue+5;
			this.Firstserve.minValue=this.Firstserve.minValue+5;
	}

	//function for winning 1to 15 and 1to 21 formate.
	WinningGame1to15and1to21(){
		this.navParams.data.GameStatus=2;
		if(this.Firstserve.Team1Active){
						this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.Team1.TeamAPoints].Point=false;
						this.scoresobj.Team1.SetOneTimeOuts[0].Status=false;
						this.scoresobj.Team1.SetOneTimeOuts[1].Status=false;
						this.scoresobj.Team2.SetOneTimeOuts[0].Status=false;
						this.scoresobj.Team2.SetOneTimeOuts[1].Status=false;
						this.scoresobj.Team1.SetOneTimeOuts[0].ClickedTime=false;
						this.scoresobj.Team1.SetOneTimeOuts[1].ClickedTime=false;
						this.scoresobj.Team2.SetOneTimeOuts[0].ClickedTime=false;
						this.scoresobj.Team2.SetOneTimeOuts[1].ClickedTime=false;
						if(this.scoresobj.Team2.SetOneTimeOuts[2]!=undefined){
							this.scoresobj.Team2.SetOneTimeOuts[2].Status=false;
							this.scoresobj.Team2.SetOneTimeOuts[2].ClickedTime=false;
							this.scoresobj.Team1.SetOneTimeOuts[2].Status=false;
							this.scoresobj.Team1.SetOneTimeOuts[2].ClickedTime=false;
						}
  						let winnersobj:any={};
  						winnersobj.winnerteam="team1";
  						winnersobj.Team1score=this.Firstserve.Team1.TeamAPoints;
  						winnersobj.Team2score=this.Firstserve.Team2.TeamBPoints;
  						this.Firstserve.Winner=winnersobj;
  						this.Firstserve.SideOutButtonActive = false;
  						this.Firstserve.Matchcomplete=true;
				}else{
						this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.Team2.TeamBPoints].Point=false;
						this.scoresobj.Team1.SetOneTimeOuts[0].Status=false;
						this.scoresobj.Team1.SetOneTimeOuts[1].Status=false;
						this.scoresobj.Team2.SetOneTimeOuts[0].Status=false;
						this.scoresobj.Team2.SetOneTimeOuts[1].Status=false;
						this.scoresobj.Team1.SetOneTimeOuts[0].ClickedTime=false;
						this.scoresobj.Team1.SetOneTimeOuts[1].ClickedTime=false;
						this.scoresobj.Team2.SetOneTimeOuts[0].ClickedTime=false;
						this.scoresobj.Team2.SetOneTimeOuts[1].ClickedTime=false;
						if(this.scoresobj.Team2.SetOneTimeOuts[2]!=undefined){
							this.scoresobj.Team2.SetOneTimeOuts[2].Status=false;
							this.scoresobj.Team2.SetOneTimeOuts[2].ClickedTime=false;
							this.scoresobj.Team1.SetOneTimeOuts[2].Status=false;
							this.scoresobj.Team1.SetOneTimeOuts[2].ClickedTime=false;
						}
  						let winnersobj:any={};
  						winnersobj.winnerteam="team2";
  						winnersobj.Team1score=this.Firstserve.Team1.TeamAPoints;
  						winnersobj.Team2score=this.Firstserve.Team2.TeamBPoints;
  						this.Firstserve.Winner=winnersobj;
  						this.Firstserve.SideOutButtonActive = false;
  						this.Firstserve.Matchcomplete=true;
				}
	}


	//Winning game format 2 of 3 sets.
	WinneingSets2of3(){
			let score=this.Firstserve.Team2.TeamBPoints+1;
			let score1=this.Firstserve.Team1.TeamAPoints+1;
			this.scoresobj.Team2[this.Firstserve.SetType][score].Status=false;
			this.scoresobj.Team1[this.Firstserve.SetType][score1].Status=false;
			this.Firstserve.Team1TimeOutobj=null;
			this.Firstserve.Team2TimeOutobj=null;
		if(this.Firstserve.Team1Active){
      this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.Team1.TeamAPoints].Point=false;
			this.Firstserve.CourtChange=false;
			if(this.scoresobj.Team1[this.Firstserve.SetType][0].set==="SetOneScores"){
				
				this.scoresobj.Team2.SetOneTimeOuts[0].Status=false;
				this.scoresobj.Team1.SetOneTimeOuts[0].Status=false;
				this.scoresobj.Team2.SetOneTimeOuts[1].Status=false;
				this.scoresobj.Team1.SetOneTimeOuts[1].Status=false;
				this.scoresobj.Team1.SetOneTimeOuts[0].ClickedTime=false;
					this.scoresobj.Team1.SetOneTimeOuts[1].ClickedTime=false;
					this.scoresobj.Team2.SetOneTimeOuts[0].ClickedTime=false;
					this.scoresobj.Team2.SetOneTimeOuts[1].ClickedTime=false;

					let teama:any=[];
					let winnersobj:any={};
					winnersobj.winnerteam="team1";
					winnersobj.Team1score=this.Firstserve.Team1.TeamAPoints;
					winnersobj.Team2score=this.Firstserve.Team2.TeamBPoints;
					teama.push(winnersobj);
					this.Firstserve.winnerTeam=teama;
					this.Firstserve.FirsteSetWinner="Team1";
					let prompt = this.alertCtrl.create({
						title: 'Players Change Sides',
						message: "Please change the Players side",
						buttons: [
								{
							text: 'ok',
							handler: data => {
								this.TimerStart("CourtChange");
							}
							}
						]
						});
						prompt.present();
					
					

				}else if(this.scoresobj.Team1[this.Firstserve.SetType][0].set==="SetTwoScores"){
					this.Firstserve.CourtChange=false;
					this.scoresobj.Team2.SetTwoTimeOuts[0].Status=false;
					this.scoresobj.Team1.SetTwoTimeOuts[0].Status=false;
					this.scoresobj.Team2.SetTwoTimeOuts[1].Status=false;
					this.scoresobj.Team1.SetTwoTimeOuts[1].Status=false;

					this.scoresobj.Team1.SetTwoTimeOuts[0].ClickedTime=false;
					this.scoresobj.Team1.SetTwoTimeOuts[1].ClickedTime=false;
					this.scoresobj.Team2.SetTwoTimeOuts[0].ClickedTime=false;
					this.scoresobj.Team2.SetTwoTimeOuts[1].ClickedTime=false;
					let winnersobj:any={};
					winnersobj.winnerteam="team1";
					winnersobj.Team1score=this.Firstserve.Team1.TeamAPoints;
					winnersobj.Team2score=this.Firstserve.Team2.TeamBPoints;
					this.Firstserve.winnerTeam.push(winnersobj);
					this.Firstserve.SecondSetWinner= "Team1";
					if(this.Firstserve.FirsteSetWinner == "Team1" && this.Firstserve.SecondSetWinner == "Team1"){
						this.navParams.data.GameStatus=2;
						this.Firstserve.Gamecomplete=true;
						this.Firstserve.SideOutButtonActive = false;
						this.Firstserve.Matchcomplete=true;
						this.Firstserve.WinningTeam="Team1";
					}else{
						let prompt = this.alertCtrl.create({
						title: 'Players Change Sides',
						message: "Please change the Players side",
						buttons: [
								{
							text: 'ok',
							handler: data => {
								this.TimerStart("CourtChange");
							}
							}
						]
						});
						prompt.present();
					}
					
				}else if(this.scoresobj.Team1[this.Firstserve.SetType][0].set==="SetThreeScores"){
					this.scoresobj.Team1.SetThreeTimeOuts[0].Status=false;
					this.scoresobj.Team1.SetThreeTimeOuts[1].Status=false;
					this.scoresobj.Team2.SetThreeTimeOuts[0].Status=false;
					this.scoresobj.Team2.SetThreeTimeOuts[1].Status=false;

					this.scoresobj.Team1.SetThreeTimeOuts[0].ClickedTime=false;
					this.scoresobj.Team1.SetThreeTimeOuts[1].ClickedTime=false;
					this.scoresobj.Team2.SetThreeTimeOuts[0].ClickedTime=false;
					this.scoresobj.Team2.SetThreeTimeOuts[1].ClickedTime=false;
					this.Firstserve.SideOutButtonActive = false;
					let winnersobj:any={};
					this.navParams.data.GameStatus=2;
					winnersobj.winnerteam="team1";
					winnersobj.Team1score=this.Firstserve.Team1.TeamAPoints;
					winnersobj.Team2score=this.Firstserve.Team2.TeamBPoints;
					this.Firstserve.winnerTeam.push(winnersobj);
					this.Firstserve.SetThreeScores="Team1";
					this.Firstserve.Gamecomplete=true;
					this.Firstserve.Matchcomplete=true;
					this.Firstserve.WinningTeam="Team1";
				}
					
		}else{
      this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.Team2.TeamBPoints].Point=false;
			if(this.scoresobj.Team2[this.Firstserve.SetType][0].set==="SetOneScores"){
				this.Firstserve.CourtChange=false;
				this.scoresobj.Team2.SetOneTimeOuts[0].Status=false;
				this.scoresobj.Team1.SetOneTimeOuts[0].Status=false;
				this.scoresobj.Team2.SetOneTimeOuts[1].Status=false;
				this.scoresobj.Team1.SetOneTimeOuts[1].Status=false;
				this.scoresobj.Team1.SetOneTimeOuts[0].ClickedTime=false;
				this.scoresobj.Team1.SetOneTimeOuts[1].ClickedTime=false;
				this.scoresobj.Team2.SetOneTimeOuts[0].ClickedTime=false;
				this.scoresobj.Team2.SetOneTimeOuts[1].ClickedTime=false;
				
				let teama:any=[];
				let winnersobj:any={};
				winnersobj.winnerteam="team2";
				winnersobj.Team1score=this.Firstserve.Team1.TeamAPoints;
				winnersobj.Team2score=this.Firstserve.Team2.TeamBPoints;
				teama.push(winnersobj);
				this.Firstserve.winnerTeam=teama;
				this.Firstserve.FirsteSetWinner="Team2";

				let prompt = this.alertCtrl.create({
				title: 'Players Change Sides',
				message: "Please change the Players side",
				buttons: [
						{
					text: 'ok',
					handler: data => {
						this.TimerStart("CourtChange");
					}
					}
				]
				});
				prompt.present();
				
			}else if(this.scoresobj.Team2[this.Firstserve.SetType][0].set==="SetTwoScores"){
				this.Firstserve.CourtChange=false;
				this.scoresobj.Team2.SetTwoTimeOuts[0].Status=false;
				this.scoresobj.Team1.SetTwoTimeOuts[0].Status=false;
				this.scoresobj.Team2.SetTwoTimeOuts[1].Status=false;
				this.scoresobj.Team1.SetTwoTimeOuts[1].Status=false;
				this.scoresobj.Team1.SetTwoTimeOuts[0].ClickedTime=false;
				this.scoresobj.Team1.SetTwoTimeOuts[1].ClickedTime=false;
				this.scoresobj.Team2.SetTwoTimeOuts[0].ClickedTime=false;
				this.scoresobj.Team2.SetTwoTimeOuts[1].ClickedTime=false;

				let winnersobj:any={};
				winnersobj.winnerteam="team2";
				winnersobj.Team1score=this.Firstserve.Team1.TeamAPoints;
				winnersobj.Team2score=this.Firstserve.Team2.TeamBPoints;
				this.Firstserve.winnerTeam.push(winnersobj);
				this.Firstserve.SecondSetWinner="Team2";

				if(this.Firstserve.FirsteSetWinner === "Team2" && this.Firstserve.SecondSetWinner === "Team2"){
					this.navParams.data.GameStatus=2;
					this.Firstserve.Gamecomplete=true;
					this.Firstserve.SideOutButtonActive = false;
					this.Firstserve.Matchcomplete=true;
					this.Firstserve.WinningTeam="Team2";
				}else{
					let prompt = this.alertCtrl.create({
					title: 'Players Change Sides',
					message: "Please change the Players side",
					buttons: [
							{
						text: 'ok',
						handler: data => {
							this.TimerStart("CourtChange");
						}
						}
					]
					});
					prompt.present();
				}
			}else if(this.scoresobj.Team2[this.Firstserve.SetType][0].set==="SetThreeScores"){
				this.scoresobj.Team1.SetThreeTimeOuts[0].Status=false;
				this.scoresobj.Team1.SetThreeTimeOuts[1].Status=false;
				this.scoresobj.Team2.SetThreeTimeOuts[0].Status=false;
				this.scoresobj.Team2.SetThreeTimeOuts[1].Status=false;
				this.scoresobj.Team1.SetThreeScores[0].ClickedTime=false;
				this.scoresobj.Team1.SetThreeScores[1].ClickedTime=false;
				this.scoresobj.Team2.SetThreeScores[0].ClickedTime=false;
				this.scoresobj.Team2.SetThreeScores[1].ClickedTime=false;
				this.navParams.data.GameStatus=2;
				let winnersobj:any={};
				winnersobj.winnerteam="team2";
				this.Firstserve.SideOutButtonActive = false;
				winnersobj.Team1score=this.Firstserve.Team1.TeamAPoints;
				winnersobj.Team2score=this.Firstserve.Team2.TeamBPoints;
				this.Firstserve.winnerTeam.push(winnersobj);
				this.Firstserve.SetThreeScores="Team2";
				this.Firstserve.WinningTeam="Team2";
				this.Firstserve.Gamecomplete=true;
				this.Firstserve.Matchcomplete=true;
			}
		}
	}
	//function for 11 th formate Winning Game Time Out.
	WinneingGame11formate(){
		if(this.Firstserve.Team1Active){
			if(this.scoresobj.Team1[this.Firstserve.SetType][0].set==="SetOneScores"){
				this.scoresobj.Team2.SetTwoTimeOuts[0].Status=true;
				this.scoresobj.Team1.SetTwoTimeOuts[0].Status=true;
				this.scoresobj.Team1.SetTwoScores[0].Status=true;
				this.scoresobj.Team2.SetTwoScores[0].Status=true;
				this.scoresobj.Team1.SetTwoScores[0].clicked=true;
				this.scoresobj.Team2.SetTwoScores[0].clicked=true;
				this.scoresobj.Team1.SetTwoScores[1].Status=true;
				this.scoresobj.Team2.SetTwoScores[1].Status=true;
				this.scoresobj.Team1.SetOneScores[0].Status=false;
				this.scoresobj.Team1.SetTwoScores[0].ServicesDowen=true;
				this.scoresobj.Team2.SetTwoScores[0].ServicesDowen=true;
				this.Firstserve.Team1.TeamAPoints=0;
				this.Firstserve.Team2.TeamBPoints=0;
				this.CurentScore=this.Firstserve.Team1.TeamAPoints;
				this.Firstserve.minValue=0;
				this.Firstserve.maxValue=11;
				if(this.scoresobj.Team1.SetOneServe===true){
					this.SideOut();
					if(this.navParams.data.Event==="Doubles"){
						this.Firstserve.Team2.TeamBServeCount=2;
						this.Firstserve.SideOutButtonActive = true;
					}
				}else{
					if(this.navParams.data.Event==="Doubles"){
						this.Firstserve.Team1.TeamAServeCount=2;
						this.Firstserve.SideOutButtonActive = true;
						this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
						this.Firstserve.ServingTeamActivePlayerSide="Right";
						this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team1.nameA2;
						this.Firstserve.ServingTeamPlayerSide="Left";
						this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.nameB1;
						this.Firstserve.ReseivingTeamPlayerName=this.Firstserve.nameB2;
						this.Firstserve.ReseivingTeamActivePlayerSide="Right";
					}else{
						this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
						this.Firstserve.ServingTeamActivePlayerSide="Right";
						this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
						this.Firstserve.ReseivingTeamActivePlayerSide="Right";
					}
				}
			}else if(this.scoresobj.Team1[this.Firstserve.SetType][0].set==="SetTwoScores"){
					this.scoresobj.Team2.SetThreeTimeOuts[0].Status=true;
					this.scoresobj.Team1.SetThreeTimeOuts[0].Status=true;
					this.scoresobj.Team1.SetThreeScores[0].Status=true;
					this.scoresobj.Team2.SetThreeScores[0].Status=true;
					this.scoresobj.Team1.SetThreeScores[0].clicked=true;
					this.scoresobj.Team2.SetThreeScores[0].clicked=true;
					this.scoresobj.Team1.SetThreeScores[1].Status=true;
					this.scoresobj.Team2.SetThreeScores[1].Status=true;
					this.scoresobj.Team1.SetThreeScores[0].ServicesDowen=true;
					this.scoresobj.Team2.SetThreeScores[0].ServicesDowen=true;
					this.Firstserve.Team1.TeamAPoints=0;
					this.Firstserve.Team2.TeamBPoints=0;
					this.CurentScore=this.Firstserve.Team2.TeamBPoints;
					this.Firstserve.minValue=0;
					this.Firstserve.maxValue=11;

					if(this.scoresobj.Team1.SetTwoServe===true){
						this.SideOut();
						if(this.navParams.data.Event==="Doubles"){
							this.Firstserve.Team2.TeamBServeCount=2;
							this.Firstserve.SideOutButtonActive = true;
						}
					}else{
						if(this.navParams.data.Event==="Doubles"){
							this.Firstserve.SideOutButtonActive = true;
							this.Firstserve.Team1.TeamAServeCount=2;
							this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
							this.Firstserve.ServingTeamActivePlayerSide="Right";
							this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team1.nameA2;
							this.Firstserve.ServingTeamPlayerSide="Left";
							this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.nameB1;
							this.Firstserve.ReseivingTeamPlayerName=this.Firstserve.nameB2;
							this.Firstserve.ReseivingTeamActivePlayerSide="Right";
						}else{
							this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
							this.Firstserve.ServingTeamActivePlayerSide="Right";
							this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
							this.Firstserve.ReseivingTeamActivePlayerSide="Right";
						}
					}

			}
		}else{
			if(this.scoresobj.Team2[this.Firstserve.SetType][0].set==="SetOneScores"){
				this.scoresobj.Team2.SetTwoTimeOuts[0].Status=true;
				this.scoresobj.Team1.SetTwoTimeOuts[0].Status=true;
				this.scoresobj.Team1.SetTwoScores[0].Status=true;
				this.scoresobj.Team2.SetTwoScores[0].Status=true;
				this.scoresobj.Team1.SetTwoScores[0].clicked=true;
				this.scoresobj.Team2.SetTwoScores[0].clicked=true;
				this.scoresobj.Team1.SetTwoScores[1].Status=true;
				this.scoresobj.Team2.SetTwoScores[1].Status=true;
				this.scoresobj.Team1.SetOneScores[0].Status=false;
				this.scoresobj.Team1.SetTwoScores[0].ServicesDowen=true;
				this.scoresobj.Team2.SetTwoScores[0].ServicesDowen=true;
				this.Firstserve.Team1.TeamAPoints=0;
				this.Firstserve.Team2.TeamBPoints=0;
				this.CurentScore=this.Firstserve.Team1.TeamAPoints;
				this.Firstserve.minValue=0;
				this.Firstserve.maxValue=11;
				if(this.scoresobj.Team2.SetOneServe===true){
					this.SideOut();
					if(this.navParams.data.Event==="Doubles"){
						this.Firstserve.Team1.TeamAServeCount=2;
						this.Firstserve.SideOutButtonActive = true;
					}
				}else{
					if(this.navParams.data.Event==="Doubles"){
						this.Firstserve.SideOutButtonActive = true;
						this.Firstserve.Team2.TeamBServeCount=2;
						this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
						this.Firstserve.ServingTeamActivePlayerSide="Right";
						this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team2.nameB2;
						this.Firstserve.ServingTeamPlayerSide="Left";
						this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.nameA1;
						this.Firstserve.ReseivingTeamPlayerName=this.Firstserve.nameA2;
						this.Firstserve.ReseivingTeamActivePlayerSide="Right";
					}else{
						this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
						this.Firstserve.ServingTeamActivePlayerSide="Right";
						this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
						this.Firstserve.ReseivingTeamActivePlayerSide="Right";
					}
				}
			}else if(this.scoresobj.Team2[this.Firstserve.SetType][0].set==="SetTwoScores"){
				this.scoresobj.Team2.SetThreeTimeOuts[0].Status=true;
				this.scoresobj.Team1.SetThreeTimeOuts[0].Status=true;
				this.scoresobj.Team1.SetThreeScores[0].Status=true;
				this.scoresobj.Team2.SetThreeScores[0].Status=true;
				this.scoresobj.Team1.SetThreeScores[0].clicked=true;
				this.scoresobj.Team2.SetThreeScores[0].clicked=true;
				this.scoresobj.Team1.SetThreeScores[1].Status=true;
				this.scoresobj.Team2.SetThreeScores[1].Status=true;
				this.scoresobj.Team1.SetThreeScores[0].ServicesDowen=true;
				this.scoresobj.Team2.SetThreeScores[0].ServicesDowen=true;
				this.Firstserve.Team1.TeamAPoints=0;
				this.Firstserve.Team2.TeamBPoints=0;
				this.CurentScore=this.Firstserve.Team1.TeamAPoints;
				this.Firstserve.minValue=0;
				this.Firstserve.maxValue=11;
				if(this.scoresobj.Team2.SetTwoServe===true){
					this.SideOut();
					if(this.navParams.data.Event==="Doubles"){
						this.Firstserve.Team1.TeamAServeCount=2;
						this.Firstserve.SideOutButtonActive = true;
					}
				}else{
					if(this.navParams.data.Event==="Doubles"){
						this.Firstserve.SideOutButtonActive = true;
						this.Firstserve.Team2.TeamBServeCount=2;
						this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
						this.Firstserve.ServingTeamActivePlayerSide="Right";
						this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team2.nameB2;
						this.Firstserve.ServingTeamPlayerSide="Left";
						this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.nameA1;
						this.Firstserve.ReseivingTeamPlayerName=this.Firstserve.nameA2;
						this.Firstserve.ReseivingTeamActivePlayerSide="Right";
					}else{
						this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
						this.Firstserve.ServingTeamActivePlayerSide="Right";
						this.Firstserve.ReseivingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
						this.Firstserve.ReseivingTeamActivePlayerSide="Right";
					}
				}
			}
		}
		//scoreboard update function.
			this.scoreboardeupdate();
	}


	//function for serveDownCount count Increasing.
	serveDownCount(count){
		if(count===1 && this.Firstserve.Team1Active ){
			this.Firstserve.serveChangeUndo=true;
			this.Firstserve.serveDownPoint=this.Firstserve.Team1.TeamAPoints;
			if(this.Firstserve.ServingTeamActiveTeamname==="A1"){
				this.Firstserve.ServingTeamActiveTeamname="A2";
				this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA2;
				this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team1.nameA1;
				if(this.Firstserve.ServingTeamActivePlayerSide==="Left"){
					this.Firstserve.ServingTeamActivePlayerSide="Right";
					this.Firstserve.ServingTeamPlayerSide="Left";
				}else{
					this.Firstserve.ServingTeamActivePlayerSide="Left";
					this.Firstserve.ServingTeamPlayerSide="Right";
					
				}
			}else{
				this.Firstserve.ServingTeamActiveTeamname="A1";
				this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
				this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team1.nameA2;
				if(this.Firstserve.ServingTeamActivePlayerSide==="Left"){
					this.Firstserve.ServingTeamActivePlayerSide="Right";
					this.Firstserve.ServingTeamPlayerSide="Left";
				}else{
					this.Firstserve.ServingTeamActivePlayerSide="Left";
					this.Firstserve.ServingTeamPlayerSide="Right";
				}
			}
			this.Firstserve.Team1.TeamAServeCount=this.Firstserve.Team1.TeamAServeCount+1;
			this.Firstserve.SideOutButtonActive=true;
		}else if(count===1 && this.Firstserve.Team2Active){
			this.Firstserve.serveChangeUndo=true;
			this.Firstserve.serveDownPoint=this.Firstserve.Team2.TeamBPoints;
			if(this.Firstserve.ServingTeamActiveTeamname==="B1"){
				this.Firstserve.ServingTeamActiveTeamname="B2";
				this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB2;
				this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team2.nameB1;
				if(this.Firstserve.ServingTeamActivePlayerSide==="Left"){
					this.Firstserve.ServingTeamActivePlayerSide="Right";
					this.Firstserve.ServingTeamPlayerSide="Left";
				}else{
					this.Firstserve.ServingTeamActivePlayerSide="Left";
					this.Firstserve.ServingTeamPlayerSide="Right";
				}
			}else{
				this.Firstserve.ServingTeamActiveTeamname="B1";
				this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
				this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team2.nameB2;
				if(this.Firstserve.ServingTeamActivePlayerSide==="Left"){
					this.Firstserve.ServingTeamActivePlayerSide="Right";
					this.Firstserve.ServingTeamPlayerSide="Left";
				}else{
					this.Firstserve.ServingTeamActivePlayerSide="Left";
					this.Firstserve.ServingTeamPlayerSide="Right";
				}
			}
			this.Firstserve.Team2.TeamBServeCount = this.Firstserve.Team2.TeamBServeCount+1;
			this.Firstserve.SideOutButtonActive=true;
		}
		//score board pointes update services.
		this.service.RefereeScoreBoardUpdate(this.navParams.data._id,this.navParams.data).subscribe(response => {
        	},err =>{
        });
	}

	serveUndoCount(count){
			if(count===2 && this.Firstserve.Team1Active ){
				this.Firstserve.serveChangeUndo=false;
				if(this.Firstserve.ServingTeamActiveTeamname==="A1"){
					this.Firstserve.ServingTeamActiveTeamname="A2";
					this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA2;
					this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team1.nameA1;
					if(this.Firstserve.ServingTeamActivePlayerSide==="Left"){
						this.Firstserve.ServingTeamActivePlayerSide="Right";
						this.Firstserve.ServingTeamPlayerSide="Left";
					}else{
						this.Firstserve.ServingTeamActivePlayerSide="Left";
						this.Firstserve.ServingTeamPlayerSide="Right";
					}
				}else{
					this.Firstserve.ServingTeamActiveTeamname="A1";
					this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team1.nameA1;
					this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team1.nameA2;
					if(this.Firstserve.ServingTeamActivePlayerSide==="Left"){
						this.Firstserve.ServingTeamActivePlayerSide="Right";
						this.Firstserve.ServingTeamPlayerSide="Left";
					}else{
						this.Firstserve.ServingTeamActivePlayerSide="Left";
						this.Firstserve.ServingTeamPlayerSide="Right";
					}
				}
				this.Firstserve.Team1.TeamAServeCount=this.Firstserve.Team1.TeamAServeCount-1;
				this.Firstserve.SideOutButtonActive=false;
			}else if(count===2 && this.Firstserve.Team2Active){
				this.Firstserve.serveChangeUndo=false;
				if(this.Firstserve.ServingTeamActiveTeamname==="B1"){
					this.Firstserve.ServingTeamActiveTeamname="B2";
					this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB2;
					this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team2.nameB1;
					if(this.Firstserve.ServingTeamActivePlayerSide==="Left"){
						this.Firstserve.ServingTeamActivePlayerSide="Right";
						this.Firstserve.ServingTeamPlayerSide="Left";
					}else{
						this.Firstserve.ServingTeamActivePlayerSide="Left";
						this.Firstserve.ServingTeamPlayerSide="Right";
					}
				}else{
					this.Firstserve.ServingTeamActiveTeamname="B1";
					this.Firstserve.ServingTeamActivePlayerName=this.Firstserve.Team2.nameB1;
					this.Firstserve.ServingTeamPlayerName=this.Firstserve.Team2.nameB2;
					if(this.Firstserve.ServingTeamActivePlayerSide==="Left"){
						this.Firstserve.ServingTeamActivePlayerSide="Right";
						this.Firstserve.ServingTeamPlayerSide="Left";
					}else{
						this.Firstserve.ServingTeamActivePlayerSide="Left";
						this.Firstserve.ServingTeamPlayerSide="Right";
					}
				}
				this.Firstserve.Team2.TeamBServeCount = this.Firstserve.Team2.TeamBServeCount-1;
				this.Firstserve.SideOutButtonActive=false;
			}
			//scoreboard update function.
			this.scoreboardeupdate();
	}


	//function for time out start.
	TimerStart(obj){

		if(typeof(obj) !="string"){
			this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].Status="pending";
			this.timeMints=1;
			this.timeSecondes=0;
			this.SelectedTimeOutObj=obj;
			this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].Time="1min";
			this.time=!this.time;
			this.TimoutStop=setTimeout(() => {
				this.TimoutStop.stopobj=obj;
				this.time=!this.time;
				this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].Status=true;
				this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].complete=true;
				this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=true;
				if(obj.Team==="Team1"){
					if(this.Firstserve.Team1Active){
						obj.timeronpoint=this.Firstserve.Team1.TeamAPoints;
					}else{
						obj.timeronpoint=this.Firstserve.Team2.TeamBPoints;
					}
					this.Firstserve.Team1TimeOutobj=obj;
				}else{
					if(this.Firstserve.Team1Active){
						obj.timeronpoint=this.Firstserve.Team1.TeamAPoints;
					}else{
						obj.timeronpoint=this.Firstserve.Team2.TeamBPoints;
					}
					this.Firstserve.Team2TimeOutobj=obj;
				}
				this.Firstserve.TimeOut
				if(obj.TimeOut>1){
					this.scoresobj[obj.Team][obj.set][obj.TimeOut-2].ClickedTime=false;
				}
				if(this.navParams.data.GameFormat ==="1 To 21 Win By 2"){
					if(obj.TimeOut < 3){
						this.scoresobj[obj.Team][obj.set][obj.TimeOut].Status=true;
					}
				}else{
					if(obj.TimeOut < 2){
						this.scoresobj[obj.Team][obj.set][obj.TimeOut].Status=true;
					}
				}
				//scoreboard update function.
				this.scoreboardeupdate();	
		    }, 60000);
		    this.TimeCount();
		}else if(obj==="CourtChange"){
			this.time=!this.time;
			this.SelectedTimeOutObj=obj;
			this.TimoutStop=setTimeout(() => {
				this.time=!this.time;
				this.WinneingGame11formate();	
		    }, 120000);
		    this.timeMints=2;
			this.timeSecondes=0;
			this.TimeCount();
		}else{
			this.time=!this.time;
			this.SelectedTimeOutObj=obj;
			if(this.timeformate==="1min"){
				this.timeMints=1;
				this.timeSecondes=0;
				this.TimeCount();
				this.TimoutStop=setTimeout(() => {
					this.time=!this.time;	
			    }, 60000);
			}else if(this.timeformate==="2min"){
				this.TimoutStop=setTimeout(() => {
					this.time=!this.time;	
			    }, 120000);
			    this.timeMints=2;
				this.timeSecondes=0;
				this.TimeCount();
			}else if(this.timeformate==="3min"){
				this.TimoutStop=setTimeout(() => {
					this.time=!this.time;	
			    }, 180000);
			    this.timeMints=3;
				this.timeSecondes=0;
				this.TimeCount();
			}else if(this.timeformate==="4min"){
				this.TimoutStop=setTimeout(() => {
					this.time=!this.time;	
			    }, 240000);
			    this.timeMints=4;
				this.timeSecondes=0;
				this.TimeCount();
			}else if(this.timeformate==="5min"){
				this.TimoutStop=setTimeout(() => {
					this.time=!this.time;	
			    }, 300000);
			    this.timeMints=5;
				this.timeSecondes=0;
				this.TimeCount();
			}else if(this.timeformate==="6min"){
				this.TimoutStop=setTimeout(() => {
					this.time=!this.time;	
			    }, 360000);
			    this.timeMints=6;
				this.timeSecondes=0;
				this.TimeCount();
			}else if(this.timeformate==="7min"){
				this.TimoutStop=setTimeout(() => {
					this.time=!this.time;	
			    }, 420000);
			    this.timeMints=7;
				this.timeSecondes=0;
				this.TimeCount();
			}else if(this.timeformate==="10min"){
				this.TimoutStop=setTimeout(() => {
					this.time=!this.time;	
			    }, 600000);
			    this.timeMints=10;
				this.timeSecondes=0;
				this.TimeCount();
			}else if(this.timeformate==="15min"){
				this.TimoutStop=setTimeout(() => {
					this.time=!this.time;	
			    }, 900000);
			    this.timeMints=15;
				this.timeSecondes=0;
				this.TimeCount();
			}
		}
	}
	//function for Time out undo function.
	TimeOutUndo(obj){
		this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].Status=true;
		this.time=!this.time;
		clearTimeout(this.TimoutStop);
	}

	//function for Completed time out undo action.
	EndingTimeOutUndo(obj){
		this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].Status=true;
		this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].complete=false;
		this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=false;
		if(this.navParams.data.GameFormat ==="1 To 21 Win By 2"){
			if(obj.TimeOut < 3){
				this.scoresobj[obj.Team][obj.set][obj.TimeOut].Status=false;
			}
		}else{
			if(obj.TimeOut < 2){
				this.scoresobj[obj.Team][obj.set][obj.TimeOut].Status=false;
			}
		}
		//scoreboard update function.
		this.scoreboardeupdate();

	}
	// function for show the time out time.
	TimeCount(){

		if(this.timeSecondes===0){
			if(this.timeMints===0){
				this.timeSecondes=0;
				this.timeMints=0;
			}else{
				this.timeSecondes=59;
				this.timeMints--;
			}
		}
		setTimeout(() => {
			this.timeSecondes--;
			if(this.time===true){
	    		this.TimeCount();
	    	}
		}, 1000);
	}
	// function for stop the timer.
	StopTimer(){
		if(typeof(this.SelectedTimeOutObj) !="string"){
			this.time=!this.time;
			clearTimeout(this.TimoutStop);
			let obj=this.SelectedTimeOutObj;
			if(obj.Team==="Team1"){
				if(this.Firstserve.Team1Active){
					obj.timeronpoint=this.Firstserve.Team1.TeamAPoints;
				}else{
					obj.timeronpoint=this.Firstserve.Team2.TeamBPoints;
				}
				this.Firstserve.Team1TimeOutobj=obj;
			}else{
				if(this.Firstserve.Team1Active){
					obj.timeronpoint=this.Firstserve.Team1.TeamAPoints;
				}else{
					obj.timeronpoint=this.Firstserve.Team2.TeamBPoints;
				}
				this.Firstserve.Team2TimeOutobj=obj;
			}
			if(obj.TimeOut>1){
				this.scoresobj[obj.Team][obj.set][obj.TimeOut-2].ClickedTime=false;
			}
			this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].complete=true;
			this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].Status=true;
			this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=true;
			if(this.navParams.data.GameFormat ==="1 To 21 Win By 2"){
				if(obj.TimeOut <3){
					this.scoresobj[obj.Team][obj.set][obj.TimeOut].Status=true;
				}
			}else{
				if(obj.TimeOut <2){
					this.scoresobj[obj.Team][obj.set][obj.TimeOut].Status=true;
				}
			}
			//scoreboard update function.
			this.scoreboardeupdate();
		}else if(this.SelectedTimeOutObj==="CourtChange"){
			this.WinneingGame11formate();
			clearTimeout(this.TimoutStop);
			this.time=!this.time;
		}else{
			clearTimeout(this.TimoutStop);
			this.time=!this.time;
		}
		
	}
	// undo function for score update.
	ScoreUndo(obj){
		if(this.Firstserve.maxValue>11 && this.scoresobj.FormateName ==="2 Of 3 To 11 Win By 2"){
			if(this.Firstserve.Team1.TeamAPoints>this.Firstserve.Team2.TeamBPoints && this.Firstserve.Team1.TeamAPoints===this.Firstserve.OldmaxValue){
				this.MaxPointUndoscore();
			}else if(this.Firstserve.Team2.TeamBPoints>this.Firstserve.Team1.TeamAPoints && this.Firstserve.Team2.TeamBPoints===this.Firstserve.OldmaxValue){
				this.MaxPointUndoscore();
			}
		}else if(this.Firstserve.maxValue>15 && this.scoresobj.FormateName ==="1 To 15 Win By 2"){
			if(this.Firstserve.Team1.TeamAPoints>this.Firstserve.Team2.TeamBPoints && this.Firstserve.Team1.TeamAPoints===this.Firstserve.OldmaxValue){
				this.MaxPointUndoscore();
			}else if(this.Firstserve.Team2.TeamBPoints>this.Firstserve.Team1.TeamAPoints && this.Firstserve.Team2.TeamBPoints===this.Firstserve.OldmaxValue){
				this.MaxPointUndoscore();
			}
		}else if(this.Firstserve.maxValue>21 && this.scoresobj.FormateName ==="1 To 21 Win By 2"){
			if(this.Firstserve.Team1.TeamAPoints>this.Firstserve.Team2.TeamBPoints && this.Firstserve.Team1.TeamAPoints===this.Firstserve.OldmaxValue){
				this.MaxPointUndoscore();
			}else if(this.Firstserve.Team2.TeamBPoints>this.Firstserve.Team1.TeamAPoints && this.Firstserve.Team2.TeamBPoints===this.Firstserve.OldmaxValue){
				this.MaxPointUndoscore();
			}
		}

		if(this.scoresobj[obj.Team][obj.set].length===16 && this.Firstserve.CourtChange===true){
			if(this.Firstserve.Team1.TeamAPoints>this.Firstserve.Team2.TeamBPoints && this.Firstserve.Team1.TeamAPoints === 8 && this.Firstserve.Team1Active ){
				this.Firstserve.CourtChange=false;
			}else if(this.Firstserve.Team2.TeamBPoints>this.Firstserve.Team1.TeamAPoints && this.Firstserve.Team2.TeamBPoints === 8 && this.Firstserve.Team2Active){
				this.Firstserve.CourtChange=false;
			}
		}else if(this.scoresobj[obj.Team][obj.set].length===22 && this.Firstserve.CourtChange===true){
			if(this.Firstserve.Team1.TeamAPoints>this.Firstserve.Team2.TeamBPoints && this.Firstserve.Team1.TeamAPoints === 11 && this.Firstserve.Team1Active){
				this.Firstserve.CourtChange=false;
			}else if(this.Firstserve.Team2.TeamBPoints>this.Firstserve.Team1.TeamAPoints && this.Firstserve.Team2.TeamBPoints === 11 && this.Firstserve.Team2Active){
				this.Firstserve.CourtChange=false;
			}
		}else if(this.scoresobj[obj.Team][obj.set].length===37 && this.Firstserve.CourtChange===true && this.scoresobj[obj.Team][obj.set][0].set==="SetThreeScores"){
			if(this.Firstserve.Team1.TeamAPoints>this.Firstserve.Team2.TeamBPoints && this.Firstserve.Team1.TeamAPoints === 6 && this.Firstserve.Team1Active){
				this.Firstserve.CourtChange=false;
			}else if(this.Firstserve.Team2.TeamBPoints>this.Firstserve.Team1.TeamAPoints && this.Firstserve.Team2.TeamBPoints === 6 && this.Firstserve.Team2Active){
				this.Firstserve.CourtChange=false;
			}
		}	
		if(this.Firstserve.Team1Active){
			if(this.Firstserve.Team1TimeOutobj !=null){
				let obj=this.Firstserve.Team1TimeOutobj;
				if(obj.timeronpoint===this.Firstserve.Team1.TeamAPoints){
					obj.timeronpoint=obj.timeronpoint-1
				}else{
					this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=true;
				}
		  	}
			if(this.Firstserve.Team2TimeOutobj !=null){
					let obj=this.Firstserve.Team2TimeOutobj;
					if(obj.timeronpoint===this.Firstserve.Team1.TeamAPoints){
						obj.timeronpoint=obj.timeronpoint-1
					}else{
						this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=true;
					}
		  		} 
			if(this.scoresobj[obj.Team][obj.set][this.Firstserve.Team1.TeamAPoints-1].ServicesDowen=== false){
				// this.scoresobj[obj.Team][obj.set][this.Firstserve.Team1.TeamAPoints-1].Point=true;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team1.TeamAPoints].Point=false;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team1.TeamAPoints].clicked=false;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team1.TeamAPoints+1].Status =false;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team1.TeamAPoints].Status =true;
				this.Firstserve.Team1.TeamAPoints=this.Firstserve.Team1.TeamAPoints-1;
			}else{
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team1.TeamAPoints].Point=false;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team1.TeamAPoints].clicked=false;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team1.TeamAPoints+1].Status =false;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team1.TeamAPoints].Status =true;
				this.Firstserve.Team1.TeamAPoints=this.Firstserve.Team1.TeamAPoints-1;
			}
		}else{
				if(this.Firstserve.Team2TimeOutobj !=null){
					let obj=this.Firstserve.Team2TimeOutobj;
					if(obj.timeronpoint===this.Firstserve.Team2.TeamBPoints){
						obj.timeronpoint=obj.timeronpoint-1
					}else{
						this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=true;
					}
		  		}
				if(this.Firstserve.Team1TimeOutobj !=null){
					let obj=this.Firstserve.Team1TimeOutobj;
					if(obj.timeronpoint===this.Firstserve.Team2.TeamBPoints){
						obj.timeronpoint=obj.timeronpoint-1
					}else{
						this.scoresobj[obj.Team][obj.set][obj.TimeOut-1].ClickedTime=true;
					}
		  		}
			if(this.scoresobj[obj.Team][obj.set][this.Firstserve.Team2.TeamBPoints-1].ServicesDowen === false){
				// this.scoresobj[obj.Team][obj.set][this.Firstserve.Team2.TeamBPoints-1].Point=true;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team2.TeamBPoints].Point=false;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team2.TeamBPoints].clicked=false;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team2.TeamBPoints+1].Status =false;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team2.TeamBPoints].Status =true;
				this.Firstserve.Team2.TeamBPoints=this.Firstserve.Team2.TeamBPoints-1;
			}else{
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team2.TeamBPoints].Point=false;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team2.TeamBPoints].clicked=false;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team2.TeamBPoints+1].Status =false;
				this.scoresobj[obj.Team][obj.set][this.Firstserve.Team2.TeamBPoints].Status =true;
				this.Firstserve.Team2.TeamBPoints=this.Firstserve.Team2.TeamBPoints-1;
			}
		}
		
		if(this.Firstserve.ServingTeamActivePlayerSide==="Right"){
			if(this.navParams.data.Event==="Doubles"){
				this.Firstserve.ServingTeamActivePlayerSide="Left";
				this.Firstserve.ServingTeamPlayerSide="Right";
			}else{
				this.Firstserve.ServingTeamActivePlayerSide="Left";
				this.Firstserve.ReseivingTeamActivePlayerSide="Left";
			}
  		}else if(this.Firstserve.ServingTeamActivePlayerSide==="Left"){
			  if( this.navParams.data.Event==="Doubles"){
				  	this.Firstserve.ServingTeamActivePlayerSide="Right";
					this.Firstserve.ServingTeamPlayerSide="Left";
				}else{
					this.Firstserve.ServingTeamActivePlayerSide="Right";
					this.Firstserve.ReseivingTeamActivePlayerSide="Right";
				}
				
  		}
		//scoreboard update function.
		this.scoreboardeupdate();
	}
	//function for tie point reached and max value reaced max score point undo function.
	MaxPointUndoscore(){
		this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.maxValue].Hide=true;
		this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.maxValue-1].Hide=true;
		this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.maxValue-2].Hide=true;
		this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.maxValue-3].Hide=true;
		this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.maxValue-4].Hide=true;
		this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.maxValue].Hide=true;
		this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.maxValue-1].Hide=true;
		this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.maxValue-2].Hide=true;
		this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.maxValue-3].Hide=true;
		this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.maxValue-4].Hide=true;
		


		this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.minValue-1].Hide=false;
		this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.minValue-2].Hide=false;
		this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.minValue-3].Hide=false;
		this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.minValue-4].Hide=false;
		this.scoresobj.Team1[this.Firstserve.SetType][this.Firstserve.minValue-5].Hide=false;
		
		
		this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.minValue-1].Hide=false;
		this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.minValue-2].Hide=false;
		this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.minValue-3].Hide=false;
		this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.minValue-4].Hide=false;
		this.scoresobj.Team2[this.Firstserve.SetType][this.Firstserve.minValue-5].Hide=false;
		if(this.Firstserve.maxValue===11){
				this.Firstserve.OldmaxValue=11;	
		}else{
			this.Firstserve.OldmaxValue=this.Firstserve.OldmaxValue-5;
		}
		this.Firstserve.maxValue=this.Firstserve.maxValue-5;
		this.Firstserve.minValue=this.Firstserve.minValue-5;
		
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
	//function refaree logout.
     logout(){
        this.storage.clear().then(()=>{
		//scoreboard update function.
		this.scoreboardeupdate();
        this.navCtrl.push(HomePage).then(() => {
                this.navCtrl.remove(0);
        });
        });
     }

}
