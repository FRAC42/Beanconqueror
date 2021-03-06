/** Core */
import {Injectable} from '@angular/core';
/** Ionic */
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {UIHelper} from './uiHelper';

import {Settings} from '../classes/settings/settings';
import {UISettingsStorage} from './uiSettingsStorage';
import {UIAlert} from './uiAlert';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {UILog} from './uiLog';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UIAnalytics {

  private canTrack: boolean = undefined;

  constructor(private readonly alertController: AlertController,
              private readonly translate: TranslateService,
              private readonly uiHelper: UIHelper,
              private readonly fb: FirebaseX,
              private readonly  uiSettings: UISettingsStorage,
              private readonly uiAlert: UIAlert,
              private readonly uiLog: UILog,
              private readonly router: Router) {
  }

  public async initializeTracking(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.__attachToRoutingEvents();
      this.__checkTrackingEnabled().then(async () => {
        resolve();
        this.enableTracking();
      }, () => {
        reject();
        this.disableTracking();
      });
    });
  }

  public async enableTracking() {
    this.canTrack = true;
    this.uiLog.log('Tracking enabled');
    try {
      this.fb.setAnalyticsCollectionEnabled(true).then(() => {
      }, () => {

      });
      this.fb.setPerformanceCollectionEnabled(true).then(() => {
      }, () => {

      });


    } catch (ex) {
      this.uiLog.error(ex.message);
    }
  }

  public async disableTracking() {
    this.canTrack = false;
    this.uiLog.log('Tracking disabled');
    try {
      this.fb.setAnalyticsCollectionEnabled(false).then(() => {
      }, () => {

      });
      this.fb.setPerformanceCollectionEnabled(false).then(() => {
      }, () => {

      });
    } catch (ex) {
      this.uiLog.error(ex.message);
    }

  }

  public trackPage(_pageName: string) {
    if (this.canTrack) {
      this.__trackPageFB(_pageName);
    } else {
      this.uiLog.info(`ANALYTICS - DISABLED - But we would track page: Page:${_pageName}`);
    }
  }

  public trackEvent(_category, _action) {
    if (this.canTrack) {
      try {

        this.__trackEventFB(_category, _action);

      } catch (ex) {

      }
    } else {
      this.uiLog.info(`ANALYTICS - DISABLED - But we would track event: Category:${_category}, Action: ${_action}`);
    }
  }

  private __attachToRoutingEvents() {
    this.router.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {
        const nav: NavigationEnd = val;
        this.trackPage(nav.urlAfterRedirects);
      }
    });
  }

  private async __checkTrackingEnabled(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const settings: Settings = this.uiSettings.getSettings();
      if (settings.analytics === undefined) {
        this.uiAlert.showConfirm('ALLOW_ANALYTICS_DESCRIPTION', 'ALLOW_ANALYTICS_TITLE', true).then(() => {

          settings.analytics = true;
          this.uiSettings.saveSettings(settings);
          resolve();
        }, async () => {
          settings.analytics = false;
          this.uiSettings.saveSettings(settings);
          await this.uiAlert.showMessage('ALLOW_ANALYTICS_DENIED_DESCRIPTION', 'ALLOW_ANALYTICS_DENIED_TITLE', undefined, true);
          reject();
        });
      } else {
        if (settings.analytics) {
          resolve();
        } else {
          reject();
        }

      }
    });

  }

  private __isInt(n) {
    return Number(n) === n && n % 1 === 0;
  }

  private __trackPageFB(_pageName: string) {
    try {
      if (this.canTrack) {
        this.fb.setScreenName(_pageName).then(() => {
          this.uiLog.log('SUCCESS - Track Page - ' + _pageName);
        }).catch((error: any) => {
          this.uiLog.error('ERROR - track Page - ' + _pageName);
          // Do nothing
        });

      }

    } catch (ex) {
    }
  }


  private __trackEventFB(_category, _action) {
    if (this.canTrack) {
      try {
        this.fb.logEvent(_category, {
          ACTION: _action
        }).then(() => {
          this.uiLog.log('SUCCESS - Track event page - Category:' + _category + ' Action:' + _action);
        }).catch((error: any) => {
          // Do nothing
          this.uiLog.log('ERROR - Track event page - Category:' + _category + ' Action:' + _action);
        });

      } catch (ex) {

      }
    } else {
    }
  }

}
