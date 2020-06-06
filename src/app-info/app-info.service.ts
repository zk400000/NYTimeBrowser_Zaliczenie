import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

@Injectable()
export class AppInfoService {
    articlesAPIKey : string = 'd0UBehbRWo7z270KBqt8nTZl8DkkopGV'
    dateStart: string="20000101";
    dateEnd: string="20200102";
    sortingTime:string ="newest";
    searchtext:string="";
    page:number=0;
     
    getNYTimeSelectedArticles(dateStart:string,dateEnd:string,sortingTime:string, searchtext:string, requestedPage:number) {

        this.dateStart=dateStart.replace(/-/g, '');
        this.dateEnd=dateEnd.replace(/-/g, '');
        this.sortingTime=sortingTime;
        this.searchtext=searchtext;
        this.page=requestedPage;
        return this.http.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?fq='+this.searchtext+ '&page='+this.page+ '&fl=headline,web_url&facet_field=day_of_week&facet=true&begin_date='+ this.dateStart +'&end_date=' + this.dateEnd +'&sort=' +this.sortingTime +'&api-key=' + this.articlesAPIKey)
        .toPromise( );
    }
    constructor(public http: HttpClient) {
    }
}

