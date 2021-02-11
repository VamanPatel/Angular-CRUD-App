import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommanService } from './comman.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CrudOperation';
  allUser: Object;
  isEdit = false;
  userObj = {
    name: '',
    phone: '',
    email: '',
    password: '',
    id: '',
  };

  constructor(
    private commanSerive: CommanService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getLatestUser();
  }

  addUser(f) {
    console.log(f.value);
    let fromObj = f.value;
    this.commanSerive.createUser(fromObj).subscribe((response) => {
      this.getLatestUser();
      f.form.reset();
    });
    this.toastr.success('User Added', fromObj.name);
  }

  getLatestUser() {
    this.commanSerive.getAllUser().subscribe((response) => {
      this.allUser = response;
    });
  }

  editUser(user) {
    this.isEdit = true;
    this.userObj = user;
  }

  deleteUser(user) {
    this.commanSerive.deleteUser(user).subscribe(() => {
      this.getLatestUser();
      this.toastr.error('User Deleted', user.name);
    });
  }

  updateUser(f) {
    let obj = f.value;
    console.log('updated');
    this.commanSerive.updateUser(this.userObj).subscribe(() => {
      this.getLatestUser();
    });
    this.isEdit = false;
    f.form.reset();
    this.toastr.success('User Updated', f.name);
  }
}
