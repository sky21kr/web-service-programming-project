import React, { Component } from 'react'
import './UserInfo.scss'
import userImage from '@/assets/images/UserImage.png'
import { BsGearFill } from "react-icons/bs";
import UserInfoSetting from "@/components/Modal/UserInfoSettingModal/UserInfoSettingModal"

class UserInfo extends Component {
    state = {
        file: null,
        previewURL: null,
        schoolName: "경희대학교",
        majorName: "컴퓨터공학과",
        name: "신승민",
        modalShow: false,
    }

    componentDidMount() {
    }

    handleSubmit = (userInfo) => {
        this.setState({
            ...userInfo,
        })
    }

    handleShow = () => {
        this.setState({
            modalShow: true,
        })
    }

    handleClose = () => {
        this.setState({
            modalShow: false,
        })
    }

    render() {
        return (
            <div className="userInfoTemplate">
                <div>
                    {this.state.previewURL ?
                    <img className="userImage" src={this.state.previewURL}/>
                    : <img className="userImage" src={userImage}/>
                    }
                    
                </div>
                <div className="userInfo">
                    <div className="infoTitle">학교</div>
                    <div className="info">{this.state.schoolName}</div>
                    <div className="infoTitle">학과</div>
                    <div className="info">{this.state.majorName}</div>
                    <div className="infoTitle">이름</div>
                    <div className="info">{this.state.name}</div>
                </div>
                <BsGearFill onClick={this.handleShow} className="userInfoSetting" />
                <UserInfoSetting
                    modalShow={this.state.modalShow}
                    file={this.state.file}
                    previewURL={this.state.previewURL}
                    schoolName={this.state.schoolName}
                    majorName={this.state.majorName}
                    name={this.state.name}
                    handleSubmit={this.handleSubmit}
                    handleClose={this.handleClose}
                />
            </div>
        )
    }
}

export default UserInfo