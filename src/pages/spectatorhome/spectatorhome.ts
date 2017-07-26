import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import {Livescoreboardwinnby1Page} from '../livescoreboardwinnby1/livescoreboardwinnby1';
import {PickleBallservices} from '../../providers/pickle-ballservices';
import {Livescoreboardwinnby2Page} from '../livescoreboardwinnby2/livescoreboardwinnby2';


/*
  Generated class for the Spectatorhome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-spectatorhome',
  templateUrl: 'spectatorhome.html',
  providers:[PickleBallservices]
})
export class SpectatorhomePage {
  Turnamentes:any;
  socket:any;
  TournamentId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:PickleBallservices,public viewCtrl:ViewController) {
  }
  SelectTournament(id){
       this.TournamentId=id;
      this.service.SpectatorGetMatches(id).subscribe(response => {
            this.Turnamentes=response.Matchs;
           this.service.socket.on('livescore'+this.TournamentId, (response) => {
                let  index1 = this.Turnamentes.map(function(obj) {return obj._id;}).indexOf(response.MatchId);
                if(index1 !==-1){
                    this.Turnamentes[index1].TeamAPoints=response.TeamAPoints;
                    this.Turnamentes[index1].TeamBPoints=response.TeamBPoints;
                    this.Turnamentes[index1].Team1Active=response.Team1Active;
                    this.Turnamentes[index1].Team2Active=response.Team2Active;
                    this.Turnamentes[index1].GameStatus=response.GameStatus;
                }
            });
       },err =>{
      }); 
  }
    //function for tournament director viwe on live score board
    LiveScoreboard(id){
        this.service.spectatorLiveScore(id).subscribe(response=>{
            response.Matchs.Logout=false;
          if(response.Matchs.GameFormat==="1 To 15 Win By 1" || response.Matchs.GameFormat==="1 To 21 Win By 1"){
               this.navCtrl.push(Livescoreboardwinnby1Page,response.Matchs);
            }else{
              this.navCtrl.push(Livescoreboardwinnby2Page,response.Matchs);
            } 
        },err=>{
        })
    }

  //function for back to home page.
  // backtohome(){
  //   // this.TournamentId=null;
  //    this.navCtrl.push(HomePage).then(() => {
  //     this.navCtrl.remove(0);
  //   }); 
  // }

}
