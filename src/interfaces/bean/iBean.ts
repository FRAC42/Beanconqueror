/**
 * Created by lars on 10/18/2017.
 */
import {IConfig} from '../objectConfig/iObjectConfig';

/**Enums**/
import {ROASTS_ENUM} from '../../enums/beans/roasts';

export interface IBean {
  name: string;
  roastingDate: string;
  //Which Countries, sorts etc.
  beanMix:string;
  //Aromatics
  aromatics:string;
  note: string;
  filePath: string;
  roaster:string;
  roast:ROASTS_ENUM;
  //Will be filled when roast is choosen as custom.
  roast_custom:string;
  config:IConfig;
  weight:number;
  finished:boolean;
}


