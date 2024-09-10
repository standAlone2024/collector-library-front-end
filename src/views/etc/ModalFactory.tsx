import React from 'react';
import AlertModal from '@view/etc/modals/AlertModal';
import ConfirmModal from '@view/etc/modals/ConfirmModal';
import InputModal from '@view/etc/modals/InputModal';

interface BaseModalProps {
  isVisible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

interface AlertModalProps extends BaseModalProps {
  type: 'alert';
  onConfirm: () => void;
}

interface ConfirmModalProps extends BaseModalProps {
  type: 'confirm';
  onConfirm: () => void;
  onCancel: () => void;
}

interface InputModalProps extends BaseModalProps {
  type: 'input';
  onSubmit: (input: string) => void;
  onCancel: () => void;
}

type ModalProps = AlertModalProps | ConfirmModalProps | InputModalProps;

export const ModalFactory: React.FC<ModalProps> = (props) => {
  if (!props.isVisible) return null;

  switch (props.type) {
    case 'alert':
      return <AlertModal {...props} />;
    // case 'confirm':
    //   return <ConfirmModal {...props} />;
    case 'input':
      return <InputModal {...props} />;
    default:
      return null;
  }
};

export default ModalFactory;