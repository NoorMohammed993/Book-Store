import { Component, OnInit, Input, HostListener, AfterViewInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { AppUser } from '../modals/app-user';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { faTh, faShoppingCart, faStore } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../category.service';



@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, AfterViewInit {

  appUser: AppUser;
  cartItemCount = 0;
  categories$;
  faTh = faTh;
  faCart = faShoppingCart;
  faStore = faStore;
  scrolledBg = false;
  @Input() bgTransparent;
  @Input() navBgWhite;
  mouseOvered = false;
  toggleMenu = false;

  constructor(private auth: AuthService,
    private route: Router,
    private shoppingCartService: ShoppingCartService,
    private categoryService: CategoryService) {

    auth.appUser$.subscribe(appUser => {
      if (appUser) {
        console.log(appUser);
        return this.appUser = appUser;
      }
      return false;
    });

  }



  async ngOnInit() {

    (await this.shoppingCartService.getCartItems()).valueChanges().subscribe((item: any) => {

      console.log(item);
      this.cartItemCount = this.shoppingCartService.getCartItemsCounts(item);
      this.categories$ = this.categoryService.getCategories();

    });

  }

  async ngAfterViewInit() {

  }

  logOut() {
    this.appUser = null;
    this.auth.logOut();
    this.route.navigate(['/']);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.scrollY) > 0) {
      this.scrolledBg = true;
    } else {
      this.scrolledBg = false;
    }
  }

  toggleMenuChange() {
    this.toggleMenu = !this.toggleMenu;
  }
}
