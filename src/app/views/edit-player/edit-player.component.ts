import { Component, OnInit } from '@angular/core';
import { PlayerService } from '@services/player.service';
import { labelConstants } from '@constants/labels.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@services/modal.service';
import { Type, ToDo } from '@models/modalData.model';
import { iconConstants } from '@constants/icons.constants';
import { textConstants } from '@constants/text.constants';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  
  player: any = null;
  loading: boolean = false;
  editAccountBtnLabel: string = '';
  editAccountBtnIcon: string = '';
  deleteAccountBtnLabel: string = '';
  deleteAccountBtnIcon: string = '';
  saveAccountChangesBtnLabel: string = '';
  saveAccountChangesBtnIcon: string = '';
  cancelAccountChangesBtnLabel: string = '';
  cancelAccountChangesBtnIcon: string = '';
  changePasswordLabel: string = '';
  changePasswordIcon: string = '';
  passwordHelper: string = '';
  saveBtnIcon: string = '';
  cancelBtnIcon: string = '';
  edit: boolean = false;
  editPass: boolean = false;
  editForm: FormGroup;
  passwordForm: FormGroup;
  categories: Object[] = [];
  positions: Object[] = [];
  inputHasChanged: boolean = false;

  constructor(
    private playerService: PlayerService,
    private readonly formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.editForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        lastName:['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        category: ['', [Validators.required]],
        position: ['', [Validators.required]]
      });
    this.passwordForm = this.formBuilder.group({
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{12,}$')]]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.changePasswordLabel = labelConstants.CHANGE_PASSWORD_LBL;
    this.changePasswordIcon = iconConstants.KEY;
    this.passwordHelper = textConstants.PASSWORD_HELP;
    this.editAccountBtnLabel = labelConstants.EDIT_ACCOUNT_LBL;
    this.editAccountBtnIcon = iconConstants.EDIT;
    this.deleteAccountBtnLabel = labelConstants.DELETE_ACCOUNT_LBL;
    this.deleteAccountBtnIcon = iconConstants.DELETE;
    this.saveAccountChangesBtnLabel = labelConstants.SAVE_BTN;
    this.saveBtnIcon = iconConstants.SAVE;
    this.cancelAccountChangesBtnLabel = labelConstants.CANCEL_BTN;
    this.cancelBtnIcon = iconConstants.CANCEL;
    this.categories = labelConstants.PLAYER_CATEGORIES;
    this.positions = labelConstants.PLAYER_POSITIONS;
    this.playerService.getPlayerToUpdate().subscribe(
      (data) => {
        if (data.firstName) {
            console.log('Player data received from observable:', data);
            this.player = data;
            this.loading = false;
        }
        else {
            this.playerService.getPlayerById().subscribe(
                (result) => {
                    console.log('Player data received from new request:', result);
                    this.playerService.editPlayerObservable(result);
                    this.loading = false;
                }
            )
        }
      }
    )
  }

  setFormValues(): void {
    for (let control of Object.keys(this.editForm.controls)) {
        this.editForm.controls[control].setValue(this.player[control]);
    }
  }

  inputChange(control: string): void {
        if (this.editForm.controls[control].value !== this.player[control]) {
            this.inputHasChanged = true;
        } else {
            this.inputHasChanged = false;
        }
  }

  editAccount(): void {
    this.setFormValues();
    this.edit = true;
  }

  saveChanges(): void {
    this.modalService.showModal({
        data: this.editForm.value,
        message: 'Save changes?',
        toDo: ToDo.editAccount,
        type: Type.question
    });
    this.cancelChanges();
  }

  cancelChanges(): void {
    this.edit = false;
    this.inputHasChanged = false;
  }

  savePasswordChanges(): void {
    this.modalService.showModal({
        data: this.passwordForm.value,
        message: 'Save changes?',
        toDo: ToDo.changePassword,
        type: Type.question
    });
    this.cancelPasswordChanges();
  }

  cancelPasswordChanges(): void {
    for (let control of Object.keys(this.passwordForm.controls)) {
        this.passwordForm.controls[control].setValue('');
    }
    this.passwordForm.markAsPristine();
    this.editPass = false;
  }

  checkValid(field: string): void {
    if (this.editForm.get(field)?.invalid) {
      console.log(`Field ${field} is invalid`, this.editForm.get(field)?.errors);
    }
  }

  deleteAccount(): void {
    this.modalService.showModal({
        data: {},
        message: 'Are you sure you want to delete your account?',
        toDo: ToDo.deleteAccount,
        type: Type.warning
    });
  }

  editPassword(): void {
    this.editPass = true;
  }

}
