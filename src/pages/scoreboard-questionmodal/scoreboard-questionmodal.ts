import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

/*
  Generated class for the ScoreboardQuestionmodal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-scoreboard-questionmodal',
  templateUrl: 'scoreboard-questionmodal.html'
})
export class ScoreboardQuestionmodalPage {
   Firstserve:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {}

  ionViewDidLoad() {
    this.Firstserve.Team1=false;
    this.Firstserve.Team2=false;
    this.Firstserve.Team1Sides="Left";
     this.Firstserve.Team2Sides="Right";
     if(this.navParams.data.Event==="Singles"){
       this.Firstserve.SelectedTwoTeams=true;
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
    if(this.Firstserve.TeamAplayersSelect!=undefined){
      this.Firstserve.TeamAplayersSelect=false;
    }
		if(this.Firstserve.teamBserve !=undefined && this.Firstserve.teamAserve !=undefined){
			  this.Firstserve.SelectedTwoTeams=true;
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
      if(this.Firstserve.TeamBplayersSelect!=undefined){
      this.Firstserve.TeamBplayersSelect=false;
    }

      if(this.Firstserve.teamBserve !=undefined && this.Firstserve.teamAserve !=undefined){
        this.Firstserve.SelectedTwoTeams=true;
      }

  }

  //function for select first Serve team.
  SelectTeam(str){
    this.Firstserve.SelectTwoteams=false;
    if(str==="Team1"){
      this.Firstserve.SelectedTeam="Team1";
      this.Firstserve.Team1=true;
      this.Firstserve.Team2=false;
    }else{
      this.Firstserve.SelectedTeam="Team2";
      this.Firstserve.Team2=true;
      this.Firstserve.Team1=false;
    }

  }
  //function for Team positions change
  ChangeTeamSides(){
    if(this.Firstserve.Team1Sides==="Left"){
      this.Firstserve.Team1Sides="Right";
      this.Firstserve.Team2Sides="Left";
    }else{
       this.Firstserve.Team1Sides="Left";
      this.Firstserve.Team2Sides="Right";
    }

  }
  //function for Start Match.
  StartMatch(){
      if(this.Firstserve.teamAserve===undefined && this.navParams.data.Event ==="Doubles"){
        this.Firstserve.TeamAplayersSelect=true;
       this.Firstserve.SelectedTeamPersonText="Select first server from each team";
      }else if(this.Firstserve.teamBserve===undefined && this.navParams.data.Event ==="Doubles"){
        this.Firstserve.TeamBplayersSelect=true;
        this.Firstserve.SelectedTeamPersonText="Select first server from each team";
      }else if(this.Firstserve.SelectedTeam === undefined){
          this.Firstserve.SelectTwoteams=true;
      }else{
        this.viewCtrl.dismiss(this.Firstserve);
      }
  }
}
