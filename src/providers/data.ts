import { Injectable } from '@angular/core';

import { data } from 'src/data/data';
import { images } from 'src/assets/images/abc/images'

@Injectable()
export class DataProvider  {

  shownImages: any[];
  allImages: any[];
  isSearching: boolean;
  view: any;
  showFilterMenu: boolean;
  maxWidth: any;

  constructor() {
  }

  addCollectionDataToImages() {
    images.map((image, index) => {
      image['order'] = index;
    });
    this.allImages = [];
    this.shownImages = [];
    Object.keys(data).forEach((key) => {
      const collection = images.find((image) => image.abcNumber.toString() == key);
      if (collection) {
        this.allImages.push({
          ...collection,
          data: data[key]
        });
      }
    });
    this.allImages.sort((a, b) => a.order > b.order ? 1 : -1);
    this.shownImages = this.allImages;
    console.log(this.shownImages)
  }

  async searchForImage(search) {
    console.log(this.allImages)
    let chosenTrait = null;
    if (this.isSearching) {
      return;
    }
    if (search == '') {
      this.shownImages = this.allImages;
      return;
    }
    this.isSearching = true;
    this.shownImages = [];
    this.allImages.map((image) => {
      const abcNumber = image.data.howrare.name.slice(5);
      if (search == abcNumber) {
        this.shownImages.push(image);
      }
      if (search.includes(':')) {
        const array = search.split(':');
        search = array[1];
        chosenTrait = array[0];
      }
      image.data.howrare.attributes.map((attribute) => {
        if (!chosenTrait || chosenTrait.toUpperCase() == attribute.name.toUpperCase()) {
          if (search.toUpperCase() == attribute.value.toUpperCase() && !this.shownImages.includes(image)) {
            console.log(attribute)
            this.shownImages.push(image);
          }
        }
      });
    });
    this.isSearching = false;
  }

}
