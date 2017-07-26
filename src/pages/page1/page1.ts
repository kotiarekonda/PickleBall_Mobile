import { Component } from '@angular/core';
import { NavController, NavParams,AlertController} from 'ionic-angular';
/*
  Generated class for the Page1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1Page {
        shedulecourtList;
        courtlist;
        MensDoubles4to5;
        MensDoubles5to0;
        WomensDoubles5to0;
        MensSingles4to0;
        WomensSingles4to5;
        Referees;
        SinglesList;
        DoublesList;
        Curentshedulecourt:any={};
        TeamBPlayersList=[];
        TeamAPlayersList=[];
        SelectedfirstTeamb=false;
        ShedulecourtListArray=[];
        SelectedEventName=null;
        SelectedFormatName=null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}

 
    PickleBallDetailes={

            "CourtsListArray":[{"Id":1,"courtnumber":1,"courtName":"Court1","Selected":false},
                                {"Id":2,"courtnumber":2,"courtName":"Court2","Selected":false},
                                {"Id":3,"courtnumber":3,"courtName":"Court3","Selected":false},
                                {"Id":4,"courtnumber":4,"courtName":"Court4","Selected":false},
                                {"Id":5,"courtnumber":5,"courtName":"Court5","Selected":false},
                                {"Id":6,"courtnumber":6,"courtName":"Court6","Selected":false},
                                {"Id":7,"courtnumber":7,"courtName":"Court7","Selected":false},
                                {"Id":8,"courtnumber":8,"courtName":"Court8","Selected":false},
                                {"Id":9,"courtnumber":9,"courtName":"Court9","Selected":false},
                                {"Id":10,"courtnumber":10,"courtName":"Court10","Selected":false},
                                {"Id":11,"courtnumber":11,"courtName":"Court11","Selected":false},
                                {"Id":12,"courtnumber":12,"courtName":"Court12","Selected":false},
                                {"Id":13,"courtnumber":13,"courtName":"Court13","Selected":false},
                                {"Id":14,"courtnumber":14,"courtName":"Court14","Selected":false},
                                {"Id":15,"courtnumber":15,"courtName":"Court15","Selected":false},
                                {"Id":16,"courtnumber":16,"courtName":"Court16","Selected":false},
                                {"Id":17,"courtnumber":17,"courtName":"Court17","Selected":false},
                                {"Id":18,"courtnumber":19,"courtName":"Court19","Selected":false},
                                {"Id":20,"courtnumber":20,"courtName":"Court20","Selected":false},
                                {"Id":21,"courtnumber":21,"courtName":"Court21","Selected":false},
                                {"Id":22,"courtnumber":22,"courtName":"Court22","Selected":false},
                                {"Id":23,"courtnumber":23,"courtName":"Court23","Selected":false},
                                {"Id":24,"courtnumber":24,"courtName":"Court24","Selected":false},
                                {"Id":25,"courtnumber":25,"courtName":"Court25","Selected":false},
                                {"Id":26,"courtnumber":26,"courtName":"Court26","Selected":false},
                                {"Id":27,"courtnumber":27,"courtName":"Court27","Selected":false},
                                {"Id":28,"courtnumber":28,"courtName":"Court28","Selected":false},
                                {"Id":29,"courtnumber":29,"courtName":"Court29","Selected":false},
                                {"Id":30,"courtnumber":30,"courtName":"Court30","Selected":false},
                                {"Id":31,"courtnumber":31,"courtName":"Court31","Selected":false},
                                {"Id":32,"courtnumber":32,"courtName":"Court32","Selected":false},
                                {"Id":33,"courtnumber":33,"courtName":"Court33","Selected":false},
                                {"Id":34,"courtnumber":34,"courtName":"Court34","Selected":false},
                                {"Id":35,"courtnumber":35,"courtName":"Court35","Selected":false}
                ],

                 "EventNamesArray":[
                                    {"EventNameType":"singles","EventName":"Mens Singles 4.0"},
                                    {"EventNameType":"Doubles","EventName":"Mens Doubles 4.5"},
                                    {"EventNameType":"Doubles","EventName":"Mens Doubles 5.0"},
                                    {"EventNameType":"Doubles","EventName":"Womens Doubles 5.0"},
                                    {"EventNameType":"singles","EventName":"Womens Singles 4.5"}
                ],
                "MensDoubles4.5":[
                                    {"PlayerID":1,"firstPlayer":"Joe Smith","slash":"/","secondplayer":"Ryan Clark","Selected":false,"Event":"Doubles"},
                                    {"PlayerID":2,"firstPlayer":"Ben Davis","slash":"/","secondplayer":"Tison Holmes","Selected":false,"Event":"Doubles"},
                                    {"PlayerID":3,"firstPlayer":"Will Monts","slash":"/","secondplayer":"Lonnie Crank","Selected":false,"Event":"Doubles"},
                                    {"PlayerID":4,"firstPlayer":"Steve Young","slash":"/","secondplayer":"Marcus Smart","Selected":false,"Event":"Doubles"}
                ],
                "MensDoubles5.0":[
                                    {"PlayerID":5,"firstPlayer":"Jason Smith","slash":"/","secondplayer":"Ryan Loops","Selected":false,"Event":"Doubles"},
                                    {"PlayerID":6,"firstPlayer":"Mason Davis","slash":"/","secondplayer":"Tyson Lobbing","Selected":false,"Event":"Doubles"},
                                    {"PlayerID":7,"firstPlayer":"Devin Monts","slash":"/","secondplayer":"Lonnie Williams","Selected":false,"Event":"Doubles"},
                                    {"PlayerID":8,"firstPlayer":"Steve Lopez","slash":"/","secondplayer":"Marcus Vans","Selected":false,"Event":"Doubles"}
                ], 
                "WomensDoubles5.0":[{"PlayerID":9,"firstPlayer":"Jennifer Hooper","slash":"/","secondplayer":"Sally Banks","Selected":false,"Event":"Doubles"},
                                    {"PlayerID":10,"firstPlayer":"Christine Samuels","slash":"/", "secondplayer":"Kristi Dean","Selected":false,"Event":"Doubles"},
                                    {"PlayerID":11,"firstPlayer":"Francine Jewel","slash":"/","secondplayer":"Alice Hurst","Selected":false,"Event":"Doubles"},
                                    {"PlayerID":12,"firstPlayer":"Gail Cook","slash":"/","secondplayer":"Lisa Smith","Selected":false,"Event":"Doubles"}
                ],
                "MensSingles4.0":[
                                {"PlayerID":13,"singlePlayer":"Ty McGirt","Selected":false,"Event":"Singles"},
                                {"PlayerID":14,"singlePlayer":"Eric Ross","Selected":false,"Event":"Singles"},
                                {"PlayerID":15,"singlePlayer":"Steve Thomas","Selected":false,"Event":"Singles"},
                                {"PlayerID":16,"singlePlayer":"Paul Dinks","Selected":false,"Event":"Singles"}
                ],

                "WomensSingles4.5":[
                                    {"PlayerID":17,"singlePlayer":"Bonnie Hart","Selected":false,"Event":"Singles"},
                                    {"PlayerID":18,"singlePlayer":"Jane Adams","Selected":false,"Event":"Singles"},
                                    {"PlayerID":19,"singlePlayer":"Denise Martin","Selected":false,"Event":"Singles"},
                                    {"PlayerID":20,"singlePlayer":"Julie Taylor","Selected":false,"Event":"Singles"}

                ],
                "Referees": [
                                    {"RefereeId":1, "RefereeName":" Chris Gatling","Selected":false},
                                    {"RefereeId":2, "RefereeName":"Byron Franks","Selected":false},
                                    {"RefereeId":3,"RefereeName":"Jim Hacker","Selected":false},
                                    {"RefereeId":4,"RefereeName":"Tom Tooper","Selected":false},
                                    {"RefereeId":5,"RefereeName":"Bob Karl","Selected":false}
                ]
        }
        ionViewDidLoad(){
            this.courtlist=this.PickleBallDetailes.CourtsListArray;
            this.MensDoubles4to5=this.PickleBallDetailes["MensDoubles4.5"]
            this.MensDoubles5to0=this.PickleBallDetailes["MensDoubles5.0"]
            this.WomensDoubles5to0=this.PickleBallDetailes["WomensDoubles5.0"]
            this.MensSingles4to0=this.PickleBallDetailes["MensSingles4.0"]
            this.WomensSingles4to5=this.PickleBallDetailes["WomensSingles4.5"]
            this.Referees=this.PickleBallDetailes["Referees"]
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

        if(obj.EventNameType==="singles"){
            if(obj.EventName==="Mens Singles 4.0"){
                this.TeamAPlayersList=[];
                this.TeamBPlayersList=[];
                 this.Curentshedulecourt.Event="singles";
                 this.Curentshedulecourt.EventName=obj.EventName;
                 this.SinglesList=this.MensSingles4to0.slice(0);
                 this.TeamAPlayersList=this.SinglesList.slice(0);
                 this.TeamBPlayersList=this.SinglesList.slice(0);
                 this.Curentshedulecourt.Evente=true;
            }else if(obj.EventName==="Womens Singles 4.5"){
                this.TeamAPlayersList=[];
                this.TeamBPlayersList=[];
                this.Curentshedulecourt.Event="singles";
                this.Curentshedulecourt.EventName=obj.EventName;
                this.SinglesList= this.WomensSingles4to5.slice(0);
                this.TeamAPlayersList=this.SinglesList.slice(0);
                this.TeamBPlayersList=this.SinglesList.slice(0);
                this.Curentshedulecourt.Evente=true;
            }

        }else if(obj.EventNameType==="Doubles"){
            if(obj.EventName==="Mens Doubles 4.5"){
                this.TeamAPlayersList=[];
                this.TeamBPlayersList=[];
                this.Curentshedulecourt.Event="Doubles";
                this.Curentshedulecourt.EventName=obj.EventName;
                this.DoublesList=this.MensDoubles4to5.slice(0);
                this.TeamAPlayersList=this.DoublesList.slice(0);
                this.TeamBPlayersList=this.DoublesList.slice(0);
                this.Curentshedulecourt.Evente=true;
            }else if(obj.EventName==="Mens Doubles 5.0"){
                this.TeamAPlayersList=[];
                this.TeamBPlayersList=[];
                this.Curentshedulecourt.Event="Doubles";
                this.Curentshedulecourt.EventName=obj.EventName;
                this.DoublesList=this.MensDoubles5to0.slice(0);
                this.TeamAPlayersList=this.DoublesList.slice(0);
                this.TeamBPlayersList=this.DoublesList.slice(0);
                this.Curentshedulecourt.Evente=true;
            }else if(obj.EventName==="Womens Doubles 5.0"){
                this.TeamAPlayersList=[];
                this.TeamBPlayersList=[];
                this.Curentshedulecourt.Event="Doubles";
                this.Curentshedulecourt.EventName=obj.EventName;
                this.DoublesList=this.WomensDoubles5to0.slice(0);
                this.TeamAPlayersList=this.DoublesList.slice(0);
                this.TeamBPlayersList=this.DoublesList.slice(0);
                this.Curentshedulecourt.Evente=true;
            }
        }
        
    }


    //function for select TeamAplayers in singles list.
    SelectTeamAplayersSingles(obj){
            if(this.Curentshedulecourt.TeamBPlayerName===undefined && this.Curentshedulecourt.TeamAPlayerName===undefined){
                let  index = this.TeamBPlayersList.map(function(obj) {return obj.PlayerID; }).indexOf(obj.PlayerID);
                this.TeamBPlayersList.splice(index,1);
                this.Curentshedulecourt.TeamAPlayerName=obj.singlePlayer;
                this.Curentshedulecourt.TeamAPlayerId=obj.PlayerID;
                this.Curentshedulecourt.TeamA=true;
            }else{
                if(this.Curentshedulecourt.TeamAPlayerName!=undefined ){
                    let  index =this.SinglesList.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamAPlayerId);
                    let addobj=this.SinglesList[index];
                    this.TeamBPlayersList.push(addobj);
                    let  index1 =this.TeamBPlayersList.map(function(obj) {return obj.PlayerID; }).indexOf(obj.PlayerID);
                    this.TeamBPlayersList.splice(index1,1);
                    this.Curentshedulecourt.TeamAPlayerName=obj.singlePlayer;
                    this.Curentshedulecourt.TeamAPlayerId=obj.PlayerID;
                }else{
                    let  index =this.TeamBPlayersList.map(function(obj) {return obj.PlayerID; }).indexOf(obj.PlayerID);
                    this.TeamBPlayersList.splice(index,1);
                    this.Curentshedulecourt.TeamAPlayerName=obj.singlePlayer;
                    this.Curentshedulecourt.TeamA=true;
                    this.Curentshedulecourt.TeamAPlayerId=obj.PlayerID;
                }
        
            }
        
           
}

        //function for select TeamAplayers in singles list.
        SelectTeamBplayersSingles(obj){
             if(this.Curentshedulecourt.TeamAPlayerName===undefined){
                this.SelectedfirstTeamb=true;
                let  index = this.TeamAPlayersList.map(function(obj) {return obj.PlayerID; }).indexOf(obj.PlayerID);
                this.TeamAPlayersList.splice(index,1);
                this.Curentshedulecourt.TeamBPlayerName=obj.singlePlayer;
                this.Curentshedulecourt.TeamBPlayerId=obj.PlayerID;
                this.Curentshedulecourt.TeamB=true;

            }else{
                if(this.Curentshedulecourt.TeamBPlayerName!=undefined ){
                    let  index =this.SinglesList.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamBPlayerId);
                    let addobj=this.SinglesList[index];
                    this.TeamAPlayersList.push(addobj);
                    let  index1 =this.TeamAPlayersList.map(function(obj) {return obj.PlayerID; }).indexOf(obj.PlayerID);
                    this.TeamAPlayersList.splice(index1,1);
                    this.Curentshedulecourt.TeamBPlayerName=obj.singlePlayer;
                    this.Curentshedulecourt.TeamBPlayerId=obj.PlayerID;
                }else{
                    let  index =this.TeamAPlayersList.map(function(obj) {return obj.PlayerID; }).indexOf(obj.PlayerID);
                    this.TeamAPlayersList.splice(index,1);
                    this.Curentshedulecourt.TeamBPlayerName=obj.singlePlayer;
                    this.Curentshedulecourt.TeamBPlayerId=obj.PlayerID;
                    this.Curentshedulecourt.TeamB=true;
                }
        
            }
        }

    //function for select TeamAplayers in doubles list.
    SelectTeamAplayersDoubles(obj){
       if(this.Curentshedulecourt.TeamBPlayerName===undefined && this.Curentshedulecourt.TeamAPlayerName===undefined){
                let  index = this.TeamBPlayersList.map(function(obj) {return obj.PlayerID; }).indexOf(obj.PlayerID);
                this.TeamBPlayersList.splice(index,1);
                this.Curentshedulecourt.TeamAPlayerName=obj.firstPlayer;
                this.Curentshedulecourt.TeamAPlayerName1=obj.secondplayer;
                this.Curentshedulecourt.TeamAPlayerId=obj.PlayerID;
                this.Curentshedulecourt.TeamA=true;

            }else{
                if(this.Curentshedulecourt.TeamAPlayerName!=undefined ){
                    let  index =this.DoublesList.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamAPlayerId);
                    let addobj=this.DoublesList[index];
                    this.TeamBPlayersList.push(addobj);
                    let  index1 =this.TeamBPlayersList.map(function(obj) {return obj.PlayerID; }).indexOf(obj.PlayerID);
                    this.TeamBPlayersList.splice(index1,1);
                    this.Curentshedulecourt.TeamAPlayerName=obj.firstPlayer;
                    this.Curentshedulecourt.TeamAPlayerName1=obj.secondplayer;
                    this.Curentshedulecourt.TeamAPlayerId=obj.PlayerID;
                }else{
                     let  index =this.TeamBPlayersList.map(function(obj) {return obj.PlayerID; }).indexOf(obj.PlayerID);
                    this.TeamBPlayersList.splice(index,1);
                    this.Curentshedulecourt.TeamAPlayerName=obj.firstPlayer;
                    this.Curentshedulecourt.TeamAPlayerName1=obj.secondplayer;
                    this.Curentshedulecourt.TeamAPlayerId=obj.PlayerID;
                    this.Curentshedulecourt.TeamA=true;
                }
            }   
}

        
        //function for select TeamAplayers in doubles list.
        SelectTeamBplayersDoubles(obj){
                if(this.Curentshedulecourt.TeamAPlayerName===undefined){
                this.SelectedfirstTeamb=true;
                let  index = this.TeamAPlayersList.map(function(obj) {return obj.PlayerID; }).indexOf(obj.PlayerID);
                this.TeamAPlayersList.splice(index,1);
                this.Curentshedulecourt.TeamBPlayerName=obj.firstPlayer;
                this.Curentshedulecourt.TeamBPlayerName1=obj.secondplayer;
                this.Curentshedulecourt.TeamBPlayerId=obj.PlayerID;
                this.Curentshedulecourt.TeamB=true;

            }else{
                if(this.Curentshedulecourt.TeamBPlayerName!=undefined ){
                    let  index =this.DoublesList.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamBPlayerId);
                    let addobj=this.DoublesList[index];
                    this.TeamAPlayersList.push(addobj);
                    let  index1 =this.TeamAPlayersList.map(function(obj) {return obj.PlayerID; }).indexOf(obj.PlayerID);
                    this.TeamAPlayersList.splice(index1,1);
                    this.Curentshedulecourt.TeamBPlayerName=obj.firstPlayer;
                    this.Curentshedulecourt.TeamBPlayerName1=obj.secondplayer;
                    this.Curentshedulecourt.TeamBPlayerId=obj.PlayerID;
                }else{
                    let  index =this.TeamAPlayersList.map(function(obj) {return obj.PlayerID; }).indexOf(obj.PlayerID);
                    this.TeamAPlayersList.splice(index,1);
                    this.Curentshedulecourt.TeamBPlayerName=obj.firstPlayer;
                    this.Curentshedulecourt.TeamBPlayerName1=obj.secondplayer;
                    this.Curentshedulecourt.TeamBPlayerId=obj.PlayerID;
                    this.Curentshedulecourt.TeamB=true;
                }
        
            }
        }


        //function for Selected Format.
        SelectedFormat(str){
             this.Curentshedulecourt.ForMate=str;
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
            let courtindex=this.courtlist.map(function(obj) {return obj.Id; }).indexOf(this.Curentshedulecourt.courtId);
            this.courtlist.splice(courtindex,1);
            if(this.Curentshedulecourt.Event==="Doubles"){
                    if(this.Curentshedulecourt.EventName==="Mens Doubles 4.5"){
                        let teamAindex=this.MensDoubles4to5.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamAPlayerId);
                        this.MensDoubles4to5.splice(teamAindex,1);
                        let teamBindex=this.MensDoubles4to5.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamBPlayerId);
                        this.MensDoubles4to5.splice(teamBindex,1);
                    }else if(this.Curentshedulecourt.EventName==="Womens Doubles 5.0"){
                        let teamAindex=this.WomensDoubles5to0.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamAPlayerId);
                        this.WomensDoubles5to0.splice(teamAindex,1);
                        let teamBindex=this.WomensDoubles5to0.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamBPlayerId);
                        this.WomensDoubles5to0.splice(teamBindex,1);

                    }else if(this.Curentshedulecourt.EventName==="Mens Doubles 5.0"){
                         let teamAindex=this.MensDoubles5to0.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamAPlayerId);
                        this.MensDoubles5to0.splice(teamAindex,1);
                        let teamBindex=this.MensDoubles5to0.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamBPlayerId);
                        this.MensDoubles5to0.splice(teamBindex,1);
                    }
            }else if(this.Curentshedulecourt.Event==="singles"){
                    if(this.Curentshedulecourt.EventName==="Womens Singles 4.5"){
                        
                        let teamAindex=this.WomensSingles4to5.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamAPlayerId);
                        this.WomensSingles4to5.splice(teamAindex,1);
                        let teamBindex=this.WomensSingles4to5.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamBPlayerId);
                        this.WomensSingles4to5.splice(teamBindex,1);
                    }else if(this.Curentshedulecourt.EventName==="Mens Singles 4.0"){
                        let teamAindex=this.MensSingles4to0.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamAPlayerId);
                        this.MensSingles4to0.splice(teamAindex,1);
                        let teamBindex=this.MensSingles4to0.map(function(obj) {return obj.PlayerID; }).indexOf(this.Curentshedulecourt.TeamBPlayerId);
                        this.MensSingles4to0.splice(teamBindex,1);

                    }
            }
            let refereindex=this.Referees.map(function(obj) {return obj.RefereeId;}).indexOf(this.Curentshedulecourt.RefereeNameId);
            this.Referees.splice(refereindex,1);

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
                obj.GameFormat=this.Curentshedulecourt.ForMate;
                obj.courtNumber=this.Curentshedulecourt.courtNumber;
                obj.court=this.Curentshedulecourt.courtName;
                obj.Event="singles";
                obj.Serve=false;
                obj.Time=strTime;
                obj.Team1=teamA;
                obj.Team2=teamB;
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
                obj.GameFormat=this.Curentshedulecourt.ForMate;
                obj.courtNumber=this.Curentshedulecourt.courtNumber;
                obj.court=this.Curentshedulecourt.courtName;
                obj.Event="Doubles";
                obj.Serve=false;
                obj.Time=strTime;
                obj.Team1=teamA;
                obj.Team2=teamB;
                this.ShedulecourtListArray.push(obj);
                this.Curentshedulecourt={};
                this.SelectedEventName=null;
                this.SelectedFormatName=null;
    }
     this.Curentshedulecourt={};
    }         

    //function for move to score board.
    //  NextPage(obj){
    //      let data = obj;
    //  	this.navCtrl.push(secondPage, data);
    //  }
}
