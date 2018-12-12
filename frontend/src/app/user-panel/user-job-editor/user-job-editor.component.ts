import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../_services/theme.service';

@Component({
    selector: 'app-user-job-editor',
    templateUrl: './user-job-editor.component.html',
    styleUrls: ['./user-job-editor.component.css']
})
export class UserJobEditorComponent implements OnInit {

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
