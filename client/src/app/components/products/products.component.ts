import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage'
import { ProductsService } from '../../services/products.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  token: string


  constructor(public local: LocalStorageService, private ps: ProductsService, private router: Router) {
    try {
      this.token = this.local.get('user').token;
      this.ps.getAllProducts(this.token).subscribe(
        data => {
          this.products = data;
        },
        err => {
          console.log(err);
          this.router.navigate(['/signin']);
        }
      )
    } catch (err) {
      console.log(err);
      this.router.navigate(['/signin']);
    }
   }

  ngOnInit(): void {
  }

  signOut() {
    this.local.clear();
    this.router.navigate(['/signin'])
  }

}
