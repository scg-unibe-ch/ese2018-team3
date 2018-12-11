import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ThemeService {

  constructor() {
  }

  getIsNight() {
    return localStorage.getItem('isNight')
  }

  switchTheme() {
    if (this.getIsNight() == 'true') {
      localStorage.setItem('isNight', 'false');
      this.changeDesignToDayTheme();
    } else {
      localStorage.setItem('isNight', 'true');
      this.changeDesignToNightTheme();
    }
  }

  changeDesignToDayTheme() {
    const header = document.getElementById("topnav");
    const body = document.getElementById("body");
    const footer = document.getElementById("footer");
    const sidebar = document.getElementById("sidenav");
    var buttons = document.getElementsByClassName("w3-button");

    for (let i=0; i< buttons.length; i++) {
      if (buttons[i].classList.contains("w3-black")) {
        buttons[i].classList.remove("w3-black")
        buttons[i].classList.add("w3-dark-gray");
      }
      else if (buttons[i].classList.contains("w3-highway-red")) {
        buttons[i].classList.remove("w3-highway-red")
        buttons[i].classList.add("w3-red");
      }
      else if (buttons[i].classList.contains("w3-highway-blue")) {
        buttons[i].classList.remove("w3-highway-blue")
        buttons[i].classList.add("w3-blue");
      }
      else if (buttons[i].classList.contains("w3-highway-orange")) {
        buttons[i].classList.remove("w3-highway-orange")
        buttons[i].classList.add("w3-orange");
      }
    }

    document.body.style.backgroundColor = "white";

    header.classList.remove("w3-black")
    header.classList.add("w3-dark-gray");

    body.classList.remove("w3-dark-gray")
    body.classList.add("w3-white");

    footer.classList.remove("w3-dark-gray")
    footer.classList.add("w3-white");

    sidebar.classList.remove("w3-gray")
    sidebar.classList.add("w3-light-gray");
  }

  changeDesignToNightTheme() {
    const header = document.getElementById("topnav");
    const body = document.getElementById("body");
    const footer = document.getElementById("footer");
    const sidebar = document.getElementById("sidenav");
    var buttons = document.getElementsByClassName("w3-button");

    for (let i=0; i< buttons.length; i++) {
      if (buttons[i].classList.contains("w3-dark-gray")) {
        buttons[i].classList.remove("w3-dark-gray")
        buttons[i].classList.add("w3-black");
      }
      else if (buttons[i].classList.contains("w3-red")) {
        buttons[i].classList.remove("w3-red")
        buttons[i].classList.add("w3-highway-red");
      }
      else if (buttons[i].classList.contains("w3-blue")) {
        buttons[i].classList.remove("w3-blue")
        buttons[i].classList.add("w3-highway-blue");
      }
      else if (buttons[i].classList.contains("w3-orange")) {
        buttons[i].classList.remove("w3-orange")
        buttons[i].classList.add("w3-highway-orange");
      }
    }

    document.body.style.backgroundColor = "#626262";

    header.classList.remove("w3-dark-gray")
    header.classList.add("w3-black");

    body.classList.remove("w3-white")
    body.classList.add("w3-dark-gray");

    footer.classList.remove("w3-white")
    footer.classList.add("w3-dark-gray");

    sidebar.classList.remove("w3-light-gray")
    sidebar.classList.add("w3-gray");
  }
}
