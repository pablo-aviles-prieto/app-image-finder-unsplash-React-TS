import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useAppSelector } from '../../app/hooks';

import styles from './Modal.module.css';

const style = {
  transform: 'translate(-50%, -50%)',
  bgcolor: '#e7e7e7',
  border: '1px solid #000',
  boxShadow: 24,
};

type Props = {
  children: JSX.Element;
  handlingModal: () => void;
};

export const ModalBackdrop: React.FC<Props> = ({
  handlingModal,
  children,
}) => {
  const modalState = useAppSelector((state) => state.modal.modalState);
  console.log('modalState', modalState);
  

  return (
    <div>
      <Modal
        aria-labelledby='modal-backdrop'
        aria-describedby='modal-backdrop'
        open={modalState}
        onClose={() => handlingModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalState}>
          <Box className={styles['modal-container']} sx={style}>
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
