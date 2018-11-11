import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Province } from '../../model/province.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from '../../model/menu.model';
import { map } from 'rxjs/operators';
import { Category } from '../../model/category.model';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  HOST: String = 'http://localhost:7979/';

  constructor(private http: HttpClient) { }

  GetListProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(this.HOST + 'db/provinces/').pipe(map((res: any[]) => {
      const provinces: Province[] = res.map((resItem) => {
        const province = new Province(
          resItem.ProvinceID,
          resItem.ProvinceName,
          resItem.District,
          resItem.MapID
        );

        return province;
      });

      return provinces;
    }));
  }

  GetMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]> (this.HOST + 'db/menu/').pipe(map((res: any[]) => {
      const menu: Menu[] = res.map((resItem) => {

        const resItemCategories: Category[] = resItem.Categories.map((resItemCategory) => {
          const category: Category = new Category(
            resItemCategory.Name,
            resItemCategory.Link,
            resItemCategory.Tags,
          );

          return category;
        });

        const resMenu = new Menu(
          resItem.Name,
          resItem.Image,
          resItem.Link,
          resItemCategories
        );

        return resMenu;
      });

      return menu;
    }));
  }
}
