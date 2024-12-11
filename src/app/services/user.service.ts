import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  

  constructor() { }

  public login(username : string ) {
    
    localStorage.setItem('user', JSON.stringify({'name': username}));
    
  }
 

  public getUserName() : string {

   const user= localStorage.getItem('user');
   
   if(user){
      return  JSON.parse(user).name;
   }
   
   return '';
  }
  
  public isAuthentificated(): boolean {
      return this.getUserName() != '';
  }

  public logout(){
    localStorage.removeItem('user')
  }

}
