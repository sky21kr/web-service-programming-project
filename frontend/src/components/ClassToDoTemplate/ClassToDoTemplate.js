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
import { customAxios } from '@/lib/customAxios';

class ClassToDoTemplate extends Component {
    state = {
        modifyModalShow: false,
        deleteModalShow: false,
        toDoList: [],
    }

    componentDidMount() {
        this.fetchToDo();
    }

    fetchToDo = () => {
        customAxios.get(`/api/to-do`)
          .then((r) => {

            const classToDoList = r.data.filter((todo) => todo.classId === this.props.classId)

            const deleteToDoId = classToDoList.filter((toDoItem) => {
                if(toDoItem.checkedDate !== '' && moment(toDoItem.checkedDate).add(1, 'd') <= moment()) return true
                return false
            }).map((d) => d.toDoId)

            deleteToDoId.forEach((toDoId) => {
                customAxios.delete(`/api/to-do/${toDoId}`)
            })

            const toDoList = classToDoList.filter((toDoItem) => {
                if(toDoItem.checkedDate !== '' && moment(toDoItem.checkedDate).add(1, 'd') <= moment()) return false
                return true
            })

            this.setState({
                toDoList: toDoList || [],
            })
          })
    }

    handleDeleteItem = (id) => {
        customAxios.delete(`/api/to-do/${id}`)
          .then(() => {
              this.fetchToDo();
          })
    }

    handleCheckItem = (id) => {

        const target = this.state.toDoList.find((row) => {
            return row.toDoId == id
        })

        customAxios.put(`/api/to-do/${id}/`, {
            classId: this.props.classId,
            contents: target.contents,
            checkedDate: target.checkedDate ? '' : moment().format('YYYY-MM-DD')
        })
        .then(() => {
            this.fetchToDo();
        })
    
    }

    modifyItemContent = (id, contents) => {
        console.log(id, contents)
        customAxios.put(`/api/to-do/${id}/`, {
            classId: this.props.classId,
            contents,    
        })
        .then(() => {
            this.fetchToDo();
        })
    }

    handleSubmit = (newItem) => {
        console.log('newItem', newItem)
        customAxios.post(`/api/to-do/`, {
            ...newItem,
            classId: this.props.classId,
        })
        .then((r) => {
            this.fetchToDo();
        })
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
                        title={this.props.className}
                    />
                    <ToDoForm
                        handleSubmit={this.handleSubmit}
                    />
                </div>
                <div className="classTemplateBody">
                    <ToDoList
                        toDoList={this.state.toDoList}
                        handleDeleteItem={this.handleDeleteItem}
                        handleCheckItem={this.handleCheckItem}
                        modifyItemContent={this.modifyItemContent}
                    />
                </div>
                <div className="classToDoFooter">
                </div>
                <SubmitClassModal
                    mode={'modify'}
                    className={this.props.className}
                    classId={this.props.classId}
                    modalShow={modifyModalShow}
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