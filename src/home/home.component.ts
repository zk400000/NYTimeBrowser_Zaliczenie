import { Component, OnInit, OnChanges } from '@angular/core'; //'optimised import': usuwanie nieużywanych importów ALT+SHIFT+O
import { AppInfoService } from 'src/app-info/app-info.service';
import { timingSafeEqual } from 'crypto';


@Component({
    selector: 'wsb-home', 
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
    headingTitle = "Podaj zakres dat wyświetlanych artykułów"
    today = new Date();
    public dateFrom: string =  "2016-01-01";
    public dateEnd: string =  "2018-01-01";
    articles: any = [];
    ArticlesCount = 0;
    AllArticlesMatched = 0;
    ArticuleCurrentOffset=0;
    sortingTime: string = "newest"
    i: number =0;
    searchtext: string ="";
    isLeftNavButtonActive:boolean = false;
    isRightNavButtonActive:boolean = false;
    currentPage: number =0;

    getCurrentDateInApiFormat(): string{
        let day:any = this.today.getDate();
        let month:any = this.today.getMonth() + 1;
        let year:any = this.today.getFullYear();
        let dateInApiFormat: string;

        if(day<10){
           day = '0' + day.toString();
        }
        if(month<10){
            month = '0' + month.toString();
        }
        dateInApiFormat = year.toString() + '-' + month + '-' + day;
        return dateInApiFormat;
    }


    refreshArticles() {
        //this.isActive = this.isActive ? false : true ;  
       //alert ("ja");
       // zapytanie do HTTP do jasonplaceholders.typicode.com/users
       this.appInfo.getNYTimeSelectedArticles(this.dateFrom,this.dateEnd, this.sortingTime, this.searchtext, this.currentPage) //;-> promise
            .then(httpResponse=> {
                //this.httpResponse = response;
                console.log("moj full response ", httpResponse);
                console.log("moj response status", httpResponse.status);
                console.log("moj response status", httpResponse.response.docs);
                this.articles = httpResponse.response.docs;
                this.ArticlesCount = httpResponse.response.docs.length;
                this.AllArticlesMatched = httpResponse.response.meta.hits;
                this.ArticuleCurrentOffset =httpResponse.response.meta.offset;
                if(this.ArticuleCurrentOffset>0) {
                    this.isLeftNavButtonActive = true
                } 
                else {
                    this.isLeftNavButtonActive = false
                }


                if (this.ArticlesCount+this.ArticuleCurrentOffset + this.ArticlesCount < this.AllArticlesMatched ) {
                    this.isRightNavButtonActive = true} else {
                    this.isRightNavButtonActive = false
                }
                this.currentPage = Math.floor(this.ArticuleCurrentOffset / this.ArticlesCount);

                console.log("currenct page", this.currentPage )
            })
            .catch(error=>console.log(error));
    }
    constructor(public appInfo: AppInfoService) {
        
    }

    ngOnInit() {
        console.log('wywołano ngOnInit', this.getCurrentDateInApiFormat());
        this.dateFrom = this.getCurrentDateInApiFormat();
        this.dateEnd = this.getCurrentDateInApiFormat();
    }

    ngOnChanges() {
        console.log('wywołano OnChanges', this.getCurrentDateInApiFormat());
    }

    dateEndChanged() {
        let tempDate:Date=null;
        tempDate=new Date(Number(Date.parse(this.dateEnd)))
        if( tempDate > this.today) {
            this.dateEnd = this.getCurrentDateInApiFormat();
        }
        this.currentPage=0;
        this.dateFromChanged();
    }
    dateFromChanged () {
        let tempDateEnd:Date=null;
        let tempDateFrom:Date=null;
        tempDateEnd=new Date(Number(Date.parse(this.dateEnd)))
        tempDateFrom=new Date(Number(Date.parse(this.dateFrom)))
        if( tempDateFrom > tempDateEnd) {
            this.dateFrom = this.dateEnd;
        }
        this.currentPage=0;
        this.dateEndChanged();
    }

    navigationLeft() {
        console.log (this.currentPage)
        --this.currentPage;
        if(this.currentPage<0) {this.currentPage=0}
        this.refreshArticles();
    }
    navigationRight() {
        console.log (this.currentPage)
        ++this.currentPage;
        this.refreshArticles();
    }

    inputDataChanged(){
        this.currentPage=0;
    }

}


