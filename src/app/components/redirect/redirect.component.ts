import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-redirect',
  template: ''
})
export class RedirectComponent implements OnInit {

  private baseUrl = environment.baseUrl;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const alias = this.route.snapshot.paramMap.get('alias');
    if (alias) {
      window.location.href = this.baseUrl + "/" + alias;
    }
  }

}