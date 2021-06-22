import React, { Component } from 'react'
import ToDoItem from './ToDoItem'

class ToDoList extends Component {
    render() {
        const { toDoList, handleCheck, handleDeleteItem, handleCheckItem, modifyItemContent} = this.props

        const list = toDoList.map(({toDoId, contents, checkedDate}) => (
            <ToDoItem
                key={toDoId}
                id={toDoId}
                value={contents}
                checkedTime={checkedDate}
                handleCheck={handleCheck}
                handleDeleteItem={handleDeleteItem}
                handleCheckItem={handleCheckItem}
                modifyItemContent={modifyItemContent}
            />
        ))

        return(
            <div>
                { list }
            </div>
        )
    }
}

export default ToDoList