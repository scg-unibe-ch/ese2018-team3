import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-searching',
    templateUrl: './searching.component.html',
    styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
    }

}
