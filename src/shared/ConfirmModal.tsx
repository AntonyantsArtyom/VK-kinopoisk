import { Button, ModalCard, Text } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import { confirmModalStore } from "./ConfirmModalStore";

const ConfirmModal = () => {
  const confirmButtonClickHandler = () => {
    confirmModalStore.onConfirm();
    confirmModalStore.closeModal();
  };

  return (
    <ModalCard open={confirmModalStore.isOpen} onClose={() => confirmModalStore.closeModal()}>
      <Text>{confirmModalStore.text}</Text>
      <Button onClick={() => confirmModalStore.closeModal()}>Отмена</Button>
      <Button onClick={confirmButtonClickHandler}>Да</Button>
    </ModalCard>
  );
};

export default observer(ConfirmModal);
