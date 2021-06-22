import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './UserInfoSettingModal.scss'
import userImage from '@/assets/images/UserImage.png'

class UserInfoSetting extends Component {
    fileInputRef = React.createRef() 

    state = {
        file: this.props.file,
        previewURL: this.props.previewURL,
        schoolName: this.props.schoolName,
        majorName: this.props.majorName,
        name: this.props.name,
    }

    componentDidUpdate = (prevProps, prevState) => { //componentDidUpdate가 props의 변과를 감지한다
        if (this.props.name !== prevProps.name) { //하위컴포넌트가 받은 props값 적어주기(둘다)
          this.setState({
            name: this.props.name
          });
        }

        if (this.props.majorName !== prevProps.majorName) { //하위컴포넌트가 받은 props값 적어주기(둘다)
        this.setState({
            majorName: this.props.majorName
        });
        }

        if (this.props.schoolName !== prevProps.schoolName) { //하위컴포넌트가 받은 props값 적어주기(둘다)
        this.setState({
            schoolName: this.props.schoolName
        });
        }
      };

    handleChange = (e) => {
        const { value, name } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        this.props.handleSubmit(this.state)
        this.props.handleClose()
    }

    handleFileOnChange = (e) => {
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.onloadend = () => {
            this.setState({
                file: file,
                previewURL: reader.result
            })
        }
        reader.readAsDataURL(file)
    }

    
    clickFileSelect = () => {
        console.log(this.fileInputRef.current.click())
    }


    render() {
        const { modalShow } = this.props

        let profile_preview = null
        if(this.state.file) {
            profile_preview = <img className="userImage" src={this.state.previewURL}/>
        } else {
            profile_preview = <img className="userImage" src={userImage}/>
        }

        return (
            <Modal show={modalShow} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>
                    정보 수정
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="userInfoSettingModalBody">
                        <div className="image-div">
                            <div>
                                {profile_preview}
                            </div>
                            <Button
                                className="btn-select"
                                onClick={this.clickFileSelect}>
                                파일 선택
                            </Button>
                            <input
                                ref={this.fileInputRef}
                                className="input-file"
                                type="file"
                                accept='image/jpg,impge/png,image/jpeg,image/gif'
                                onChange={this.handleFileOnChange}
                            />
                        </div>
                        <div className="info-div">
                            <div>
                                학교
                                <input
                                    placeholder="학교"
                                    name="schoolName"
                                    defaultValue={this.props.schoolName}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                학과
                                <input
                                    placeholder="학과"
                                    name="majorName"
                                    defaultValue={this.props.majorName}
                                    onChange={this.handleChange}
                                />
                            </div> 
                            <div>
                                이름
                                <input
                                    placeholder="이름"
                                    name="name"
                                    defaultValue={this.props.name}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default UserInfoSetting