export interface ModalData {
    data: any,
    message: string,
    toDo: ToDo,
    type: Type
}

export enum Type {
    error = 'error',
    success = 'success',
    question = 'question',
    warning = 'warning',
    logIn = 'log in',
    sad = 'sad',
    none = ''
}

export enum ToDo {
    ok = 'ok',
    logIn = 'log in',
    editAccount = 'edit account',
    deleteAccount = 'delete account',
    changePassword = 'change password',
    none = ''
}