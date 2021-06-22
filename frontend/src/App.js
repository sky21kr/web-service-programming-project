import TopBar from '@/components/TopBar/TopBar'
import MainToDoTemplate from '@/components/MainToDoTemplate/MainToDoTemplate'
import ClassToDoTemplate from '@/components/ClassToDoTemplate/ClassToDoTemplate'
import AddClassTemplate from '@/components/AddClassTemplate/AddClassTemplate'
import React, { Component } from 'react';
import { customAxios } from '@/lib/customAxios';
import './App.scss'

class App extends Component {
  state = {
    classList: [],
  }
  
  componentDidMount() {
    this.fetchClass();
  }

  fetchClass = () => {
    customAxios.get('/api/class')
      .then((r) => {
        console.log('classList', r.data)
        this.setState({
          classList: r.data
        })
      })
  }

  changeMainToDoList = (toDoList) => {
    this.setState({
      mainToDoList: toDoList
    }, () => {
      localStorage.setItem('mainToDoList', JSON.stringify(this.state.mainToDoList))
    })
  }

  addClass = (className) => {
    customAxios.post('/api/class/', {
      className,
    })
      .then((r) => {
        this.fetchClass();
      })
  }

  modifyClass = (classId, modifyClassInfo) => {
    customAxios.put(`/api/class/${classId}/`, {
      className: modifyClassInfo.name,
    })
      .then(() => {
        this.fetchClass();
      })
  }

  deleteClass = (classId) => {
    customAxios.delete(`/api/class/${classId}/`)
      .then(() => {
        this.fetchClass();
      })
  }

  render() {
    const { mainToDoList, classList } = this.state

    const classTemplateList = classList.map((cls) => {
      return <ClassToDoTemplate
                key={cls.classId}
                className={cls.className}
                classId={cls.classId}
                modifyClass={this.modifyClass}
                deleteClass={() => this.deleteClass(cls.id)}
                changeClassToDoList={this.changeClassToDoList}
              />
    })

    return (
      <div className="body">
        <TopBar/>
        <div className="contents">
          <div className="leftSide">
            <MainToDoTemplate
              toDoList={mainToDoList}
            />
          </div>
          <div className="rightSide">
            { classTemplateList }
              <AddClassTemplate
                addClass={this.addClass}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
