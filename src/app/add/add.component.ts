import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  addButton: boolean = true;
  buttonValue: string = '';
  id: any = 0;
  addEdit: any;
  message: boolean = true;
  maxDate: any;

  constructor(
    private router: ActivatedRoute,
    private fetchData: FetchDataService,
    private route: Router
  ) {}
  record: any;

  ngOnInit(): void {
    this.disableFutureDate();
    this.id = this.router.snapshot.params['id'];
    this.addButton = !this.id;
    if (this.addButton) {
      this.buttonValue = 'Create';
      this.addEdit = new FormGroup({
        fname: new FormControl('', [Validators.required]),
        lname: new FormControl('', [Validators.required]),
        emailId: new FormControl('', [Validators.required, Validators.email]),
        dept: new FormControl(''),
        dob: new FormControl('', [Validators.required]),
      });
    } else {
      this.buttonValue = 'Update';
      this.fetchData.recordById(this.id).subscribe((d) => {
        this.record = d;
        this.addEdit = new FormGroup({
          fname: new FormControl(this.record.data['fname'], [
            Validators.required,
          ]),
          lname: new FormControl(this.record.data['lname'], [
            Validators.required,
          ]),
          emailId: new FormControl(this.record.data['emailId'], [
            Validators.required,
            Validators.email,
          ]),
          dept: new FormControl(this.record.data['dept']),
          dob: new FormControl(this.record.data['dob'], [Validators.required]),
        });
      });
    }
  }
  add(data: any) {
    // redirected to a link on error because it is going into error after creation
    this.fetchData.addUser(data).subscribe(
      (res) => {
        this.route.navigate(['']);
      },
      (err) => {
        this.route.navigate(['']);
      }
    );
  }
  update(data: any) {
    // redirected to a link on error because it is going into error after updation
    this.fetchData.updateUser(data, this.id).subscribe(
      (res) => {
        this.route.navigate(['']);
      },
      (err) => {
        this.route.navigate(['']);
      }
    );
  }
  submit(data: any) {
    this.addButton ? this.add(data) : this.update(data);
  }
  disableFutureDate() {
    var date = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();
    if (todayDate < 10) {
      todayDate = '0' + todayDate;
    }
    if (month < 10) {
      month = '0' + month;
    }
    this.maxDate = year + '-' + month + '-' + todayDate;
  }
  get userEmail() {
    return this.addEdit.get('emailId');
  }
  get userDob() {
    return this.addEdit.get('dob');
  }
  get userFname() {
    return this.addEdit.get('fname');
  }
  get userLname() {
    return this.addEdit.get('lname');
  }
}
