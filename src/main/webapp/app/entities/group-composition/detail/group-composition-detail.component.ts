import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGroupComposition } from '../group-composition.model';

@Component({
  selector: 'jhi-group-composition-detail',
  templateUrl: './group-composition-detail.component.html',
})
export class GroupCompositionDetailComponent implements OnInit {
  groupComposition: IGroupComposition | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupComposition }) => {
      this.groupComposition = groupComposition;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
