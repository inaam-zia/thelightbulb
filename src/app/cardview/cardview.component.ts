import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
} from '@angular/core';
import { toArray } from 'rxjs';
import { FetchDataService } from '../fetch-data.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-cardview',
  templateUrl: './cardview.component.html',
  styleUrls: ['./cardview.component.css'],
})
export class CardviewComponent implements OnInit, AfterViewInit {
  data: any;
  constructor(private fetchDetails: FetchDataService) {
    this.fetchDetails.getDetail().subscribe((d: any) => {
      this.data = d.data;
    });
  }
  ngAfterViewInit() {}
  ngOnInit(): void {}
}
