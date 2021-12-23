import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Discussion} from "../dto/discussion";

const API_URL = 'http://localhost:8080/api/reviews';
const API_PATH_REVIEW = '/discussion';
const SEPARATOR = '/';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getDiscussionsByParentId(id?: bigint): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(API_URL + SEPARATOR + id + API_PATH_REVIEW);
  }

  postCreateDiscussion(discussion: Discussion, id?: bigint) : Observable<Discussion> {
    return this.http.post(API_URL + SEPARATOR + id + API_PATH_REVIEW, discussion);
  }
}
