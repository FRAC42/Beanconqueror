import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule, ModalController, NavParams} from '@ionic/angular';

import {MillInformationComponent} from './mill-information.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {IonicStorageModule} from '@ionic/storage';
import {CommonModule} from '@angular/common';
import {KeysPipe} from '../../../pipes/keys';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {NavParamsMock} from '../../../classes/mock/NavParamsMock';
import {File} from '@ionic-native/file/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {Router} from '@angular/router';

describe('MillInformationComponent', () => {
  let component: MillInformationComponent;
  let fixture: ComponentFixture<MillInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), FormsModule, IonicStorageModule.forRoot(), CommonModule, IonicModule],
      declarations: [MillInformationComponent, KeysPipe],
      providers: [
        {provide: InAppBrowser},
        {provide: ModalController},
        {provide: NavParams, useClass: NavParamsMock},
        {provide: Storage},
        {provide: File},
        {provide: Camera},
        {provide: ImagePicker},
        {provide: AndroidPermissions},
        {provide: FirebaseX},
        {provide: Router}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MillInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
