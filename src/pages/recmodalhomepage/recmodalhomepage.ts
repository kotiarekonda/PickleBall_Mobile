import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ModalController } from 'ionic-angular';
import { RecmodescoreboardQuestionmodalPage } from '../recmodescoreboard-questionmodal/recmodescoreboard-questionmodal';
import { WinningdeferencepointstwoscoresPage } from '../winningdeferencepointstwoscores/winningdeferencepointstwoscores';
import { RecmodalScoreBoardPage } from '../recmodal-score-board/recmodal-score-board';
/*
  Generated class for the Recmodalhomepage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recmodalhomepage',
  templateUrl: 'recmodalhomepage.html'
})
export class RecmodalhomepagePage {
        ShedulecourtListArray:any=[];
        Curentshedulecourt:any={};
        SelectedEventName=null;
        SelectedFormatName=null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public Modal:ModalController) {}

 
    PickleBallDetailes={
              "EventNamesArray":[
                                    {"EventNameType":"singles","EventName":"Mens Singles 4.0"},
                                    {"EventNameType":"Doubles","EventName":"Mens Doubles 4.5"},
                                    {"EventNameType":"Doubles","EventName":"Mens Doubles 5.0"},
                                    {"EventNameType":"Doubles","EventName":"Womens Doubles 5.0"},
                                    {"EventNameType":"singles","EventName":"Womens Singles 4.5"}
                ]
                
        }
        ionViewDidLoad(){
            let Questionmodal=this.Modal.create(RecmodescoreboardQuestionmodalPage);
             Questionmodal.present();
		// 	Questionmodal.onDidDismiss(data => {
		// 	 if(data!=undefined){
		// 		 this.FirstServe(data);
		// 	 }
  		// });
       
            //  this.Curentshedulecourt.Referenamemodel=null;
        }

    //function for selected for courts.
    selectCourt(obj){
        if(this.Curentshedulecourt.courtNumber===undefined){
            this.Curentshedulecourt.courtNumber= obj.courtnumber;
            this.Curentshedulecourt.courtName= obj.courtName;
            this.Curentshedulecourt.courtId= obj.Id;
            this.Curentshedulecourt.court=true;
        }else{
            this.Curentshedulecourt.courtNumber= obj.courtnumber;
            this.Curentshedulecourt.courtName=obj.courtName;
            this.Curentshedulecourt.courtId= obj.Id;
            
        }
        
    }
    //function for selected for Eventes.
    SelectEvent(obj){
            this.Curentshedulecourt.courtNumber=1;
            this.Curentshedulecourt.courtName="Court1";
            this.Curentshedulecourt.courtId=1;
            this.Curentshedulecourt.court=true;

        if(obj.EventNameType==="singles"){
                
            if(obj.EventName==="Mens Singles 4.0"){
                 this.Curentshedulecourt.Event="singles";
                 this.Curentshedulecourt.EventName=obj.EventName;
                 this.Curentshedulecourt.TeamAPlayerName="Ty McGirt";
                this.Curentshedulecourt.TeamAPlayerId=4;
                this.Curentshedulecourt.TeamA=true;
                 this.Curentshedulecourt.TeamBPlayerName="Eric Ross";
                this.Curentshedulecourt.TeamBPlayerId=5;
                this.Curentshedulecourt.TeamB=true;
                 this.Curentshedulecourt.Evente=true;
            }else if(obj.EventName==="Womens Singles 4.5"){
                this.Curentshedulecourt.Event="singles";
                this.Curentshedulecourt.EventName=obj.EventName;
                this.Curentshedulecourt.TeamAPlayerName="Jane Adams";
                this.Curentshedulecourt.TeamAPlayerId=4;
                this.Curentshedulecourt.TeamA=true;
                 this.Curentshedulecourt.TeamBPlayerName="Julie Taylor";
                this.Curentshedulecourt.TeamBPlayerId=5;
                this.Curentshedulecourt.TeamB=true;
                this.Curentshedulecourt.Evente=true;
            }

        }else if(obj.EventNameType==="Doubles"){
            this.Curentshedulecourt.TeamAPlayerNameModel="Joe Smith Mason Davis";
            this.Curentshedulecourt.TeamBPlayerNameModel="Will Monts Mason Davis";
            if(obj.EventName==="Mens Doubles 4.5"){
                this.Curentshedulecourt.TeamAPlayerName="Joe Smith";
                this.Curentshedulecourt.TeamAPlayerName1="Mason Davis";
                this.Curentshedulecourt.TeamAPlayerId=4;
                this.Curentshedulecourt.TeamA=true;
                this.Curentshedulecourt.TeamBPlayerName="Will Monts";
                this.Curentshedulecourt.TeamBPlayerName1="Marcus Vans";
                this.Curentshedulecourt.TeamBPlayerId=3;
                this.Curentshedulecourt.TeamB=true;
                this.Curentshedulecourt.Event="Doubles";
                this.Curentshedulecourt.EventName=obj.EventName;
                this.Curentshedulecourt.Evente=true;
            }else if(obj.EventName==="Mens Doubles 5.0"){
                this.Curentshedulecourt.Event="Doubles";
                this.Curentshedulecourt.EventName=obj.EventName;
                this.Curentshedulecourt.Evente=true;
                 this.Curentshedulecourt.TeamAPlayerName="Joe Smith";
                this.Curentshedulecourt.TeamAPlayerName1="Mason Davis";
                this.Curentshedulecourt.TeamAPlayerId=4;
                this.Curentshedulecourt.TeamA=true;
                this.Curentshedulecourt.TeamBPlayerName="Will Monts";
                this.Curentshedulecourt.TeamBPlayerName1="Marcus Vans";
                this.Curentshedulecourt.TeamBPlayerId=3;
                this.Curentshedulecourt.TeamB=true;
                this.Curentshedulecourt.Event="Doubles";
                this.Curentshedulecourt.EventName=obj.EventName;
                this.Curentshedulecourt.Evente=true;
            }else if(obj.EventName==="Womens Doubles 5.0"){
                this.Curentshedulecourt.TeamAPlayerName="Joe Smith";
                this.Curentshedulecourt.TeamAPlayerName1="Sally Banks";
                this.Curentshedulecourt.TeamAPlayerId=4;
                this.Curentshedulecourt.TeamA=true;
                this.Curentshedulecourt.TeamBPlayerName="Gail Cook";
                this.Curentshedulecourt.TeamBPlayerName1="Kristi Dean";
                this.Curentshedulecourt.TeamBPlayerId=3;
                this.Curentshedulecourt.TeamB=true;
                this.Curentshedulecourt.Event="Doubles";
                this.Curentshedulecourt.EventName=obj.EventName;
                this.Curentshedulecourt.Evente=true;
                this.Curentshedulecourt.Event="Doubles";
                this.Curentshedulecourt.EventName=obj.EventName;
                this.Curentshedulecourt.Evente=true;
            }
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
        }else {
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
                }else if(this.Curentshedulecourt.ForMate==="1 to 21 win By 2"){
                    obj.GameFormat='1 to 21';
                    obj.twopointse=true;
                }else{
                     obj.GameFormat=this.Curentshedulecourt.ForMate;
                }
                obj.courtNumber=this.Curentshedulecourt.courtNumber;
                obj.court=this.Curentshedulecourt.courtName;
                obj.Event="singles";
                obj.Serve=false;
                obj.Time=strTime;
                obj.Team1=teamA;
                obj.Team2=teamB;
                this.ShedulecourtListArray=[];
                this.ShedulecourtListArray.push(obj);
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
                }else if(this.Curentshedulecourt.ForMate==="1 to 21 win By 2"){
                    obj.GameFormat='1 to 21';
                    obj.twopointse=true;
                }else{
                     obj.GameFormat=this.Curentshedulecourt.ForMate;
                }
                obj.courtNumber=this.Curentshedulecourt.courtNumber;
                obj.court=this.Curentshedulecourt.courtName;
                obj.Event="Doubles";
                obj.Serve=false;
                obj.Time=strTime;
                obj.Team1=teamA;
                obj.Team2=teamB;
                this.ShedulecourtListArray=[];
                this.ShedulecourtListArray.push(obj);
                this.Curentshedulecourt={};
                this.SelectedEventName=null;
                this.SelectedFormatName=null;
    }
     this.Curentshedulecourt={};
    }         

    //function for move to score board.
     NextPage(obj){
        if(obj.twopointse===undefined){
             this.navCtrl.push(RecmodalScoreBoardPage, obj);
         }else{
            this.navCtrl.push(WinningdeferencepointstwoscoresPage,obj); 
         }
     }

}
