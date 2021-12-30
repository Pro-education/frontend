import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BsModalRef} from "ngx-bootstrap/modal";
import {Team} from "../_services/dto/team";
import {GroupService} from "../_services/api/group.service";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  public href: string = "";
  public modalRef?: BsModalRef;
  teams?: Team[];
  currentUserTeams? : Team[];
  newTeam: Team = new Team();

  constructor(
    private teamService: GroupService,
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.href = window.location.origin + this.router.url;
    this.retrieveTeams()
  }

  retrieveTeams(): void {
    this.teamService.getAll()
      .subscribe({
        next: (data) => {
          this.teams = data;
          this.retrieveCurrentUserTeams(this.teams)
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  retrieveCurrentUserTeams(currentUserTeams: Team[]): void {
    this.currentUserTeams = [];
    for (let currentUserTeam of currentUserTeams) {
      if (currentUserTeam.headman == this.tokenService.getUser().id) {
        this.currentUserTeams.push(currentUserTeam)
      }
    }
  }

  createTeam(): void {
    this.teamService.postCreate(this.newTeam)
      .subscribe({
        next: (data) => {
          console.log(data);

          this.teamService.putAddOwner(data.id, this.tokenService.getUser().id)
            .subscribe({
              next: (data) => {
                console.log(data);
                this.newTeam = new Team();
                this.retrieveTeams()
              },
              error: (e) => console.error(e)
            })

        },
        error: (e) => console.error(e)
      });
  }


}
