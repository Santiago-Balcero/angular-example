import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { labelConstants } from '@constants/labels.constants';
import { PlayerService } from '@services/player.service';
import { NewPlayer } from '@models/newPlayer.model';
import { ModalService } from '@services/modal.service';
import { MenuService } from '../../services/menu.service';
import { ToDo, Type } from '@models/modalData.model';
import { textConstants } from '@constants/text.constants';
import { iconConstants } from '@constants/icons.constants';
import { Country } from '@models/countries.models';
import { CatalogueService } from '@services/catalogue.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['../../../styles.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;
  passwordHelper: string = '';
  buttonLabel: string = '';
  buttonIcon: string = '';
  categories: Object[] = labelConstants.PLAYER_CATEGORIES;
  positions: Object[] = labelConstants.PLAYER_POSITIONS;
  countries: Country[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private playerService: PlayerService,
    private modalService: ModalService,
    private menuService: MenuService,
    private catalogueService: CatalogueService
    ) {
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        teamName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        category: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{12,}$')]]
      });
      this.catalogueService.getCountries().subscribe(
          data => {
            this.countries = data;
          }  
      );
    }

  ngOnInit(): void {
    this.menuService.sendMenuData({currentView: 'register'});
    this.buttonLabel = labelConstants.REGISTER_BTN;
    this.buttonIcon = iconConstants.CREATE_PLAYER;
    this.passwordHelper = textConstants.PASSWORD_HELP;
  }

  onSubmit(): void {
    console.log('Form data:', this.registerForm.value);
    const newPlayer: NewPlayer = this.registerForm.value;
    this.playerService.registerNewPlayer(newPlayer).subscribe({
      next: (result) => {
        console.log(result);
        this.modalService.showModal({
            data: {
                email: newPlayer.email,
                password: newPlayer.password
            },
            message: result.detail ? result.detail : '',
            toDo: ToDo.logIn,
            type: Type.success
        });
      },
      error: (error) => {
        console.log(error);
        this.modalService.showModal({
            data: {},
            message: error.error.detail,
            toDo: ToDo.ok,
            type: Type.error
        });
      }
    });
  }

  checkValid(field: string): void {
    if (this.registerForm.get(field)?.invalid) {
      console.log(`Field ${field} is invalid`, this.registerForm.get(field)?.errors);
    }
  }

}
