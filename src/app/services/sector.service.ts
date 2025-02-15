import { Injectable } from '@angular/core';
import { sectorData } from '../data/sector-data';
import { Sector } from '../model/sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor() { }

  getSector():Sector[]{
    return sectorData
  }
}
