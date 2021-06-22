import React, { Component } from 'react'
import './UserInfo.scss'
import userImage from '@/assets/images/UserImage.png'
import { BsGearFill } from "react-icons/bs";
import UserInfoSetting from "@/components/Modal/UserInfoSettingModal/UserInfoSettingModal"
import { customAxios } from '@/lib/customAxios';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

class UserInfo extends Component {
    state = {
        file: null,
        previewURL: null,
        schoolName: "학교를 등록해주세요",
        majorName: "학과를 등록해주세요",
        name: "이름을 등록해주세요",
        modalShow: false,
    }



    componentDidMount() {
        this.fetchUser();
    }

    fetchUser = () => {
        customAxios.get('/api/user/1')
            .then((r) => {
                this.setState({
                    name: r.data.userName,
                    schoolName: r.data.schoolName,
                    majorName: r.data.major,
                })
            })
            .catch(() => {
                this.setState({
                    modalShow: true,
                })
            })
    }

    handleSubmit = (userInfo) => {
        console.log(userInfo)
        customAxios.put('/api/user/1/', {
            userName: userInfo.name,
            schoolName: userInfo.schoolName,
            major: userInfo.majorName,
        })
        .then((r) => {
            this.fetchUser();
            this.setState({
                previewURL: userInfo.previewURL,
            })
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
                    <div className="info">{this.state.schoolName ? this.state.schoolName : '학교를 등록해주세요'}</div>
                    <div className="infoTitle">학과</div>
                    <div className="info">{this.state.majorName ? this.state.majorName : '학과를 등록해주세요'}</div>
                    <div className="infoTitle">이름</div>
                    <div className="info">{this.state.name ? this.state.name : '이름을 등록해주세요'}</div>
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