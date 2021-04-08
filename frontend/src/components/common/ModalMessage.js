import React from 'react'
import Modal from 'react-modal';

import { ButtonPrimary, Text, Title, ButtonSecondary, Container, ModalContainer } from '../../styles/common'

import { maxWidth } from '../../var'
 
const customStyles = {
    content : {
        top                   : window.innerWidth <= maxWidth ? '30%' : '40%',
        left                  : window.innerWidth <= maxWidth ? '10%' : '30%',
        right                 : 'auto',
        bottom                : 'auto',
        width                 : window.innerWidth <= maxWidth ? '70%' : '40%',
        height                : window.innerWidth <= maxWidth ? '30%' : '20%'
    },overlay:{
        zIndex                : 3
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
                        id="btn-modal-container"
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