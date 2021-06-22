import React, { Component } from 'react'
import ToDoForm from '@/components/Common/ToDoForm'
import ToDoList from '@/components/Common/ToDoList'
import UserInfo from './UserInfo/UserInfo'
import { customAxios } from '@/lib/customAxios';
import moment from 'moment'
import './MainToDoTemplate.scss'

class MainToDoTemplate extends Component {
    
    state = {
        toDoList: [],
      }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        customAxios.get('/api/main-to-do/')
        .then((r) => {
            this.setState({
                toDoList: r.data || [],
            })
        })
    }

    handleDeleteItem = (id) => {
        customAxios.delete(`/api/main-to-do/${id}`)
        .then(() => {
            this.fetchData();
        })
    }

    handleSubmit = (newItem) => {
        customAxios.post('/api/main-to-do/', newItem)
            .then(() => {
                this.fetchData();
            })
    }

    handleCheckItem = (id) => {
        const target = this.state.toDoList.find((row) => {
            return row.toDoId == id
        })

        customAxios.put(`/api/main-to-do/${id}/`, {
            contents: target.contents,
            checkedDate: target.checkedDate ? '' : moment().format('YYYY-MM-DD')
        })
        .then(() => {
            this.fetchData();
        })
    }

    modifyItemContent = (id, content) => {
        
        customAxios.put(`/api/main-to-do/${id}/`, {
            contents: content,
        })
        .then(() => {
            this.fetchData();
        })
    }

    render() {
        return(
            <div className="mainToDoTemplate">
                <UserInfo/>
                <ToDoForm
                    handleSubmit={this.handleSubmit}
                />
                <div className="mainToDoBody">
                    <ToDoList
                        toDoList={this.state.toDoList}
                        handleDeleteItem={this.handleDeleteItem}
                        handleCheckItem={this.handleCheckItem}
                        modifyItemContent={this.modifyItemContent}
                    />
                </div>
            </div>
        )
    }
}

export default MainToDoTemplate