import {AfterViewInit, Component} from '@angular/core';

@Component({
    selector: 'google-ad',
    template: ` <div>
      <ins class="adsbygoogle"
           style="display:inline-block;width:320px;height:100px"
      <!-- Data below gotten from one of our developers (valid one required), will be adjusted to the clients-->
           data-ad-client="ca-pub-9818713391142653" 
           data-ad-slot="8084673342"
           data-ad-format="auto"></ins>
    </div>
    <br>
    `,

})

export class AdComponent implements AfterViewInit {

    constructor() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            try {
                (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
            } catch (e) {
                console.error('error');
            }
        }, 2000);
    }
}
