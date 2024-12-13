import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { Travel, Travel2 } from '../models/travel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private readonly BASE_URL = "http://localhost:8080"


  constructor(private httpClient :HttpClient) {

   }



   public calculerTrajet(travelType: string, travel: Travel): Observable<any> {
    let params = new HttpParams().set('distanceKm', travel.distanceKm!.toString());
  
    console.log('Type de transport reçu:', travelType);
    switch (travelType.toLowerCase()) {
      case 'car':
        if (travel.consommationPour100Km) {
          params = params.set('consommationPour100Km', travel.consommationPour100Km.toString());
        }
        if (travel.typeCarburant) {
          params = params.set('typeCarburant', travel.typeCarburant);
        }
        return this.httpClient.get(`${this.BASE_URL}/calculerTrajetVoiture`, { params });
  
      case 'avion':
        return this.httpClient.get(`${this.BASE_URL}/calculerTrajetAvion`, { params });
  
      case 'train':
        if (travel.typeCarburant) {
          params = params.set('typeCarburant', travel.typeCarburant);
        }
        return this.httpClient.get(`${this.BASE_URL}/calculerTrajetTrain`, { params });
  
      default:
        throw new Error('Type de transport inconnu.');
    }
  }


  calculC02(travel: any) : Observable<number>{
    return this
      .calculerTrajet(travel.travelType, {
        distanceKm: travel.distanceKm,
        consommationPour100Km: travel.Km100Consumption,
        typeCarburant: travel.typeCarburant,
      })
      .pipe(
    
        map(response => response.empreinteCarbone) 
      );
  }

  getTravelForUser1(): Observable<Travel2[]> {
    return from(
      fetch(`${this.BASE_URL}/tousMesVoyages/1`)
        .then(response => response.json())
        .then(data => {
          console.log('Voyages de l\'utilisateur 1 :', data);
          return data; 
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des voyages :', error);
          throw error;  
        })
    );
 
  
}

addTravelForUser1(travel : Travel2){
 let params = new HttpParams().set( 'travel.userId', 1 ).set('distance', travel.distance,).set( 'consommation', travel.consommation).set( 'co2' , travel.co2, ).set('travelType', travel.travelType)
  
  return this.httpClient.get(`${this.BASE_URL}/ajouterUnVoyage`, { params });
}}
