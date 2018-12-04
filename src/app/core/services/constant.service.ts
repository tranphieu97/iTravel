import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  POST_STATUS =
    {
      NEW: 'NEW',
      PENDDING: 'PENDDING',
      ALLOW: 'ALLOW',
      NOT_ALLOW: 'NOT_ALLOW',
      NEED_REPAIR: 'NEED_REPAIR'
    };

  constructor() { }
}
