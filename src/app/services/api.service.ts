import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private readonly BASE_URL = "http://localhost:8080"


  constructor(private httpClient :HttpClient) {

   }


   public getCalculateTrajetVoiture(distanceKm : number, typeCarburant: string, consommationPour100Km: number) {
    
    const params = new HttpParams().set("distanceKm", distanceKm.toString()).set('typeCarburant', typeCarburant).set('consommationPour100Km', consommationPour100Km.toString())
    return this.httpClient.get(`${this.BASE_URL}/calculerTrajetTrain`, { params });
   }

   public getCalculateTrajetAvion() {
    
   }

   public calculerTrajetTrain(distanceKm : number, typeCarburant: string) : Observable<any>{

    const params = new HttpParams().set("distanceKm", distanceKm.toString()).set('typeCarburant', typeCarburant)
    return this.httpClient.get(`${this.BASE_URL}/calculerTrajetTrain`, { params });

   }
}
