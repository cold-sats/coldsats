import { Component, NgModule, OnInit, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { DataProvider } from 'src/providers/data'
import { images } from 'src/assets/images/abc/images'

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  layout: string;
  maxWidth: any;

  constructor(
    public data: DataProvider,
    private responsive: BreakpointObserver,
    private router: Router
  ) {
    this.data.view = 'tiles-2';
    this.getMaxWidth();
  }

  getMaxWidth() {
    if (this.data.view == 'tiles-1') {
      this.maxWidth =  window.innerWidth / 2 + 'px';
    } else if (this.data.view == 'tiles-2') {
      this.maxWidth =  window.innerWidth / 3 - 15 + 'px';
    } else if (this.data.view == 'tiles-3') {
      this.maxWidth =  window.innerWidth / 6 - 12.5 + 'px';
    } else {
      this.maxWidth =  window.innerWidth / 12 - 11.2 + 'px';
    }
    console.log(this.maxWidth)
  }

  async ngOnInit() {
    this.data.addCollectionDataToImages();
    this.data.view = 'tiles-2';
    console.log(this.data.shownImages)
    this.setUpAnalytics();
    this.responsive.observe('(min-width: 550px)')
      .subscribe(result => {
        if (result.matches) {
          this.layout = 'desktop';
        } else {
          this.layout = 'mobile';
        }
      });
      console.log(this.data.shownImages.length)

  }

  @HostListener('window:resize')
  onWindowResize() {
    this.getMaxWidth();
  }

  setUpAnalytics() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
            gtag('config', 'G-R28CRD02MV',
                {
                    page_path: event.urlAfterRedirects
                }
            );
        });
  }

}
