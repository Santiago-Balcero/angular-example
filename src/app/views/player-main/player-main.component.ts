import { Component, OnInit } from '@angular/core';
import { PlayerService } from '@services/player.service';
import { Router } from '@angular/router';
import { StarRatingService } from '../../services/star-rating.service';
import { labelConstants } from '@constants/labels.constants';
import { ModalService } from '@services/modal.service';
import { MenuService } from '@services/menu.service';
import { ToDo, Type } from '@models/modalData.model';
import { iconConstants } from '@constants/icons.constants';

@Component({
  selector: 'app-player-main',
  templateUrl: './player-main.component.html',
  styleUrls: ['../../../styles.css']
})
export class PlayerMainComponent implements OnInit {
    
  player: any = null;
  editAccountLabel: string = '';
  editAccountIcon: string = '';
  newGameButtonLabel: string = '';
  newTeamButtonLabel: string = '';
  newGameButtonIcon: string = '';
  newTeamButtonIcon: string = '';
  loading: boolean = false;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private starService: StarRatingService,
    private modalService: ModalService,
    private menuService: MenuService
  ) { }
    
  ngOnInit(): void {
    this.loading = true;
    this.menuService.sendMenuData({currentView: 'main'});
    this.newGameButtonLabel = labelConstants.START_GAME_LBL;
    this.newGameButtonIcon = iconConstants.START_GAME;
    this.newTeamButtonLabel = labelConstants.NEW_TEAM_LBL;
    this.newTeamButtonIcon = iconConstants.CREATE_TEAM;
    this.editAccountLabel = labelConstants.EDIT_ACCOUNT_LBL;
    this.editAccountIcon = iconConstants.EDIT_ACCOUNT;
    this.getPlayerData();
  }

  private getPlayerData(): void {
    this.playerService.getPlayerById().subscribe({
      next: (data) => {
        console.log('Data from player: ', data);
        this.player = data;
        this.starService.showStars(this.player.totalEffectiveness);
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
        this.modalService.showModal({
            data: {},
            message: error.error,
            toDo: ToDo.ok,
            type: Type.error
        });
        this.router.navigate(['']);
      }
    });
  }

  editPlayer(): void {
    this.playerService.editPlayerObservable(this.player);
    this.router.navigate(['/account']);
  }

}
