import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  posts: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http
    .get('https://remolacha.net/wp-json/wp/v2/posts?search=digeset')
    .subscribe((data: any) => {
      this.posts = data;
    });
  }

}
