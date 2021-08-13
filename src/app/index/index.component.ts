import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ProductsService } from '../products.service';
import { Subscription } from 'rxjs';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  producs = [];
  latestProducs = [];
  popularProducs = [];
  filteredProducts = [];
  subscription: Subscription;

  config: SwiperConfigInterface = {

    slidesPerView: 6,

  };

  constructor(private productService: ProductsService) { }

  async ngOnInit() {
    this.productService.getProducts().subscribe(item => {
      this.producs = item;

      this.latestProducs = this.producs.filter((v, index, arr) =>
        index > Math.round(arr.length / 2));

      this.popularProducs = this.producs.filter((v, index, arr) =>
        index < Math.round(arr.length / 2) && index > 4);

      console.log('All Available Products');
      console.log(this.producs);

      console.log('Latest Products');
      console.log(this.latestProducs);

      console.log('Popular Products');
      console.log(this.popularProducs);

    });
  }

  search(query) {

    if (query.length === 0) { return this.filteredProducts = []; }
    query = query.toLowerCase();
    this.filteredProducts = this.producs.filter((v) => v.title.toLowerCase().indexOf(query) > -1);

    console.log(this.filteredProducts);
  }

  @HostListener('window:resize', [])
  onresize(): void {
    if ((window.innerWidth) < 768) {
      this.config.slidesPerView = 2;
    } else {
      this.config.slidesPerView = 6;
    }
  }

  @HostListener('window:load', [])
  onload(): void {
    if ((window.innerWidth) < 768) {
      this.config.slidesPerView = 2;
    } else {
      this.config.slidesPerView = 6;
    }
  }


}
