import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../dto/team";
import {Homework} from "../dto/homework";

const API_URL = 'http://localhost:8080/api/team';
const SEPARATOR = '/';

const HEADMAN = 'headman';
const HOMEWORK = 'homework';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getById(id?: bigint): Observable<Team> {
    return this.http.get<Team>(API_URL + SEPARATOR + id);
  }

  getAll(): Observable<Team[]> {
    return this.http.get<Team[]>(API_URL);
  }

  postCreate(team: Team): Observable<Team> {
    return this.http.post<Team>(API_URL, team)
  }

  putAddOwner(teamId?:bigint, headmanId? : bigint): Observable<Team> {
    return this.http.put<Team>(API_URL + SEPARATOR + teamId + SEPARATOR + HEADMAN + SEPARATOR + headmanId, {})
  }

  putUpdate(team?: Team): Observable<Team> {
    return this.http.put<Team>(API_URL + SEPARATOR + team?.id, team);
  }

  getHomeworksByTeamId(id?: bigint): Observable<Homework[]> {
    return this.http.get<Homework[]>(API_URL + SEPARATOR + id + SEPARATOR + HOMEWORK);
  }

}
