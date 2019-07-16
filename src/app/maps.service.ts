import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Location{
  latitude: string;
  longitude: string;
}
@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  getlocation(){
    return this.http.get<Location>('http://api.ipapi.com/api/check?access_key=AIzaSyCi3hSfPY4V_5h4XIBuAv13P7AQlwvIG6A')
  }
}
