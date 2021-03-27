import { Component, OnInit } from '@angular/core';
import { SchemeService } from 'src/app/shared/services/scheme.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
  switchMap
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-scheme',
  templateUrl: './search-scheme.component.html',
  styleUrls: ['./search-scheme.component.css']
})
export class SearchSchemeComponent implements OnInit {

  apiResponse: any;
  isSearching: boolean;
  inputValue: string;
  searchInput = new FormControl('');
  constructor(private schemesService: SchemeService) {

  }

  ngOnInit() {
    this.searchInput.valueChanges.pipe(
    map((data: any) => {
      this.inputValue = data;
      return data;
    })
    // if character length greater then 2
//    , filter(res => res.length > 2)

    // Time in milliseconds between key events
    , debounceTime(1000)

    // If previous query is diffent from current   
    , distinctUntilChanged()

    // subscription for response
  ).subscribe((text: string) => {
    this.isSearching = true;
    this.schemesService.getSchemes(text).subscribe((res) => {
      this.isSearching = false;
      this.apiResponse = res;
    }, (err) => {
      this.isSearching = false;
      console.log('error', err);
    });
  });
    // fromEvent(this.searchInput, 'keyup').pipe(

    //   // get value
    // )
  };

  closeSearch() {
    this.searchInput.setValue('');
    this.apiResponse = [];
    //document.querySelector("#search-wrapper").classList.remove("active");
  }
}
