import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {University} from "../dto/university";
import {Review} from "../dto/review";

const API_URL = 'http://localhost:8080/api/university';
const API_PATH_REVIEW = '/review';
const SEPARATOR = '/';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http: HttpClient) { }

  getById(id?: bigint): Observable<University> {
    return this.http.get<University>(API_URL + SEPARATOR + id);
  }

  getReviewsByParentId(id?: bigint): Observable<Review[]> {
    return this.http.get<Review[]>(API_URL + SEPARATOR + id + API_PATH_REVIEW);
  }

  postCreateReview(review: Review, id?: bigint): Observable<Review> {
    return this.http.post<Review>(API_URL + SEPARATOR + id + API_PATH_REVIEW, review);
  }

  getAll(): Observable<University[]> {
    return this.http.get<University[]>(API_URL + SEPARATOR);
  }

  postCreate(university: University): Observable<University> {
    return this.http.post<University>(API_URL + SEPARATOR, university);
  }

}
