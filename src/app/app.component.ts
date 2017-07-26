import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';
import{TournamentsdirectorhomePage} from '../pages/tournamentsdirectorhome/tournamentsdirectorhome';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  constructor(platform: Platform,public storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.storage.get('loginUser-Role').then((val)=>{
        if(val==="Tournament Director"){
            this.rootPage = TournamentsdirectorhomePage;
         }else{
          this.rootPage = HomePage;
        }
    });
  }
  

}
