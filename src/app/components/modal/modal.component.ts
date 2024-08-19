import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ModalData, ToDo, Type } from '@models/modalData.model';
import { labelConstants } from '@constants/labels.constants';
import { iconConstants } from '@constants/icons.constants';
import { PlayerService } from '@services/player.service';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
    modalData: ModalData = {
    data: {},
    message: '',
    toDo: ToDo.none,
    type: Type.none
  };
  show: boolean = false;
  loading: boolean = false;
  btn1Label: string = '';
  btn2Label: string = '';
  btn1Icon: string = '';
  btn2Icon: string = '';
  modalIcon: string = '';
  secondBtn: boolean = false;

  constructor(
    private modalService: ModalService,
    private playerService: PlayerService,
    private authService: AuthService,
    private router: Router
  ) { }

  // Modal must receive data.type
  // modalData.type is used to know which icon to display
  // Modal must receive data.toDo
  // modalData.toDo is used to know which action to do after buttons clicks 

  ngOnInit(): void {
    this.modalService.getModal().subscribe(
      (data) => {
          if (data) {
          console.log('Data received in modal:', data);
          this.modalData = data;
          // Set buttons labels and icons
          switch (this.modalData.toDo) {
            case ToDo.ok:
                this.btn1Label = labelConstants.OK_BTN;
                this.btn1Icon  = iconConstants.DONE;
                break;
            case ToDo.logIn:
                this.btn1Label = labelConstants.OK_BTN;
                this.btn1Icon = iconConstants.LOG_IN;
                break;
            case ToDo.editAccount:
                this.btn1Label = labelConstants.OK_BTN;
                this.btn1Icon = iconConstants.DONE;
                this.btn2Label = labelConstants.CANCEL_BTN;
                this.btn2Icon = iconConstants.CANCEL;
                this.secondBtn = true;
                break;
            case ToDo.deleteAccount:
                this.btn1Label = labelConstants.OK_BTN;
                this.btn1Icon = iconConstants.DONE;
                this.btn2Label = labelConstants.CANCEL_BTN;
                this.btn2Icon = iconConstants.CANCEL;
                this.secondBtn = true;
                break;
            case ToDo.changePassword:
                this.btn1Label = labelConstants.OK_BTN;
                this.btn1Icon = iconConstants.DONE;
                this.btn2Label = labelConstants.CANCEL_BTN;
                this.btn2Icon = iconConstants.CANCEL;
                this.secondBtn = true;
                break;
            case ToDo.none:
                break;
          }
          // Set modal icon
          switch (this.modalData.type) {
            case Type.error:
                this.modalIcon = iconConstants.ERROR;
                break;
            case Type.success:
                this.modalIcon = iconConstants.SUCCESS;
                break;
            case Type.question:
                this.modalIcon = iconConstants.QUESTION;
                break;
            case Type.warning:
                this.modalIcon = iconConstants.WARNING;
                break;
            case Type.logIn:
            case Type.sad:
                this.modalIcon = iconConstants.SAD;
                break;
            case Type.none:
                break;
          }
          this.show = true;
        }
      }
    );
  }

  btn1Action(): void {
    switch (this.modalData.toDo) {
        case ToDo.ok:
            break;
        case ToDo.logIn:
            this.authService.login(this.modalData.data.email, this.modalData.data.password).subscribe({
                next: () => {
                  this.router.navigate(['main']);
                },
                error: (error) => {
                  console.log('Error:', error.error);
                  this.modalService.showModal({
                      data: {},
                      message: error.error.detail,
                      toDo: ToDo.ok,
                      type: Type.error
                  });
                }
              });
            break;
        case ToDo.editAccount:
            this.loading = true;
            this.playerService.editPlayer(this.modalData.data).subscribe({
                next: (result) => {
                    this.modalService.showModal({
                        data: {},
                        message: result.detail,
                        toDo: ToDo.ok,
                        type: Type.success
                    });
                    this.loading = false;
                    this.playerService.editPlayerObservable(this.modalData.data);
                },
                error: (error) => {
                    console.log('Error:', error.error);
                    this.modalService.showModal({
                        data: {},
                        message: error.error.detail,
                        toDo: ToDo.ok,
                        type: Type.error
                    });
                    this.loading = false;
                }
            });
            break;
        case ToDo.deleteAccount:
            this.loading = true;
            this.playerService.deletePlayer().subscribe({
                next: (result) => {
                    this.modalService.showModal({
                        data: {},
                        message: result.detail,
                        toDo: ToDo.ok,
                        type: Type.sad
                    });
                    this.loading = false;
                    this.router.navigate(['']);
                },
                error: (error) => {
                    console.log('Error:', error.error);
                    this.modalService.showModal({
                        data: {},
                        message: error.error.detail,
                        toDo: ToDo.ok,
                        type: Type.error
                    });
                    this.loading = false;
                }
            });
            break;
        case ToDo.changePassword:
            this.loading = true;
            this.playerService.changePassword(this.modalData.data).subscribe({
                next: (result) => {
                    this.modalService.showModal({
                        data: {},
                        message: result.detail,
                        toDo: ToDo.ok,
                        type: Type.success
                    });
                    this.loading = false;
                    this.router.navigate(['account']);
                },
                error: (error) => {
                    console.log('Error:', error.error);
                    this.modalService.showModal({
                        data: {},
                        message: error.error.detail,
                        toDo: ToDo.ok,
                        type: Type.error
                    });
                    this.loading = false;
                }
            });
    }
    this.clearData();
    this.show = false;
  }

  btn2Action(): void {
    this.clearData();
    this.show = false;
  }

  clearData(): void {
    this.modalData = {
        data: {},
        message: '',
        toDo: ToDo.none,
        type: Type.none
      };
      this.btn1Label = '';
      this.btn2Label = '';
      this.btn1Icon = '';
      this.btn2Icon = '';
      this.modalIcon = '';
      this.secondBtn = false;
  }

}
