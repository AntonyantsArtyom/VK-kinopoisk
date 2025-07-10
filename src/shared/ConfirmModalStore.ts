import { observable, action, makeAutoObservable } from "mobx";

class ConfirmModalStore {
  @observable text: string | null = null;
  @observable isOpen: boolean = false;
  @observable onConfirm: () => void = () => {};

  constructor() {
    makeAutoObservable(this);
  }

  @action
  openModalWithText(text: string, onConfirm: () => void) {
    this.text = text;
    this.isOpen = true;
    this.onConfirm = onConfirm;
  }

  @action
  closeModal() {
    this.text = null;
    this.isOpen = false;
  }
}

export const confirmModalStore = new ConfirmModalStore();
