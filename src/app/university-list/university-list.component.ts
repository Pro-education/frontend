import {Component, OnInit, TemplateRef} from '@angular/core';
import {UniversityService} from "../_services/api/university.service";
import {University} from "../_services/dto/university";
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.css']
})
export class UniversityListComponent implements OnInit {
  public href: string = "";
  public modalRef?: BsModalRef;
  universities?: University[];
  university: University = new University();

  constructor(
    private universityService: UniversityService, private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.href = window.location.origin + this.router.url;
    this.retrieveUniversities()
  }

  retrieveUniversities(): void {
    this.universityService.getAll()
      .subscribe({
        next: (data) => {
          this.universities = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  createUniversity(): void {
    this.universityService.postCreate(this.university)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.university = new University();
          this.retrieveUniversities()
        },
        error: (e) => console.error(e)
      });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
