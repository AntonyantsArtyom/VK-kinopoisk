import { Button, ModalCard, Text } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import { confirmModalStore } from "./ConfirmModalStore";
import styled from "styled-components";

const ConfirmModal = () => {
  const confirmButtonClickHandler = () => {
    confirmModalStore.onConfirm();
    confirmModalStore.closeModal();
  };

  return (
    <ModalCard open={confirmModalStore.isOpen} onClose={() => confirmModalStore.closeModal()}>
      <ContainerStyled>
        <Text>{confirmModalStore.text}</Text>
        <Button size="l" onClick={() => confirmModalStore.closeModal()}>
          Отмена
        </Button>
        <Button size="l" onClick={confirmButtonClickHandler}>
          Да
        </Button>
      </ContainerStyled>
    </ModalCard>
  );
};

export default observer(ConfirmModal);

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
