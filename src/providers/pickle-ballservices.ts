import { Injectable} from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';

@Injectable()
export class PickleBallservices {
  header: any = {};
  socket:any;
  path ="http://www.rootwinn.com:9005";
//   "http://www.rootwinn.com:9005" server point.
// "http://localhost:9000" local point.
  constructor(public http: Http) {
      this.socket = io(this.path);
  }
 


    //Tournment Directors Login 
    TournmentDirectorsLogin(obj) {
        let response = this.http.post(this.path + '/auth/local', obj)
        .map(res => res.json());
        return response;
    }

    //Tournment Directors Login and get Directors data 
    TournmentDirectorsHomepageonload(obj) {
          let headers = new Headers();
          headers.append('authorization','Bearer '+ obj);
          this.header = new RequestOptions({ headers: headers });
            let response = this.http.get(this.path +'/api/TournamentDetailss',this.header).map(response => response.json());
          return response;
    }
    //function for get event players list.  
    EeventPlayersList(obj) {
          return this.http.post(this.path + '/api/EventPlayerLists/eventbasedplayers',obj).map(response => response.json());
    }

    //Tournment Directors shedule matches.
    ScheduleMatch(obj){
        return this.http.post(this.path + '/api/SheduledMatchess',obj,this.header).map(response => response.json());
    }

    //Referee Login service.
    RefereeLoginService(obj){
        let response=this.http.post(this.path + '/api/SheduledMatchess/refereelogin',obj).map(response => response.json());
        return response;
    }

    //Referee Reload ScoreBoard service.
    RefereeReloadScoreBoard(token){
        let headers = new Headers();
          headers.append('authorization','Bearer '+ token);
          this.header = new RequestOptions({ headers: headers });
          let body = {};
          return this.http.post(this.path + '/api/SheduledMatchess/reloadservice', body, this.header).map(response => response.json());
        
    }
    // Spectator Get Matches service.
    SpectatorGetTournamentList(){
        let response= this.http.get(this.path +'/api/TournamentDetailss/Tournamentlists').map(response => response.json());
        return response
    }

    // Spectator Get Matches service.
    SpectatorGetMatches(id){
        let response= this.http.get(this.path +'/api/SheduledMatchess/spectatormatchs/'+id).map(response => response.json());
        return response
    }

    // Spectator Get Matches service.
    RefereeScoreBoardUpdate(id,obj){
        let response=this.http.put(this.path+'/api/ScoreBoards/'+id,obj).map(response => response.json());
         return response; 
    }

    //tournament directore view on live score service.
    tournamentDirectoreLiveScore(id){
        let obj={};
        let response=this.http.get(this.path+'/api/SheduledMatchess/livescore/'+id,obj).map(response => response.json());
        return response;
    } 

    //spectator view on live score service.
    spectatorLiveScore(id){
        let obj={};
        let response=this.http.get(this.path+'/api/SheduledMatchess/livescore/'+id,obj).map(response => response.json());
        return response;
    } 

    // delete Matches service.
    deletematches(id){
       let body = {};
        return this.http.delete(this.path + '/api/SheduledMatchess/deletematch/'+id,body).map(response => response.json());
    }
    
}



