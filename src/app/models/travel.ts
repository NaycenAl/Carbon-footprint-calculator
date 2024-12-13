export interface Travel {

    distanceKm? : number;
    consommationPour100Km?: number;
    typeCarburant?: string;
}

export interface  Travel2 {

    id: number;
    distance: number;
    consommation: number;
    co2: number;
    date: string;
    travelType: string;
    userId: number;
  }