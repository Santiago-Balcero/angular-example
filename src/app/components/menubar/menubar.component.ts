import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { labelConstants } from '@constants/labels.constants';
import { Router } from '@angular/router';
import { TokenService } from '@services/token.service';
import { MenuService } from '@services/menu.service';
import { iconConstants } from '@constants/icons.constants';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  items: MenuItem[] = [];
  buttonLabel: string = '';
  buttonIcon: string = '';
  logged: boolean = false;
  dataView: any = {};
  logoutLabel: string = '';
  logoutIcon: string = '';
  
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private menuService: MenuService
    ) {
}

  ngOnInit(): void {
    this.logoutLabel = labelConstants.LOG_OUT_BTN;
    this.logoutIcon = iconConstants.LOG_OUT;
    this.menuService.getMenuData().subscribe(
      data => {
        if (data) {
          console.log('Data received in menu:', data);
          this.dataView = data;
        }
        this.setMenuItems();
      }
    );
  }

  private setMenuItems(): void {
    if (this.dataView.currentView === 'login' || this.dataView.currentView === 'register'){
    this.logged = false;
    this.buttonLabel = this.dataView.currentView === 'register' ? labelConstants.LOG_IN_BTN : labelConstants.REGISTER_BTN;
    this.buttonIcon = this.dataView.currentView === 'register' ? iconConstants.LOG_IN : iconConstants.CREATE_PLAYER;
    this.items = [
        {label: labelConstants.HOME_LBL, routerLink: '', icon: 'home'},
        {label: labelConstants.ABOUT_LBL, icon: 'info'}
    ];
    }
    else {
      this.logged = true;
      this.items = [
        {label: labelConstants.HOME_LBL, routerLink: '/main', icon: 'home'},
        {label: labelConstants.MY_TEAMS_LBL, routerLink: '/teams', icon: 'groups'},
        {label: labelConstants.MY_GAMES_LBL, routerLink: '/games', icon: 'sports_volleyball'},
        {label: labelConstants.ABOUT_LBL, icon: 'info'},
        {label: labelConstants.SETTINGS_LBL, icon: 'settings'}
      ];
    }
  }
  
  onClick(): void {
    if (this.dataView.currentView === 'register') {
      this.router.navigate(['']);
    }
    else if (this.dataView.currentView === 'login'){
      this.router.navigate(['register'])
    }
    else {
        this.tokenService.clearData();
        this.router.navigate(['']);
    }
  }

}
