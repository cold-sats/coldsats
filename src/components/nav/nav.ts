import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { DataProvider } from 'src/providers/data'
import { filters } from 'src/components/nav/filters'

import { AppComponent } from 'src/app/app.component';

import { data } from 'src/data/data'

@Component({
  selector: 'sats-nav',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./nav.scss'],
  templateUrl: './nav.html'
})

export class NavComponent implements OnInit {

  dimensions: string;
  filters: any;
  test: boolean;
  form: UntypedFormGroup;
  @Input() hideMenuButtons: string;
  @Input() showBackButton: boolean = false;
  @Input() title: string;
  currentPage: string;
  navLocation: string;
  selectedFilters: any;

  constructor(
    private appComponent: AppComponent,
    public data: DataProvider,
    private fb: UntypedFormBuilder,
    private location: Location,
    private responsive: BreakpointObserver,
    private router: Router
  ) {
    this.form = this.fb.group({
      search: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.selectedFilters = [];
    this.filters = filters;
    this.test = true;
    this.data.view = 'tiles-3';
    this.currentPage = this.router.routerState.snapshot.url;
    this.responsive.observe('(min-width: 650px)')
      .subscribe(result => {
        if (result.matches) {
          this.dimensions = 'desktop';
        } else {
          this.dimensions = 'mobile';
        }
      });
      this.form.valueChanges.pipe(
        debounceTime(300)
      ).subscribe(val => this.updateSearch());
  }

  updateSearch() {
    this.data.searchForImage(this.form.value.search);
  }

  goToPage(page) {
    this.router.navigate([page]);
  }

  goBack() {
    this.location.back()
  }

  toggleView() {
    if (this.data.view == 'tiles-1') {
      this.data.view = 'tiles-2';
    } else if (this.data.view == 'tiles-2') {
      this.data.view = 'tiles-3';
    } else if (this.data.view == 'tiles-3') {
      this.data.view = 'tiles-4';
    } else if (this.data.view == 'tiles-4') {
      this.data.view = 'tiles-1';
    }
    this.appComponent.getMaxWidth();
  }

  toggleFilter() {
    this.data.showFilterMenu = !this.data.showFilterMenu;
  }

  getFilterIcon() {
    console.log(this.data.view)
    return 'assets/images/' + this.data.view + '.svg';
  }

  toggleFilterRow(index) {
    console.log(this.filters)
    console.log(index)
    this.filters[index]['showExpandedFilter'] = !this.filters[index]['showExpandedFilter']
  }

  chooseOneRandomABC() {
    let allABCs = [];
    Object.keys(data).forEach((key) => {
      allABCs.push({
        data: data[key]
      });
    });
    console.log('Total number of ABCs: ' + allABCs.length)
    const chosenABC = Math.floor(Math.random() * 10000) + 1;
    console.log(allABCs[chosenABC].data.howrare.name);
    console.log(allABCs[chosenABC].data.ordinal_img_url);
  }

}
