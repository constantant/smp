import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-page-post-item',
    templateUrl: './page-post-item.component.html',
    styleUrls: ['./page-post-item.component.css']
})
export class PagePostItemComponent implements OnInit {

    @Input()
    public data: IPostItem;
    public lat: number;
    public lng: number;

    constructor() {
    }

    ngOnInit() {
        if (this.data.geo) {
            let _coordinates: string[] = this.data.geo.coordinates.split(' ');
            this.lat = parseFloat(_coordinates[0]);
            this.lng = parseFloat(_coordinates[1]);
        }
    }

    public addReport() {
        console.log(this.data);
    }

    public toFavorite() {
        console.log(this.data);
    }
}
