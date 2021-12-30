import {Component, OnInit} from '@angular/core';
import {UniversityService} from "../_services/api/university.service";
import {University} from "../_services/dto/university";
import {ActivatedRoute} from "@angular/router";
import {Review} from "../_services/dto/review";
import {Discussion} from "../_services/dto/discussion";
import {ReviewService} from "../_services/api/review.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {Institute} from "../_services/dto/institute";
import {InsituteService} from "../_services/api/insitute.service";

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {


  public href: string = "http://localhost:4200/institute";

  personId: bigint;
  id?: bigint;
  personRole: any[];
  university?: University;
  updatedUniversity?: University;
  discussions: Discussion[] = [];
  reviews: Review[] = [];
  newReview: Review = new Review();
  currentReviewId?: bigint;
  newDiscussion: Discussion = new Discussion();

institutes: Institute[] = [];
  createInst: Institute = new Institute();

  constructor(
    private universityService: UniversityService,
    private reviewService: ReviewService,
    private instService: InsituteService,
    private activateRoute: ActivatedRoute,
    private tokenService: TokenStorageService,
  ) {
    activateRoute.params.subscribe(params => this.id = params['id']);
    this.personId = tokenService.getUser().id;
    this.personRole = tokenService.getUser().roles;
  }

  ngOnInit(): void {
    this.retrieveUniversity();
    this.retrieveReviews();
    this.retrieveInstitutes()
  }

  retrieveUniversity(): void {
    this.universityService.getById(this.id)
      .subscribe({
        next: (data) => {
          this.university = data;
          this.updatedUniversity = Object.assign(new University(), data);
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  retrieveReviews(): void {
    this.universityService.getReviewsByParentId(this.id)
      .subscribe({
        next: (data) => {
          this.reviews = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  createReview(): void {
    this.universityService.postCreateReview(this.newReview, this.id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.newReview = new Review();
          this.retrieveReviews();
        }
      })
  }

  findDiscussions(reviewId?: bigint): void {
    if (reviewId == this.currentReviewId) {
      this.discussions = []
      this.currentReviewId = undefined;
    } else {
      this.retrieveDiscussions(reviewId);
      this.currentReviewId = reviewId;
    }
  }

  retrieveDiscussions(reviewId?: bigint): void {
    this.reviewService.getDiscussionsByParentId(reviewId)
      .subscribe({
        next: (data) => {
          this.discussions = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  createDiscussion(): void {
    this.reviewService.postCreateDiscussion(this.newDiscussion, this.currentReviewId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.newDiscussion = new Discussion();
          this.retrieveDiscussions(this.currentReviewId)
        },
        error: (e) => console.error(e)
      })
  }


  updateUniversity(): void {
    this.universityService.putUpdate(this.updatedUniversity).subscribe({
      next: (data) => {
        console.log(data);
        this.university = data;
        this.updatedUniversity = Object.assign(new University(), data);
      },
      error: (e) => console.error(e)
    })
  }

  retrieveInstitutes() {
    this.universityService.getAllInstitute(this.id).subscribe({
      next: (data) => {
        console.log(data)
        this.institutes = data;
      },
      error: (e) => console.error(e)
    })
  }

  createInst1(): void {
    this.createInst.universityId = this.id;
    this.instService.postCreate(this.createInst).subscribe({
      next: (data) => {
        console.log(data);
        this.retrieveInstitutes()
      },
      error: (e) => console.error(e)
    })
  }

}
