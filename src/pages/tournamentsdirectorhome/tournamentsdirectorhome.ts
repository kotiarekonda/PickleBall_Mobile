import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { Refereescoreboardwinby1Page} from '../refereescoreboardwinby1/refereescoreboardwinby1';
import { Refereescoreboardwinby2Page} from '../refereescoreboardwinby2/refereescoreboardwinby2';
import {PickleBallservices} from '../../providers/pickle-ballservices';
import {Livescoreboardwinnby1Page} from '../livescoreboardwinnby1/livescoreboardwinnby1';
import {Livescoreboardwinnby2Page} from '../livescoreboardwinnby2/livescoreboardwinnby2';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';



/*
  Generated class for the Tournamentsdirectorhome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tournamentsdirectorhome',
  templateUrl: 'tournamentsdirectorhome.html',
  providers:[PickleBallservices]
})
export class TournamentsdirectorhomePage {
        MensDoubles4to5;
        MensDoubles5to0;
        WomensDoubles5to0;
        MensSingles4to0;
        WomensSingles4to5;
        Referees;
        SinglesList;
        DoublesList;
        header;
        socket:any;
        Curentshedulecourt:any={};
        TeamBPlayersList=[];
        TeamAPlayersList=[];
        SelectedfirstTeamb=false;
        ShedulecourtListArray=[];
        SelectedEventName=null;
        SelectedFormatName=null;
        ScheduleMatchDetailes:any={};
	constructor(public navCtrl: NavController,public storage:Storage, public navParams: NavParams, public alertCtrl: AlertController,public service:PickleBallservices) {
     }
   
    
     
        ionViewDidLoad(){
            this.storage.get('loginUser-Token').then((val)=>{
                    if(val !=undefined){
                        this.service.TournmentDirectorsHomepageonload(val).subscribe(response => {
                            this.SocketonMatches(response.TournamentId);
                            this.ScheduleMatchDetailes=response;
                        },err =>{
                            this.logout();
                        });
                    }else{
                        this.service.TournmentDirectorsHomepageonload(this.navParams.data).subscribe(response => {
                            this.SocketonMatches(response.TournamentId);
                            this.ScheduleMatchDetailes=response;
                        },err =>{
                            this.logout();
                        });
                    }
         
            });
        }

        //socket on turnament drectore
        SocketonMatches(id){
            this.service.socket.on('livescore'+id, (response) =>{
                    let  index = this.ScheduleMatchDetailes.Matchs.map(function(obj) {return obj._id;}).indexOf(response.MatchId);
                    if(index !==-1){
                        this.ScheduleMatchDetailes.Matchs[index].TeamAPoints=response.TeamAPoints;
                        this.ScheduleMatchDetailes.Matchs[index].TeamBPoints=response.TeamBPoints;
                        this.ScheduleMatchDetailes.Matchs[index].Team1Active=response.Team1Active;
                        this.ScheduleMatchDetailes.Matchs[index].Team2Active=response.Team2Active;
                        this.ScheduleMatchDetailes.Matchs[index].GameStatus=response.GameStatus;
                        
                    }
                })
        }

    //function for selected for court.
    selectCourt(obj){
        if(this.Curentshedulecourt.CourtNo===undefined){
            this.Curentshedulecourt.courtName= obj.CourtName;
            this.Curentshedulecourt.courtId= obj._id;
            this.Curentshedulecourt.CourtNo=obj.CourtNumber;
            this.Curentshedulecourt.court=true;
        }else{
            this.Curentshedulecourt.courtName=obj.CourtName;
            this.Curentshedulecourt.courtId= obj._id;
            this.Curentshedulecourt.CourtNo=obj.CourtNumber;
            
            
        }
        
    }
    //function for selected for Eventes.
    SelectEvent(obj){ 
        if(this.Curentshedulecourt.TeamAPlayerName!=undefined){
            delete this.Curentshedulecourt.TeamAPlayerName;
            delete this.Curentshedulecourt.TeamAPlayerId;
             delete this.Curentshedulecourt.TeamA;
              delete this.Curentshedulecourt.Evente;
            if(this.Curentshedulecourt.TeamAPlayerName1!=undefined){
                delete this.Curentshedulecourt.TeamA;
                delete this.Curentshedulecourt.TeamAPlayerName1
            }
        }
         if(this.Curentshedulecourt.TeamBPlayerName!=undefined){
            delete this.Curentshedulecourt.TeamBPlayerName;
            delete this.Curentshedulecourt.TeamBPlayerId;
            delete this.Curentshedulecourt.TeamB;
            delete this.Curentshedulecourt.Evente;
             if(this.Curentshedulecourt.TeamBPlayerName1!=undefined){
                delete this.Curentshedulecourt.TeamB;
                delete this.Curentshedulecourt.TeamBPlayerName1
            }
        }
        let RequestObj:any={};
        if(obj.EventType==="Singles"){
            RequestObj.TournamentId=obj.TournamentId;
            RequestObj.EventId=obj._id;
            this.service.EeventPlayersList(RequestObj).subscribe(response => {
                this.TeamAPlayersList=[];
                this.TeamBPlayersList=[];
                this.Curentshedulecourt.Event="singles";
                this.Curentshedulecourt.EventName=obj.EventName;
                this.SinglesList=response.slice(0);
                this.TeamAPlayersList=this.SinglesList.slice(0);
                this.TeamBPlayersList=this.SinglesList.slice(0);
                this.Curentshedulecourt.Evente=true;
                this.Curentshedulecourt.EventId=obj._id;
            },err =>{
            });
        }else if(obj.EventType==="Doubles"){
            RequestObj.TournamentId=obj.TournamentId;
            RequestObj.EventId=obj._id;
            this.service.EeventPlayersList(RequestObj).subscribe(response => {
                        this.TeamAPlayersList=[];
                        this.TeamBPlayersList=[];
                        this.Curentshedulecourt.Event="Doubles";
                        this.Curentshedulecourt.EventName=obj.EventName;
                        this.DoublesList=response.slice(0);;
                        this.TeamAPlayersList= this.DoublesList.slice(0);
                        this.TeamBPlayersList= this.DoublesList.slice(0);
                        this.Curentshedulecourt.EventId=obj._id;
                        this.Curentshedulecourt.Evente=true;
                    },err =>{
                    });
        }
        
    }


    //function for select TeamAplayers in singles list.
    SelectTeamAplayersSingles(obj){
            if(this.Curentshedulecourt.TeamBPlayerName===undefined && this.Curentshedulecourt.TeamAPlayerName===undefined){
                let  index = this.TeamBPlayersList.map(function(obj) {return obj._id;}).indexOf(obj._id);
                this.TeamBPlayersList.splice(index,1);
                this.Curentshedulecourt.TeamAPlayerName=obj.Player1Name;
                this.Curentshedulecourt.TeamAPlayerId=obj._id;
                this.Curentshedulecourt.TeamAPlayer1Id=obj.Player1Id;
                this.Curentshedulecourt.TeamA=true;
            }else{
                if(this.Curentshedulecourt.TeamAPlayerName!=undefined ){
                    let  index =this.SinglesList.map(function(obj) {return obj._id;}).indexOf(this.Curentshedulecourt.TeamAPlayerId);
                    let addobj=this.SinglesList[index];
                    this.TeamBPlayersList.push(addobj);
                    let  index1 =this.TeamBPlayersList.map(function(obj) {return obj._id;}).indexOf(obj._id);
                    this.TeamBPlayersList.splice(index1,1);
                    this.Curentshedulecourt.TeamAPlayerName=obj.Player1Name;
                    this.Curentshedulecourt.TeamAPlayerId=obj._id;
                    this.Curentshedulecourt.TeamAPlayer1Id=obj.Player1Id;
                }else{
                    let  index =this.TeamBPlayersList.map(function(obj) {return obj._id;}).indexOf(obj._id);
                    this.TeamBPlayersList.splice(index,1);
                    this.Curentshedulecourt.TeamAPlayerName=obj.Player1Name;
                    this.Curentshedulecourt.TeamA=true;
                    this.Curentshedulecourt.TeamAPlayerId=obj._id;
                    this.Curentshedulecourt.TeamAPlayer1Id=obj.Player1Id;
                }
        
            }
        
           
}

        //function for select TeamAplayers in singles list.
        SelectTeamBplayersSingles(obj){
             if(this.Curentshedulecourt.TeamAPlayerName===undefined){
                this.SelectedfirstTeamb=true;
                let  index = this.TeamAPlayersList.map(function(obj) {return obj._id;}).indexOf(obj._id);
                this.TeamAPlayersList.splice(index,1);
                this.Curentshedulecourt.TeamBPlayerName=obj.Player1Name;
                this.Curentshedulecourt.TeamBPlayerId=obj.PlayerID;
                this.Curentshedulecourt.TeamAPlayer1Id=obj.Player1Id;
                this.Curentshedulecourt.TeamB=true;

            }else{
                if(this.Curentshedulecourt.TeamBPlayerName!=undefined ){
                    let  index =this.SinglesList.map(function(obj) {return obj._id;}).indexOf(this.Curentshedulecourt.TeamBPlayerId);
                    let addobj=this.SinglesList[index];
                    this.TeamAPlayersList.push(addobj);
                    let  index1 =this.TeamAPlayersList.map(function(obj) {return obj._id;}).indexOf(obj._id);
                    this.TeamAPlayersList.splice(index1,1);
                    this.Curentshedulecourt.TeamBPlayerName=obj.Player1Name;
                    this.Curentshedulecourt.TeamBPlayer1Id=obj.Player1Id;
                    this.Curentshedulecourt.TeamBPlayerId=obj._id;
                }else{
                    let  index =this.TeamAPlayersList.map(function(obj) {return obj._id;}).indexOf(obj._id);
                    this.TeamAPlayersList.splice(index,1);
                    this.Curentshedulecourt.TeamBPlayerName=obj.Player1Name;
                    this.Curentshedulecourt.TeamBPlayerId=obj._id;
                    this.Curentshedulecourt.TeamBPlayer1Id=obj.Player1Id;
                    this.Curentshedulecourt.TeamB=true;
                }
        
            }
        }

    //function for select TeamAplayers in doubles list.
    SelectTeamAplayersDoubles(obj){
       if(this.Curentshedulecourt.TeamBPlayerName===undefined && this.Curentshedulecourt.TeamAPlayerName===undefined){
                let  index = this.TeamBPlayersList.map(function(obj) {return obj._id;}).indexOf(obj._id);
                this.TeamBPlayersList.splice(index,1);
                this.Curentshedulecourt.TeamAPlayerName=obj.Player1Name;
                this.Curentshedulecourt.TeamAPlayerName1=obj.Player2Name;
                this.Curentshedulecourt.TeamAPlayerId=obj._id;
                this.Curentshedulecourt.TeamAPlayer1Id=obj.Player1Id;
                this.Curentshedulecourt.TeamAPlayer2Id=obj.Player2Id;
                this.Curentshedulecourt.TeamA=true;

            }else{
                if(this.Curentshedulecourt.TeamAPlayerName!=undefined ){
                    let  index =this.DoublesList.map(function(obj) {return obj._id;}).indexOf(this.Curentshedulecourt.TeamAPlayerId);
                    let addobj=this.DoublesList[index];
                    this.TeamBPlayersList.push(addobj);
                    let  index1 =this.TeamBPlayersList.map(function(obj) {return obj._id;}).indexOf(obj._id);
                    this.TeamBPlayersList.splice(index1,1);
                    this.Curentshedulecourt.TeamAPlayerName=obj.Player1Name;
                    this.Curentshedulecourt.TeamAPlayerName1=obj.Player2Name;
                    this.Curentshedulecourt.TeamAPlayerId=obj._id;
                     this.Curentshedulecourt.TeamAPlayer1Id=obj.Player1Id;
                this.Curentshedulecourt.TeamAPlayer2Id=obj.Player2Id;
                }else{
                     let  index =this.TeamBPlayersList.map(function(obj) {return obj._id;}).indexOf(obj._id);
                    this.TeamBPlayersList.splice(index,1);
                    this.Curentshedulecourt.TeamAPlayerName=obj.Player1Name;
                    this.Curentshedulecourt.TeamAPlayerName1=obj.Player2Name;
                    this.Curentshedulecourt.TeamAPlayerId=obj._id;
                    this.Curentshedulecourt.TeamAPlayer1Id=obj.Player1Id;
                    this.Curentshedulecourt.TeamAPlayer2Id=obj.Player2Id;
                    this.Curentshedulecourt.TeamA=true;
                }
            }   
}

        
        //function for select TeamAplayers in doubles list.
        SelectTeamBplayersDoubles(obj){
                if(this.Curentshedulecourt.TeamAPlayerName===undefined){
                this.SelectedfirstTeamb=true;
                let  index = this.TeamAPlayersList.map(function(obj) {return obj._id; }).indexOf(obj._id);
                this.TeamAPlayersList.splice(index,1);
                this.Curentshedulecourt.TeamBPlayerName=obj.Player1Name;
                this.Curentshedulecourt.TeamBPlayerName1=obj.Player2Name;
                this.Curentshedulecourt.TeamBPlayerId=obj._id;
                this.Curentshedulecourt.TeamBPlayer1Id=obj.Player1Id;
                this.Curentshedulecourt.TeamBPlayer2Id=obj.Player2Id;
                this.Curentshedulecourt.TeamB=true;

            }else{
                if(this.Curentshedulecourt.TeamBPlayerName!=undefined ){
                    let  index =this.DoublesList.map(function(obj) {return obj._id; }).indexOf(this.Curentshedulecourt.TeamBPlayerId);
                    let addobj=this.DoublesList[index];
                    this.TeamAPlayersList.push(addobj);
                    let  index1 =this.TeamAPlayersList.map(function(obj) {return obj._id; }).indexOf(obj._id);
                    this.TeamAPlayersList.splice(index1,1);
                    this.Curentshedulecourt.TeamBPlayerName=obj.Player1Name;
                    this.Curentshedulecourt.TeamBPlayerName1=obj.Player2Name;
                    this.Curentshedulecourt.TeamBPlayerId=obj._id;
                    this.Curentshedulecourt.TeamBPlayer1Id=obj.Player1Id;
                    this.Curentshedulecourt.TeamBPlayer2Id=obj.Player2Id;
                }else{
                    let  index =this.TeamAPlayersList.map(function(obj) {return obj._id; }).indexOf(obj._id);
                    this.TeamAPlayersList.splice(index,1);
                    this.Curentshedulecourt.TeamBPlayerName=obj.Player1Name;
                    this.Curentshedulecourt.TeamBPlayerName1=obj.Player2Name;
                    this.Curentshedulecourt.TeamBPlayerId=obj._id;
                    this.Curentshedulecourt.TeamBPlayer1Id=obj.Player1Id;
                    this.Curentshedulecourt.TeamBPlayer2Id=obj.Player2Id;
                    this.Curentshedulecourt.TeamB=true;
                }
        
            }
        }


        //function for Selected Format.
        SelectedFormat(obj){
             this.Curentshedulecourt.ForMate=obj.FormatName;
             this.Curentshedulecourt.ForMateId=obj._id;

             this.Curentshedulecourt.format=true;
        }
        
    //function for selected selectreferee.
    selectreferee(obj){
        this.Curentshedulecourt.RefereeName=obj.RefereeName;
        this.Curentshedulecourt.RefereeNameId=obj.RefereeId;
        this.Curentshedulecourt.refere=true;
    }

    //function for SheduleCourt.
    SheduleCourt(){
        let Alert=false;
        let Alertmsg;
        if(this.Curentshedulecourt.court===undefined){
            Alert=true;
            Alertmsg=" Select Court Number"
        }else if(this.Curentshedulecourt.Evente===undefined){
            Alert=true;
            Alertmsg=" Select Event Name"
        }else if(this.Curentshedulecourt.TeamA===undefined){
            Alert=true;
            Alertmsg=" Select TeamA players Names"
        }else if(this.Curentshedulecourt.TeamB===undefined){
            Alert=true;
            Alertmsg=" Select TeamB players Names"
        }else if(this.Curentshedulecourt.format===undefined){
            Alert=true;
            Alertmsg=" Select Game format"
        }else if(this.Curentshedulecourt.refere===undefined){
            Alert=true;
            Alertmsg=" Select refere Name"
        }else if(Alert===false){
            this.TeamAPlayersList=[];
            this.TeamBPlayersList=[];
            let courtindex=this.ScheduleMatchDetailes.Courts.map(function(obj) {return obj._id; }).indexOf(this.Curentshedulecourt.courtId);
            this.ScheduleMatchDetailes.Courts.splice(courtindex,1);
            let refereindex=this.ScheduleMatchDetailes.Referee.map(function(obj) {return obj.RefereeId;}).indexOf(this.Curentshedulecourt.RefereeNameId);
            this.ScheduleMatchDetailes.Referee.splice(refereindex,1);

                 this.finalresponseobj();
        }
        if(Alert===true){
                let prompt = this.alertCtrl.create({
        					      	message: Alertmsg,
        					      
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
                  let teamids:any=[];
                  teamids.push(this.Curentshedulecourt.TeamAPlayerId);
                  teamids.push(this.Curentshedulecourt.TeamBPlayerId);
                  let parametersobj:any={};
                  parametersobj.Time=strTime;
                  parametersobj.CourtId=this.Curentshedulecourt.courtId;
                  parametersobj.CourtNo=this.Curentshedulecourt.CourtNo;
                  parametersobj.EventId=this.Curentshedulecourt.EventId;
                  parametersobj.FormatId=this.Curentshedulecourt.ForMateId;
                  parametersobj.TeamA_Player1_Id= this.Curentshedulecourt.TeamAPlayer1Id;
                  parametersobj.TeamB_Player1_Id= this.Curentshedulecourt.TeamBPlayer1Id;
                  parametersobj.RefereeId= this.Curentshedulecourt.RefereeNameId;
                  parametersobj.RefereeName= this.Curentshedulecourt.RefereeName;
                  parametersobj.TournamentOwner=this.ScheduleMatchDetailes.TournamentId;
                  parametersobj.TournamentId=this.ScheduleMatchDetailes.TournamentId;

                  parametersobj.TeamIds=teamids;
                this.service.ScheduleMatch(parametersobj).subscribe(response => {
                    this.ScheduleMatchDetailes.Matchs.unshift(response);

                },err =>{
                });
                 this.SelectedEventName=null;
                 this.SelectedFormatName=null;
        }else if(this.Curentshedulecourt.Event==="Doubles"){
        		let date:any = new Date();
        	 	let hours:any = date.getHours();
  				let minutes:any = date.getMinutes();
  				let ampm:any = hours >= 12 ? 'pm' : 'am';
  				hours = hours % 12;
  				hours = hours ? hours : 12; // the hour '0' should be '12'
  				minutes = minutes < 10 ? '0'+minutes : minutes;
  				let strTime:any = hours + ':' + minutes + ' ' + ampm;

                  let teamids:any=[];
                  teamids.push(this.Curentshedulecourt.TeamAPlayerId);
                  teamids.push(this.Curentshedulecourt.TeamBPlayerId);
                  let parametersobj:any={};
                  parametersobj.Time=strTime;
                  parametersobj.CourtId=this.Curentshedulecourt.courtId;
                  parametersobj.CourtNo=this.Curentshedulecourt.CourtNo;
                  parametersobj.EventId=this.Curentshedulecourt.EventId;
                  parametersobj.FormatId=this.Curentshedulecourt.ForMateId;
                  parametersobj.TeamA_Player1_Id= this.Curentshedulecourt.TeamAPlayer1Id;
                  parametersobj.TeamA_Player2_Id= this.Curentshedulecourt.TeamAPlayer2Id;
                  parametersobj.TeamB_Player1_Id= this.Curentshedulecourt.TeamBPlayer1Id;
                  parametersobj.TeamB_Player2_Id= this.Curentshedulecourt.TeamBPlayer2Id;
                  parametersobj.RefereeId= this.Curentshedulecourt.RefereeNameId;
                  parametersobj.RefereeName= this.Curentshedulecourt.RefereeName;
                  parametersobj.TeamIds=teamids;
                  parametersobj.TournamentId=this.ScheduleMatchDetailes.TournamentId;
                this.service.ScheduleMatch(parametersobj).subscribe(response => {
                    this.ScheduleMatchDetailes.Matchs.unshift(response);
                },err =>{
                });
                this.SelectedEventName=null;
                this.SelectedFormatName=null;
    }
     this.Curentshedulecourt={};
    }         

    //function for move to score board.
     NextPage(obj){
       if(obj.twopointse){
            this.navCtrl.push(Refereescoreboardwinby2Page,obj);
         }else{
            this.navCtrl.push(Refereescoreboardwinby1Page, obj); 
         }
     }
     //function for delete match.
     deleteMatch(id){
         this.service.deletematches(id).subscribe(response => {
             let index=this.ScheduleMatchDetailes.Matchs.map(function(obj){return obj._id;}).indexOf(id);
             this.ScheduleMatchDetailes.Matchs.splice(index,1);
        	},err =>{
        });
     }
     //function for tournament director viwe on live score board
     LiveScoreboard(id){
         this.service.tournamentDirectoreLiveScore(id).subscribe(response=>{
            if(response.Matchs.GameFormat==="1 To 15 Win By 1" || response.Matchs.GameFormat==="1 To 21 Win By 1"){
               this.navCtrl.push(Livescoreboardwinnby1Page,response.Matchs).then(() => {
                    this.navCtrl.remove(0);
                });
            }else{
                this.navCtrl.push(Livescoreboardwinnby2Page,response.Matchs).then(() => {
                    this.navCtrl.remove(0);
                });
            }
             
         },err=>{
         })
     }
     //function for logout.
     logout(){
        this.storage.clear().then(()=>{
            this.navCtrl.push(HomePage).then(() => {
                this.navCtrl.remove(0);
            });
        //    this.navCtrl.push();
        });
     }

}
