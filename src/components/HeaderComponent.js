import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, ModalFooter, ModalBody} from "reactstrap"
import LoginCard from "../redux/loginCard"

  
function Header(props) {
    const [modal, setModal] = React.useState(false);
    const toggle = () => {
        setModal(!modal)
    }
    const toggle2 = () => {
        setModal(!modal)
        return props.handleCallback(1)
    }

    return (
        <div style={{
            display: 'block', width: 300, padding: 30, alignItems:'center', justifyContent: 'center' 
        }}>
            <Button style={{width: 250}} color="primary"
                onClick={toggle}>Login</Button>
            <Modal isOpen={modal} toggle={toggle} size="sm">
                <ModalBody>
                    <LoginCard />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle2}>Okay</Button>
                </ModalFooter>
            </Modal>
        </div >
    );
}
  
export default Header;