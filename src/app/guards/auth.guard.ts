import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {


  const userService : UserService = inject(UserService);
  const router: Router = inject(Router);


  if(userService.isAuthentificated()){
    return true;
  }
  else{

    router.navigate([''],
      { queryParams : {
        error : "Please Login!"
      }

      }
    )
  }

  return false;
};
