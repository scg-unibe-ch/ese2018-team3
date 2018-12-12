import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../_services/theme.service';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

    constructor(
        private themeService: ThemeService
    ) {
    }

    ngOnInit() {
      if (this.themeService.getIsNight() == 'true'){
        this.themeService.changeDesignToNightTheme();
      }
    }
}
