import { React, Component } from 'react'
import './ClassName.scss'

class ClassName extends Component {
    render() {
        const { title } = this.props

        return(
            <div className="classTitle">
                { title }
            </div>
        )
    }
}

export default ClassName