import React from 'react'
import Modal from 'react-modal';

import { ButtonPrimary, Text, Title, ButtonSecondary, Container, ModalContainer } from '../../styles/common'
 
const customStyles = {
    content : {
        top                   : '40%',
        left                  : '30%',
        right                 : 'auto',
        bottom                : 'auto',
        width                 : '40%',
        height                : '20%'
    }
};

Modal.setAppElement('#root')

function ModalMessage({ title, text, success, cancel, modalOpen, closeModal }){
    return(
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <ModalContainer>
               <Title fontSize="2vw" color="rgb(254, 13, 46)">{title}</Title>
               <Text fontSize="1vw">{text}</Text>
               <Container
                    width="100%"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
               >
                   <Container
                        width="55%"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                >
                    <ButtonSecondary width="10vw" height="4vh" onClick={cancel}>Cancelar</ButtonSecondary>
                    <ButtonPrimary width="10vw" height="4vh" onClick={success}>Aceptar</ButtonPrimary>
                </Container>
               </Container>
            </ModalContainer>
        </Modal>
    )
}

export default ModalMessage