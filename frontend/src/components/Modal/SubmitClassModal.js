import { React, Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

class SubmitClassModal extends Component {
    state = {
        name: "",
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleAdd = () => {
        this.props.addClass(this.state.name)
        this.handleClose()
    }

    handleModify = () => {
        const modifyClassInfo = {
            name: this.state.name,
        }
        this.props.modifyClass(this.props.classInfo.id, modifyClassInfo)
        this.handleClose()
    }

    handleClose = () => {
        this.setState({
            name: ""
        })
        this.props.handleClose()
    }


    render() {
        const { modalShow, classInfo, mode } = this.props

        return (
            <Modal show={modalShow} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>
                    { mode === 'add' ? '수업 추가': '수업 수정'}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        수업이름
                        <input
                            defaultValue={mode === 'modify' ? classInfo.name : ''}
                            onChange={this.handleChange}
                        />
                    </div> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={mode === 'add' ? this.handleAdd : this.handleModify}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default SubmitClassModal