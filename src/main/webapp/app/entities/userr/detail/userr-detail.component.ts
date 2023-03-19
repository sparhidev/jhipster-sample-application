import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserr } from '../userr.model';

@Component({
  selector: 'jhi-userr-detail',
  templateUrl: './userr-detail.component.html',
})
export class UserrDetailComponent implements OnInit {
  userr: IUserr | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userr }) => {
      this.userr = userr;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
