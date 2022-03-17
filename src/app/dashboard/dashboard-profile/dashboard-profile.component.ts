import { Component, OnInit } from '@angular/core';
import { LocalstorageService, UserService } from '../../_services/index';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.css'],
})
export class DashboardProfileComponent implements OnInit {
  file: any;
  data: any = [];
  Image: any;
  bioData: any = FormGroup;
  educationData: any = FormGroup;
  enrolledtCourse: any = [];
  enrolledsCourse: any = [];
  enrolledtCatalog: any = [];
  enrolledsCatalog: any = [];
  courseValue: any = FormGroup;
  catalogValue: any = FormGroup;
  achievementValue: any = FormGroup;

  constructor(
    private userdata: LocalstorageService,
    private UserService: UserService,
    private modal: FormBuilder
  ) {}

  ngOnInit() {
    this.bioData = this.modal.group({
      bio: [''],
    });

    this.educationData = this.modal.group({
      education: [''],
    });

    this.courseValue = this.modal.group({
      Image: [''],
      coursename: [''],
      country: [''],
      price: Number,
      description: [''],
    });

    this.catalogValue = this.modal.group({
      Image: [''],
      catalogname: [''],
      country: [''],
      price: Number,
      description: [''],
    });

    this.achievementValue = this.modal.group({
      name: ['', Validators.required],
      file: ['', [Validators.required]],
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ]),
      ],
    });

    this.getuser();
    this.getteacherCourses();
    this.getstudentCourses();
    this.getteacherCatalogs();
    this.getstudentCatalogs();
  }

  onEdit(row: any) {
    this.bioData.controls['bio'].setValue(row.bio);
    this.educationData.controls['education'].setValue(row.education);

    // this.courseValue.controls['Image'].setValue(row.Image);
    this.courseValue.controls['coursename'].setValue(row.coursename);
    this.courseValue.controls['country'].setValue(row.country);
    this.courseValue.controls['price'].setValue(row.price);
    this.courseValue.controls['description'].setValue(row.description);

    // this.catalogValue.controls['Image'].setValue(row.Image);
    this.catalogValue.controls['catalogname'].setValue(row.catalogname);
    this.catalogValue.controls['country'].setValue(row.country);
    this.catalogValue.controls['price'].setValue(row.price);
    this.catalogValue.controls['description'].setValue(row.description);
  }

  getuser() {
    this.data = this.userdata.getUser();
  }

  bioUpdate(data: any) {
    console.log(this.bioData.value.bio);
    data = { bio: this.bioData.value.bio };
    this.UserService.updateBio(data).subscribe((res: any) => {
      if (res) {
        try {
          this.data.bio = this.bioData.value.bio;
          this.userdata.saveUser(this.data);
        } catch {
          window.alert('Error Occur during saving');
        }
      }
    });
  }

  educationUpdate(data: any) {
    console.log(this.educationData.value.education);
    data = { education: this.educationData.value.education };
    this.UserService.updateEducation(data).subscribe((res: any) => {
      if (res) {
        try {
          this.data.education = this.educationData.value.education;
          this.userdata.saveUser(this.data);
        } catch {
          window.alert('Error Occur during saving');
        }
      }
    });
  }

  educationdelete(data: any) {
    console.log(this.educationData.value.education);
    data = { education: this.educationData.value.education };
    this.UserService.updateEducation(data).subscribe((res: any) => {
      if (res) {
        try {
          this.data.education = this.educationData.value.education;
          this.userdata.saveUser(this.data);
        } catch {
          window.alert('Error Occur during deletion');
        }
      }
    });
  }

  onFileChange(event: any) {
    this.Image = event.target.files;
    console.log(this.Image);
  }

  onSave() {
    console.log(this.achievementValue.value);
    console.log(this.Image[0]);

    var fd = new FormData();
    fd.append('file', this.Image[0]);
    fd.append('name', this.achievementValue.value.name);
    fd.append('description', this.achievementValue.value.description);

    console.log(fd);

    return false;
    this.UserService.addAchievement(fd).subscribe((data: any) => {
      if (data.status == 'ok') {
        try {
          window.alert('Successfully Added New Product');
        } catch {
          window.alert('Error Occur during saving');
        }
      } else {
        console.log(data);
      }
    });
  }

  saveAdd(data: any) {
    console.log(data);
  }

  addCourse(data: any) {
    console.log(this.courseValue.value);
    data = { data: this.courseValue.value };
    this.UserService.addCourse(data).subscribe((res: any) => {
      if (res) {
        try {
          this.getteacherCourses();
          this.courseValue.reset();
        } catch {
          window.alert('Error Occur during process');
        }
      } else {
        console.log(data);
      }
    });
  }
  onCourseEdit(data: any) {
    console.log(this.courseValue.value);
    data = { data: this.courseValue.value };
    console.log(data);
    this.UserService.updateCourse(data).subscribe((data: any) => {
      if (data) {
        try {
          this.getteacherCourses();
        } catch (err: any) {
          console.log(err);
        }
      } else {
        console.log(data);
      }
    });
  }
  onDeleteCourse(data: any) {
    console.log(data);
    this.UserService.deleteCourse(data).subscribe((data: any) => {
      if (data) {
        try {
          this.getteacherCourses();
        } catch (err: any) {
          console.log(err);
        }
      } else {
        console.log(data);
      }
    });
  }
  addCatalog(data: any) {
    console.log(this.catalogValue.value);
    data = { data: this.catalogValue.value };
    this.UserService.addCatalog(data).subscribe((res: any) => {
      if (res) {
        try {
          this.getteacherCatalogs();
          this.catalogValue.reset();
        } catch {
          window.alert('Error Occur during process');
        }
      } else {
        console.log(data);
      }
    });
  }
  onCatalogEdit(data: any) {
    console.log(this.catalogValue.value);
    data = { data: this.catalogValue.value };
    console.log(data);
    this.UserService.updateCourse(data).subscribe((data: any) => {
      if (data) {
        try {
          this.getteacherCatalogs();
        } catch (err: any) {
          console.log(err);
        }
      } else {
        console.log(data);
      }
    });
  }
  onDeleteCatalog(data: any) {
    console.log(data);
    this.UserService.deleteCatalog(data).subscribe((data: any) => {
      if (data) {
        try {
          this.getteacherCatalogs();
        } catch (err: any) {
          console.log(err);
        }
      } else {
        console.log(data);
      }
    });
  }
  getteacherCourses() {
    this.UserService.getteacherCourses().subscribe((data: any) => {
      if (data.status == 'ok') {
        this.enrolledtCourse = data.course;
        console.log(this.enrolledtCourse);
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }
  getstudentCourses() {
    this.UserService.getstudentCourses().subscribe((data: any) => {
      console.log(data);
      if (data.status == 'ok') {
        this.enrolledsCourse = data.course;
        console.log(this.enrolledsCourse);
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }
  getteacherCatalogs() {
    this.UserService.getteacherCatalogs().subscribe((data: any) => {
      if (data.status == 'ok') {
        this.enrolledtCatalog = data.catalog;
        console.log(this.enrolledtCatalog);
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }
  getstudentCatalogs() {
    this.UserService.getstudentCatalogs().subscribe((data: any) => {
      console.log(data);
      if (data.status == 'ok') {
        this.enrolledsCatalog = data.catalog;
        console.log(this.enrolledsCatalog);
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }
}
