import {Component, OnInit} from '@angular/core';
import {UIStatistic} from '../../services/uiStatistic';
import {BrewAddComponent} from '../brew/brew-add/brew-add.component';
import {ModalController} from '@ionic/angular';
import {Brew} from '../../classes/brew/brew';
import {UIBrewStorage} from '../../services/uiBrewStorage';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public brews: Array<Brew> = [];

  constructor(public uiStatistic: UIStatistic,
              private readonly modalCtrl: ModalController,
              private readonly uiBrewStorage: UIBrewStorage) {
  }

  public ngOnInit() {

    this.__loadBrews();
  }

  public async addBrew() {
    const modal = await this.modalCtrl.create({component: BrewAddComponent});
    await modal.present();
    await modal.onWillDismiss();
  }

  private __loadBrews() {
    this.brews = this.uiBrewStorage.getAllEntries();
    this.brews = this.__sortBrews(this.brews);
    this.brews = this.brews.slice(0, 10);
    console.log(this.brews);
  }

  private __sortBrews(_sortingBrews: Array<Brew>): Array<Brew> {
    const sortedBrews: Array<Brew> = _sortingBrews.sort((obj1, obj2) => {
      if (obj1.config.unix_timestamp < obj2.config.unix_timestamp) {
        return 1;
      }
      if (obj1.config.unix_timestamp > obj2.config.unix_timestamp) {
        return -1;
      }

      return 0;
    });
    return sortedBrews;
  }
}