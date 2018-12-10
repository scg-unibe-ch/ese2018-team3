import {Component, OnInit} from '@angular/core';
import {AdminService, UserService} from '../_services';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    loggedIn: string;
    isAdmin: boolean;
    isNight: boolean;

    constructor(
        private adminService: AdminService,
        private userService: UserService,
        private router: Router,
    ) {
        this.userService.currentUser.subscribe(x => this.loggedIn = x);
    }

    ngOnInit() {
        const header = document.getElementById('topnav');
        const btns = header.getElementsByClassName('w3-button');
        if (this.isNight){
          this.changeDesignToNightTheme();
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

  switchToNightTheme() {
      if (this.isNight) {
        this.isNight = false;
        this.changeDesignToDayTheme();
      } else {
        this.isNight = true;
        this.changeDesignToNightTheme();
      }


    }

    changeDesignToDayTheme() {
      const body = document.getElementById("body");
      const footer = document.getElementById("footer");
      const sidebar = document.getElementById("sidenav");

      document.body.style.backgroundColor = "white";


      body.classList.remove("w3-black")
      body.classList.add("w3-white");

      footer.classList.remove("w3-black")
      footer.classList.add("w3-white");

      sidebar.classList.remove("w3-dark-gray")
      sidebar.classList.add("w3-light-gray");
    }

    changeDesignToNightTheme() {
      const body = document.getElementById("body");
      const footer = document.getElementById("footer");
      const sidebar = document.getElementById("sidenav");

      document.body.style.backgroundColor = "black";

      body.classList.remove("w3-white")
      body.classList.add("w3-black");

      footer.classList.remove("w3-white")
      footer.classList.add("w3-black");

      sidebar.classList.remove("w3-light-gray")
      sidebar.classList.add("w3-dark-gray");
    }
}
