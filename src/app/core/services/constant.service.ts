import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  POST_STATUS =
    {
      NEW: 'NEW',
      PENDING: 'PENDING',
      APPROVED: 'APPROVED',
      DENY: 'DENY',
      NEED_REPAIR: 'NEED_REPAIR'
    };

  ALL_PROVINCE = 'Việt Nam';

  constructor() { }
}
