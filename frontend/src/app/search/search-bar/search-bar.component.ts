import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  input = '';

  constructor(private router: Router) {
    this.input = window.location.pathname.substr(8);
  }

  search() {
    this.router.navigateByUrl('/searching/' + this.input);
  }

  ngOnInit() {
  }

}
