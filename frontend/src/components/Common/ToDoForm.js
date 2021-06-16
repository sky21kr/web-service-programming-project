import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './ToDoForm.scss'

class ToDoForm extends Component {
    state = {
        input: ""
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.input.trim() === "") {
            this.setState({
                input: "",
            })
            return
        }

        const newItem = {id: uuidv4(), value: this.state.input, checkedTime: null}
        this.props.handleSubmit(newItem)
        this.setState({
            input: "",
        })
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value,
        })
    }

    render() {
        return(
            <form className="inputForm" onSubmit={this.handleSubmit}>
                <input
                    className="toDoInput"
                    value={this.state.input}
                    onChange={this.handleChange}
                    placeholder="Enter To Do"
                    />
            </form>
        )
    }

}

export default ToDoForm