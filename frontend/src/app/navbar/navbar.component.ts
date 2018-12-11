import {Component, OnInit} from '@angular/core';
import {AdminService, UserService} from '../_services';
import {Router} from '@angular/router';
import {ThemeService} from '../_services/theme.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

    loggedIn: string;

    constructor(
        private adminService: AdminService,
        private userService: UserService,
        private themeService: ThemeService,
        private router: Router,
    ) {
        this.userService.currentUser.subscribe(x => this.loggedIn = x);
    }

    ngOnInit() {
        const header = document.getElementById('topnav');
        const btns = header.getElementsByClassName('w3-button');
        if (this.themeService.getIsNight() == 'true'){
          this.themeService.changeDesignToNightTheme();
        }
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                var current = document.getElementsByClassName('active');
                current[0].className = current[0].className.replace(' active', '');
                this.className += ' active';
            });
        }
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/home']);
    }

  switchTheme() {
        this.themeService.switchTheme()
    }
}
