import { StorageService} from './../services/storage.service';
import { ApiService, IPlayer, ISongsRoot, ITopSongs } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, AnimationController } from '@ionic/angular';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  player: IPlayer;
  playerId: string;
  historyArray: string[];
  weeklyChange: number;
  countryFlag: string;
  TopSongs: ISongsRoot;
  RecentSongs: ISongsRoot;

  constructor(
    private ApiService: ApiService,
    private storage: StorageService,
    public alertController: AlertController,
    private animationCtrl: AnimationController
    ) {}

  ngOnInit() {
    
  }
  getPlayerFull(PlayerId){
    return this.ApiService.getProfileData(PlayerId).subscribe(playerData => {
      this.player = playerData;
      this.playerId = this.player.playerInfo.playerId;
      this.player.playerInfo.avatar = "https://new.scoresaber.com/api/static/avatars/" + this.playerId + ".jpg";
      this.historyArray = this.player.playerInfo.history.split(',');
      this.countryFlag = "https://www.countryflags.io/" + this.player.playerInfo.country + "/flat/64.png";
      this.savePlayer();
      this.calculateWeeklyChange();
      this.getTopSongs();
      this.getRecentSongs();
    })
    
  }
  savePlayer(){
    this.storage.AddProfile(this.player);
  }
  calculateWeeklyChange(){
    let weeklyChangeTemp = parseInt(this.historyArray[this.historyArray.length-7]) - this.player.playerInfo.rank;
    this.weeklyChange = weeklyChangeTemp;
  }

  //TopSongs
  getTopSongs(){
    return this.ApiService.getTopSongs(this.playerId).subscribe(ITopSongs => {
      this.TopSongs = ITopSongs;
    })
  }
  //TopSongs
  getRecentSongs(){
    return this.ApiService.getRecentSongs(this.playerId).subscribe(IRecentSongs => {
      this.RecentSongs = IRecentSongs;
    })
  }
  async presentAlertTop(id) {
    const alert = await this.alertController.create({
      animated: true,
      enterAnimation: (baseEl: any, opts?: any) => {
        return(this.animationCtrl
          .create()
          .addElement(baseEl.querySelector('.alert-wrapper'))
          .duration(300)
          .keyframes([
            { offset: 0, opacity: '0' },
            { offset: 1, opacity: '1' }
          ]));
      },
      cssClass: 'my-custom-class',
      header: this.TopSongs.scores[id].songName,
      subHeader: "Author: " + this.TopSongs.scores[id].songAuthorName,
      message: "Rank: " + this.TopSongs.scores[id].rank + "\nAcc: " + (this.TopSongs.scores[id].score/this.TopSongs.scores[id].maxScore)*100 + "%\nPP: " + this.TopSongs.scores[id].pp,
      buttons: ['Back']
    });

    await alert.present();
  }
  async presentAlertRecent(id) {
    const alert = await this.alertController.create({
      animated: true,
      enterAnimation: (baseEl: any, opts?: any) => {
        return(this.animationCtrl
          .create()
          .addElement(baseEl.querySelector('.alert-wrapper'))
          .duration(300)
          .keyframes([
            { offset: 0, opacity: '0' },
            { offset: 1, opacity: '1' }
          ]));
      },
      cssClass: 'my-custom-class',
      header: this.RecentSongs.scores[id].songName,
      subHeader: "Author: " + this.RecentSongs.scores[id].songAuthorName,
      message: `Rank: ` + this.RecentSongs.scores[id].rank + `\nAcc: ` + (this.RecentSongs.scores[id].score/this.RecentSongs.scores[id].maxScore)*100 + `%\nPP: ` + this.TopSongs.scores[id].pp,
      buttons: ['BACK']
    });

    await alert.present();
  }

}
