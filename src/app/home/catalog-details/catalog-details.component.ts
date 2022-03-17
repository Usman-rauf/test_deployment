import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, LocalstorageService } from 'src/app/_services';

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.css'],
})
export class CatalogDetailsComponent implements OnInit {
  public data: any = [];
  public user: any;
  public result = true;
  public enrolledsCatalog: any = [];
  public catalogData: any = [];

  constructor(
    public router: Router,
    public activated: ActivatedRoute,
    private UserService: UserService,
    private userdata: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.catalogDetail();
    this.getuser();
    this.getstudentCatalogs();
  }

  getuser() {
    this.user = this.userdata.getUser();
  }

  catalogDetail() {
    this.activated.paramMap.subscribe((params: any) => {
      this.data = params.get('id');
    });
    this.UserService.getCatalog(this.data).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.catalogData = res.catalog;
        console.log(this.catalogData);
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }

  enrollCatalog(data: any) {
    this.UserService.enrollCatalog(data).subscribe((res: any) => {
      if (res) {
        try {
          this.data = res;
          console.log(this.data);
          window.alert('Catalog Buyed Successful');
          this.router.navigate(['/dashboard/profile']);
        } catch {
          window.alert('Error Occur');
        }
      } else {
        console.log(data);
      }
    });
  }
  getstudentCatalogs() {
    this.UserService.getstudentCatalogs().subscribe((data: any) => {
      if (data.status == 'ok') {
        this.enrolledsCatalog = data.catalog;
        for (let user of this.enrolledsCatalog) {
          if (this.data == user.catalogId) {
            this.result = false;
          }
        }
      } else {
        (err: any) => {
          console.log(err);
        };
      }
    });
  }
}
