import { Component, OnInit, OnChanges } from '@angular/core'; 
import { AppInfoService } from 'src/app-info/app-info.service';

@Component({
    selector: 'wsb-home', 
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
    today = new Date();
    public dateFrom: string =  "2016-01-01";
    public dateEnd: string =  "2018-01-01";
    articles: any = [];
    ArticlesCount: number = 0;
    AllArticlesMatched: number = 0;
    ArticuleCurrentOffset: number =0;
    sortingTime: string = "newest"
    i: number =0;
    searchtext: string ="";
    isLeftNavButtonActive:boolean = false;
    isRightNavButtonActive:boolean = false;
    isPagginationActive:boolean=false;
    isNoArticleWarningValid:boolean=false;
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
       // zapytanie do HTTP do jasonplaceholders.typicode.com/users
        interface  MyType {
            status: any;
            response: any;
        }

       this.appInfo.getNYTimeSelectedArticles(this.dateFrom,this.dateEnd, this.sortingTime, this.searchtext, this.currentPage) //;-> promise
            .then((httpResponse: MyType)=> {
                //this.httpResponse = response;
                console.log("moj full response ", httpResponse);
                console.log("moj response status", httpResponse.status);
                console.log("moj response status", httpResponse.response.docs);
                this.articles = httpResponse.response.docs;
                this.ArticlesCount = httpResponse.response.docs.length;
                this.AllArticlesMatched = httpResponse.response.meta.hits;
                this.ArticuleCurrentOffset =httpResponse.response.meta.offset;
                this.isPagginationActive = this.ArticlesCount > 0 ? true: false;
                this.isNoArticleWarningValid =this.ArticlesCount > 0 ? false: true;
                if(this.ArticuleCurrentOffset>0) {
                    this.isLeftNavButtonActive = true
                } 
                else {
                    this.isLeftNavButtonActive = false
                }
                console.log("this.ArticlesCount" + this.ArticlesCount + "this.ArticuleCurrentOffset" + this.ArticuleCurrentOffset + "this.AllArticlesMatched" + this.AllArticlesMatched)
                if (this.ArticlesCount + this.ArticuleCurrentOffset < this.AllArticlesMatched ) {
                    this.isRightNavButtonActive = true
                } 
                else {
                    this.isRightNavButtonActive = false
                }
                console.log("this.isRightNavButtonActive"+ this.isRightNavButtonActive);
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
        this.currentPage=0;
    }
    dateFromChanged () {
        this.currentPage=0;
    }

    navigationLeft() {
        console.log (this.currentPage)
        --this.currentPage;
        if(this.currentPage<0) {this.currentPage=0}
        this.refreshArticles();
    }
    navigationRight() {
        if(this.isRightNavButtonActive===true) {
            console.log (this.currentPage)
            ++this.currentPage;
            this.refreshArticles();
        }
    }

    inputDataChanged(){
        this.currentPage=0;
    }

    parityChecker(item:number):boolean {
        return (item % 2==0) ? true: false;
    }

    navigationItem(item:number) {
        this.currentPage=item;
        console.log (this.currentPage)
        this.refreshArticles();
    }

    SubjectArticle(subject:string) {
        this.searchtext = subject;
        this.currentPage=0;
        this.refreshArticles();
    }

}


