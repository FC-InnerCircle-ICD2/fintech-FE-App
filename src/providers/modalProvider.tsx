import { useModalStore } from '@stores/modal';
import { cloneElement } from 'react';
import { Fragment } from 'react/jsx-runtime';

const ModalProvider = () => {
  const { modals } = useModalStore();
  return modals.map((modal) => {
    return (
      <Fragment key={modal.id}>
        {cloneElement(modal.children, { modal })}
      </Fragment>
    );
  });
};

export default ModalProvider;
