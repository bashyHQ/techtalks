import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getStoreEntity } from 'utils'
import LoadEditor from 'components/Editor'

class WriteReply extends React.Component {
  constructor (props) {
    super()
    this.state = {
      editing: false,
      editor: null
    }
    this.options = {
      docFormat: 'html',
      menuBar: false,
      inlineMenu: true,
      buttonMenu: true
    }
    LoadEditor.then(x => this.setState({editor: x}))
  }

  render () {
    if (this.state.editing) {
      if (!this.state.editor) {
        return <div>Loading</div>
      }
      const Editor = this.state.editor
      return <div>
              <h3>Reply</h3>
              <Editor value={''} options={this.options} ref='editor'/>
              <button onClick={::this.send}>Send</button>
            </div>
    }
    return <div>
             <h3>Reply</h3>
             <div onClick={x => this.setState({editing: true})}>click here to write reply</div>
           </div>
  }
  send () {
    alert(this.refs.editor.pm.getContent('markdown'))
  }
}

class PrivateMessageView extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    message: PropTypes.object.isRequired
  }

  render () {
    const { message } = this.props

    return <div>
            <span>{message.created_at}</span>
            <h2>{message.title}</h2>
            <WriteReply />
          </div>
  }
}

function mapStateToProps (state, ownProps) {
  const { commentId } = ownProps.params
  const message = getStoreEntity(state, {id: commentId, type: 'comment'})

  return { message }
}

export default connect(
  mapStateToProps
)(PrivateMessageView)
