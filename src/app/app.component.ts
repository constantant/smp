import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public currentMenuItem: IMenuItem;

    public menu: IMenuItem[] = [
        {
            title: 'Posts',
            rout: 'posts'
        },
        {
            title: 'Reports',
            rout: 'reports'
        },
        {
            title: 'Settings',
            rout: 'settings'
        }
    ];

    public postList: IPostItem[] = [
        {
            text: 'Hello everyone!!!',
            image: 'http://profilepicturequotes.com/wp-content/uploads/20001sd25000/23366/me9_bullied_demi_lovato_.jpg'
        },
        {
            text: 'Spy me today!!',
            image: 'http://www.askonasholt.co.uk/uploads/images/artists/malin-christensson/Christensson_11_main_image_resized-480.jpg'
        },
        {
            text: 'Do you like me?',
            image: 'http://4.bp.blogspot.com/-CSMWxuJtmxI/TZP7ryInOkI/AAAAAAAAAOk/0FHxZYc1vsA/s1600/the+lovecats.jpg'
        },
        {
            text: 'Hi everyone!!!',
            image: 'http://media.thecelebrityauction.co/picture/c/71/CwMdBE5KXRoIAhUABw4DH1kVSxMYBA4TDBwHWQcRAEoHAQxMHwIdB00PHRgASBsRFwJfBwsWGxEQXx8HE00RChlMGQwDB0oFA0gA/HQsABhkdWwEVHhwEBwFKRlNGX1tEVF0xXCJLXUxUWlhAQVZGSlVaQVRaCQcOSwUQEx8MFwtYRE1PXFISCgAeBBdPDwQEUR4dEBEa/TlFbQg==.jpg'
        },
        {
            text: 'Hello, my name is Kate',
            image: 'https://s-media-cache-ak0.pinimg.com/originals/5c/65/94/5c6594921fe7a925c284fe44dbb7b1ce.jpg'
        }
    ];

    public reportList: IReportItem[] = [
        {
            text: 'What\'s up!!',
            images: [
                'http://pictures.plitkar.com.ua/files/2009/03/die-paparazzi-1-100x100.jpg',
                'http://pictures.plitkar.com.ua/files/2009/03/die-paparazzi-2-100x100.jpg',
                'http://pictures.plitkar.com.ua/files/2009/03/die-paparazzi-3-100x100.jpg',
                'http://pictures.plitkar.com.ua/files/2009/03/die-paparazzi-4-100x100.jpg',
                'http://pictures.plitkar.com.ua/files/2009/03/die-paparazzi-5-100x100.jpg'
            ]
        },
        {
            text: 'oerhg oirehg oire ghoerh goierhg',
            images: [
                'http://pictures.plitkar.com.ua/files/2009/10/91007w5_price_b-gr_03-100x100.jpg',
                'http://pictures.plitkar.com.ua/files/2009/10/91007w5_price_b-gr_02-100x100.jpg',
                'http://pictures.plitkar.com.ua/files/2009/10/91007w5_price_b-gr_04-100x100.jpg',
                'http://pictures.plitkar.com.ua/files/2009/10/91007w5_price_b-gr_05-100x100.jpg',
            ]
        }
    ];

    constructor() {
        this.currentMenuItem = this.menu[0];
    }

    public onSwitchMenuItem(item: IMenuItem) {
        this.currentMenuItem = item;
    }
}
