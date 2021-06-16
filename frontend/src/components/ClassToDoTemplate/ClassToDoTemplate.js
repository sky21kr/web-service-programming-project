import React, { Component } from 'react'
import ClassName from './ClassName/ClassName'
import ToDoForm from '@/components/Common/ToDoForm'
import ToDoList from '@/components/Common/ToDoList'
import SubmitClassModal from '@/components/Modal/SubmitClassModal'
import CommonModal from '@/components/Modal/CommonModal'
import './ClassToDoTemplate.scss'
import { FaEllipsisH } from 'react-icons/fa'
import { Dropdown } from 'react-bootstrap'
import moment from 'moment'

class ClassToDoTemplate extends Component {
    state = {
        modifyModalShow: false,
        deleteModalShow: false,
    }


    handleDeleteItem = (id) => {
        const newList = this.props.info.toDoList.filter((list) => {
            return list.id !== id
        })
        this.props.changeClassToDoList(this.props.info.id, newList)
    }

    handleCheckItem = (id) => {
        const newList = this.props.info.toDoList.map((list) => {
            if( list.id === id ) {
                if(list.checkedTime) list.checkedTime = null
                else list.checkedTime = moment().format('YYYY-MM-DD')
                return list
            } else return list
        })
        this.props.changeClassToDoList(this.props.info.id, newList)
    }

    modifyItemContent = (id, content) => {
        const newList = this.props.info.toDoList.map((list) => {
            if( list.id === id ) {
                const newList = {
                    ...list, value: content
                }
                return newList
            } else return list
        })
        this.props.changeClassToDoList(this.props.info.id, newList)
    }

    handleSubmit = (newItem) => {
        const newList = [...this.props.info.toDoList, newItem]
        this.props.changeClassToDoList(this.props.info.id, newList)
    }

    clickModifyBtn = () => {
        this.setState({
            modifyModalShow: true,
        })
    }

    clickClassDeleteBtn = () => {
        this.setState({
            deleteModalShow: true,
        })
    }

    handleModifyModalClose = () => {
        this.setState({
            modifyModalShow: false,
        })
    }

    handleDeleteModalClose = () => {
        this.setState({
            deleteModalShow: false,
        })
    }

    render() {
        const { info, modifyClass, deleteClass } = this.props;
        const { modifyModalShow, deleteModalShow } = this.state

        return(
            <div className="classToDoTemplate">
                <div className="classToDoTop">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-custom-components">
                            <FaEllipsisH
                                className="ellipsisBtn"
                            />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.clickClassDeleteBtn} eventKey="1">삭제</Dropdown.Item>
                            <Dropdown.Item onClick={this.clickModifyBtn} eventKey="2">수정</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="classToDoHeader">
                    <ClassName
                        title={info.name}
                    />
                    <ToDoForm
                        handleSubmit={this.handleSubmit}
                    />
                </div>
                <div className="classTemplateBody">
                    <ToDoList
                        toDoList={info.toDoList}
                        handleDeleteItem={this.handleDeleteItem}
                        handleCheckItem={this.handleCheckItem}
                        modifyItemContent={this.modifyItemContent}
                    />
                </div>
                <div className="classToDoFooter">
                </div>
                <SubmitClassModal
                    mode={'modify'}
                    modalShow={modifyModalShow}
                    classInfo={info}
                    modifyClass={modifyClass}
                    handleClose={this.handleModifyModalClose}
                />
                <CommonModal
                    modalShow={deleteModalShow}
                    handleClose={this.handleDeleteModalClose}
                    handleOk={deleteClass}
                    modalTitle="수업 삭제"
                    modalContents="해당 수업을 삭제하시겠습니까?"
                />
            </div>
        )
    }
}

export default ClassToDoTemplate