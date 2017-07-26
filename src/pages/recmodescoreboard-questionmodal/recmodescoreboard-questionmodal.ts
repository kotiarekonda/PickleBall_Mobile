import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { WinningdeferencepointstwoscoresPage } from '../winningdeferencepointstwoscores/winningdeferencepointstwoscores';
import { RecmodalScoreBoardPage } from '../recmodal-score-board/recmodal-score-board';
/*
  Generated class for the RecmodescoreboardQuestionmodal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recmodescoreboard-questionmodal',
  templateUrl: 'recmodescoreboard-questionmodal.html'
})
export class RecmodescoreboardQuestionmodalPage {

    Firstserve:any={};
    matchobj:any={};
    Curentshedulecourt:any={};
    constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {}

    PickleBallDetailes={
              "EventNamesArray":[
                                    {"EventNameType":"singles","EventName":"Mens Singles 4.0"},
                                    {"EventNameType":"Doubles","EventName":"Mens Doubles 4.5"},
                                    {"EventNameType":"Doubles","EventName":"Mens Doubles 5.0"},
                                    {"EventNameType":"Doubles","EventName":"Womens Doubles 5.0"},
                                    {"EventNameType":"singles","EventName":"Womens Singles 4.5"}
                ]
                
        }
    ionViewDidLoad() {
      this.Firstserve.Team1=false;
      this.Firstserve.Team2=false;
      // this.Firstserve.Team1Sides="Left";
      // this.Firstserve.Team2Sides="Right";
      // if(this.navParams.data.Event==="singles"){
      //   this.Firstserve.SelectedTwoTeams=true;
      // }
    }



    //function for selected for Eventes.
    SelectEvent(str){
            this.Curentshedulecourt.courtNumber=1;
            this.Curentshedulecourt.courtName="Court1";
            this.Curentshedulecourt.courtId=1;
            this.Curentshedulecourt.court=true;

        if(str==="singles"){
              this.Curentshedulecourt.Event="singles";
                 this.Curentshedulecourt.EventName="singles";
                 this.Curentshedulecourt.TeamAPlayerName="Player A";
                this.Curentshedulecourt.TeamAPlayerId=4;
                this.Curentshedulecourt.TeamA=true;
                 this.Curentshedulecourt.TeamBPlayerName="Player B";
                this.Curentshedulecourt.TeamBPlayerId=5;
                this.Curentshedulecourt.TeamB=true;
                 this.Curentshedulecourt.Evente=true;  
            // if(obj.EventName==="Mens Singles 4.0"){
                 
            // }else if(obj.EventName==="Womens Singles 4.5"){
            //     this.Curentshedulecourt.Event="singles";
            //     this.Curentshedulecourt.EventName="singles";
            //     this.Curentshedulecourt.TeamAPlayerName="TEAM1 Player1";
            //     this.Curentshedulecourt.TeamAPlayerId=4;
            //     this.Curentshedulecourt.TeamA=true;
            //      this.Curentshedulecourt.TeamBPlayerName="TEAM2 Player1";
            //     this.Curentshedulecourt.TeamBPlayerId=5;
            //     this.Curentshedulecourt.TeamB=true;
            //     this.Curentshedulecourt.Evente=true;
            // }

        }else if(str==="Doubles"){
            this.Curentshedulecourt.TeamAPlayerNameModel="Player A Player B";
            this.Curentshedulecourt.TeamBPlayerNameModel="Player C Player D";
            this.Curentshedulecourt.TeamAPlayerName="Player A";
                this.Curentshedulecourt.TeamAPlayerName1="Player B";
                this.Curentshedulecourt.TeamAPlayerId=4;
                this.Curentshedulecourt.TeamA=true;
                this.Curentshedulecourt.TeamBPlayerName="Player C";
                this.Curentshedulecourt.TeamBPlayerName1="Player D";
                this.Curentshedulecourt.TeamBPlayerId=3;
                this.Curentshedulecourt.TeamB=true;
                this.Curentshedulecourt.Event="Doubles";
                this.Curentshedulecourt.EventName="Doubles";
                this.Curentshedulecourt.Evente=true;
            // if(obj.EventName==="Mens Doubles 4.5"){
                
            // }else if(obj.EventName==="Mens Doubles 5.0"){
            //     this.Curentshedulecourt.Event="Doubles";
            //     this.Curentshedulecourt.EventName=obj.EventName;
            //     this.Curentshedulecourt.Evente=true;
            //      this.Curentshedulecourt.TeamAPlayerName="TEAM1 Player1";
            //     this.Curentshedulecourt.TeamAPlayerName1="TEAM1 Player2";
            //     this.Curentshedulecourt.TeamAPlayerId=4;
            //     this.Curentshedulecourt.TeamA=true;
            //     this.Curentshedulecourt.TeamBPlayerName="TEAM2 Player1";
            //     this.Curentshedulecourt.TeamBPlayerName1="TEAM2 Player2";
            //     this.Curentshedulecourt.TeamBPlayerId=3;
            //     this.Curentshedulecourt.TeamB=true;
            //     this.Curentshedulecourt.Event="Doubles";
            //     this.Curentshedulecourt.EventName=obj.EventName;
            //     this.Curentshedulecourt.Evente=true;
            // }else if(obj.EventName==="Womens Doubles 5.0"){
            //     this.Curentshedulecourt.TeamAPlayerName="TEAM1 Player1";
            //     this.Curentshedulecourt.TeamAPlayerName1="TEAM1 Player2";
            //     this.Curentshedulecourt.TeamAPlayerId=4;
            //     this.Curentshedulecourt.TeamA=true;
            //     this.Curentshedulecourt.TeamBPlayerName="TEAM2 Player1";
            //     this.Curentshedulecourt.TeamBPlayerName1="TEAM2 Player2";
            //     this.Curentshedulecourt.TeamBPlayerId=3;
            //     this.Curentshedulecourt.TeamB=true;
            //     this.Curentshedulecourt.Event="Doubles";
            //     this.Curentshedulecourt.EventName=obj.EventName;
            //     this.Curentshedulecourt.Evente=true;
            //     this.Curentshedulecourt.Event="Doubles";
            //     this.Curentshedulecourt.EventName=obj.EventName;
            //     this.Curentshedulecourt.Evente=true;
            // }
        }
        if(this.Curentshedulecourt.Evente && this.Curentshedulecourt.format){
            this.finalresponseobj();
        }
        
    }

    //function for Selected Format.
        SelectedFormat(str){
            this.Curentshedulecourt.Referenamemodel="Chris Gatling";
            this.Curentshedulecourt.RefereeName="Chris Gatling";
            this.Curentshedulecourt.RefereeNameId=1;
            this.Curentshedulecourt.refere=true;
             this.Curentshedulecourt.ForMate=str;
             this.Curentshedulecourt.format=true;
             if(this.Curentshedulecourt.Evente && this.Curentshedulecourt.format){
               this.finalresponseobj();
            }

        }


        finalresponseobj(){
		if(this.Curentshedulecourt.Event==="singles"){
        	let date:any = new Date();
        	 	let hours:any = date.getHours();
  				let minutes:any = date.getMinutes();
  				let ampm:any = hours >= 12 ? 'pm' : 'am';
  				hours = hours % 12;
  				hours = hours ? hours : 12; // the hour '0' should be '12'
  				minutes = minutes < 10 ? '0'+minutes : minutes;
  				let strTime:any = hours + ':' + minutes + ' ' + ampm;
            let teamA:any={};
                let Myarray=[];
                let playersobj1:any={};
                playersobj1.id=this.Curentshedulecourt.TeamAPlayerId;
                playersobj1.Name= this.Curentshedulecourt.TeamAPlayerName;
                playersobj1.Served=false;
                Myarray.push(playersobj1);
                let teamB:any={};
                let Myarray1=[];
                let playersobj2:any={};
                playersobj2.id=this.Curentshedulecourt.TeamBPlayerId;
                playersobj2.Name=this.Curentshedulecourt.TeamBPlayerName;
                playersobj2.Served=false;
                Myarray1.push(playersobj2);
                teamA.Team="Team1";
                teamA.Players=Myarray;
                teamB.Team="Team2";
                teamB.TeamId="id";
                teamB.Players=Myarray1;
                let obj:any={};
                obj.id="12";
                obj.EventName=this.Curentshedulecourt.EventName;
                obj.Referee=this.Curentshedulecourt.RefereeName;
                obj.TournamentName="Robson Ranch pickleball tournament";
                if(this.Curentshedulecourt.ForMate==="1 to 15 win By 2"){
                    obj.twopointse=true;
                    obj.GameFormat='1 to 15';
                     obj.GameFormatName="1 to 15 win By 2";
                }else if(this.Curentshedulecourt.ForMate==="1 to 21 win By 2"){
                    obj.GameFormat='1 to 21';
                    obj.GameFormatName="1 to 21 win By 2";
                    obj.twopointse=true;
                }else{
                    if(this.Curentshedulecourt.ForMate==="1 to 15"){
                         obj.GameFormatName="1 to 15 win By 1";
                    }else if(this.Curentshedulecourt.ForMate==="1 to 21"){
                        obj.GameFormatName="1 to 21 win By 1";
                    }else{
                        obj.GameFormatName="2 Of 3 To 11 win By 2";
                    }
                     obj.GameFormat=this.Curentshedulecourt.ForMate;
                }
                obj.courtNumber=this.Curentshedulecourt.courtNumber;
                obj.court=this.Curentshedulecourt.courtName;
                obj.Event="singles";
                obj.Serve=false;
                obj.Time=strTime;
                obj.Team1=teamA;
                obj.Team2=teamB;
                this.matchobj=obj;
                this.Firstserve.SelectedTwoTeams=true;
                this.Firstserve.Team1Sides="Left";
                this.Firstserve.Team2Sides="Right";
                // this.ShedulecourtListArray=[];
                // this.ShedulecourtListArray.push(obj);
                //  this.SelectedEventName=null;
                //  this.SelectedFormatName=null;
        }else if(this.Curentshedulecourt.Event==="Doubles"){
        		let date:any = new Date();
        	 	let hours:any = date.getHours();
  				let minutes:any = date.getMinutes();
  				let ampm:any = hours >= 12 ? 'pm' : 'am';
  				hours = hours % 12;
  				hours = hours ? hours : 12; // the hour '0' should be '12'
  				minutes = minutes < 10 ? '0'+minutes : minutes;
  				let strTime:any = hours + ':' + minutes + ' ' + ampm;
            	let teamA:any={};
                let Myarray=[];
                let playersobj1:any={};
                playersobj1.id=this.Curentshedulecourt.TeamAPlayerId;
                playersobj1.Name= this.Curentshedulecourt.TeamAPlayerName;
                 playersobj1.Served=false;
                Myarray.push(playersobj1);
                let playersobj4:any={};
                playersobj4.id=this.Curentshedulecourt.TeamAPlayerId;
                playersobj4.Name= this.Curentshedulecourt.TeamAPlayerName1;
                playersobj4.Served=false;
                Myarray.push(playersobj4);
                let teamB:any={};
                let Myarray1=[];
                let playersobj2:any={};
                playersobj2.id=this.Curentshedulecourt.TeamBPlayerId;
                playersobj2.Name=this.Curentshedulecourt.TeamBPlayerName;
                playersobj2.Served=false;
                Myarray1.push(playersobj2);
                let playersobj3:any={};
                playersobj3.id=this.Curentshedulecourt.TeamBPlayerId;
                playersobj3.Name=this.Curentshedulecourt.TeamBPlayerName1;
                playersobj3.Served=false;
                Myarray1.push(playersobj3);
                teamA.Team="Team1";
                teamA.TeamId="id";
                teamA.Players=Myarray;
                teamB.Team="Team2";
                teamB.TeamId="id";
                teamB.Players=Myarray1;
                let obj:any={};
                obj.id="12";
                obj.TournamentName="Robson Ranch pickleball tournament";
                obj.EventName=this.Curentshedulecourt.EventName;
                obj.Referee=this.Curentshedulecourt.RefereeName;
                if(this.Curentshedulecourt.ForMate==="1 to 15 win By 2"){
                    obj.twopointse=true;
                    obj.GameFormat='1 to 15';
                     obj.GameFormatName="1 to 15 win By 2";
                }else if(this.Curentshedulecourt.ForMate==="1 to 21 win By 2"){
                    obj.GameFormat='1 to 21';
                    obj.GameFormatName="1 to 21 win By 2";
                    obj.twopointse=true;
                }else{
                    if(this.Curentshedulecourt.ForMate==="1 to 15"){
                         obj.GameFormatName="1 to 15 win By 1";
                    }else if(this.Curentshedulecourt.ForMate==="1 to 21"){
                        obj.GameFormatName="1 to 21 win By 1";
                    }else{
                        obj.GameFormatName="2 Of 3 To 11 win By 2";
                    }
                     obj.GameFormat=this.Curentshedulecourt.ForMate;
                }
                obj.courtNumber=this.Curentshedulecourt.courtNumber;
                obj.court=this.Curentshedulecourt.courtName;
                obj.Event="Doubles";
                obj.Serve=false;
                obj.Time=strTime;
                obj.Team1=teamA;
                obj.Team2=teamB;
                this.matchobj=obj;
                this.Firstserve.Team1Sides="Left";
                this.Firstserve.Team2Sides="Right";
                // this.ShedulecourtListArray.push(obj);
                // this.Curentshedulecourt={};
                // this.SelectedEventName=null;
                // this.SelectedFormatName=null;
    }
    }         

    //function for TeamA Select First Serve Player Name.
    TeamASelectFirstServePlayerName(myvalue){
      this.Firstserve.teamAserve=true;
      if(myvalue === 0){
        this.matchobj.Team1.Players[0].Served = true;
        this.matchobj.Team1.Players[1].Served = false;
      }else{
        this.matchobj.Team1.Players[1].Served = true;
        this.matchobj.Team1.Players[0].Served = false;
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
          this.matchobj.Team2.Players[0].Served = true;
          this.matchobj.Team2.Players[1].Served = false;
        }else{
          this.matchobj.Team2.Players[1].Served = true;
          this.matchobj.Team2.Players[0].Served = false;
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
      this.matchobj.firstserve=this.Firstserve;
      if(this.Firstserve.teamAserve===undefined && this.navParams.data.Event ==="Doubles"){
          this.Firstserve.TeamAplayersSelect=true;
        this.Firstserve.SelectedTeamPersonText="Select first server from each team";
        }else if(this.Firstserve.teamBserve===undefined && this.navParams.data.Event ==="Doubles"){
          this.Firstserve.TeamBplayersSelect=true;
          this.Firstserve.SelectedTeamPersonText="Select first server from each team";
        }else if(this.Firstserve.SelectedTeam === undefined){
            this.Firstserve.SelectTwoteams=true;
        }else{
            if(this.matchobj.twopointse===undefined){
                this.navCtrl.push(RecmodalScoreBoardPage, this.matchobj);
                this.viewCtrl.dismiss();
            }else{
                this.navCtrl.push(WinningdeferencepointstwoscoresPage,this.matchobj); 
                this.viewCtrl.dismiss();
            }
        }
        
     }
        

}
