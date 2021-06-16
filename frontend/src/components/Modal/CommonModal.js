import { React, Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

class CommonModal extends Component {

    handleClose = () => {
        this.props.handleClose()
    }

    handleOk = () => {
        this.props.handleOk()
        this.props.handleClose()
    }

    test = (e) => {
        console.log(e, 123)
    }

    render() {
        const { modalShow, modalTitle, modalContents, okText, cancelText } = this.props
        

        return(
            <Modal show={modalShow} keyboard={true} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{ modalTitle }</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{ modalContents }</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.handleClose} variant="secondary">{ cancelText ? cancelText : '취소' }</Button>
                    <Button onClick={this.handleOk} variant="primary">{ okText ? okText :'확인' }</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CommonModal