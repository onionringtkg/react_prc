import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'

import { getEvent, deleteEvent, putEvent } from '../actions';

class EventsShow extends Component {
  //onSubmit をバインドする
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)

  }

  componentDidMount() {
    const { id }  = this.props.match.params
    if (id) this.props.getEvent(id)
  }

  renderField(field) {
    const {input, label, type, meta: {touched, error} } = field

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }

  async onDeleteClick() {
    const { id } = this.props.match.params
    await this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  async onSubmit(values) {
    await this.props.putEvent(values)
    //トップページの履歴をプッシュ
    this.props.history.push('/')
  } 

  //redux-formを使用した入力formの実装 (field)
  render() {
    //pristine は入力なし状態
    const { handleSubmit, pristine, submitting, invalid } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div><Field label="Title" name="title" type="text" component={this.renderField}/></div>
          <div><Field label="Body" name="body" type="text" component={this.renderField}/></div>
        
          <div>
            <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
            <Link to="/">Cancel</Link>
            <Link to="/" onClick={this.onDeleteClick}>Delete</Link>
          </div>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "Enter a title, please."
  if (!values.body) errors.body = "Enter a title, please."

  return errors
}

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
}
//あるアクションが発生した際に、reducerに状態に応じてActionを実行させる
const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

export default connect(mapStateToProps, mapDispatchToProps)(
  //redeux-formでeventsnewをデコレートする
  //enableReinitialize: true -> 更新画面表示に必要
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true})(EventsShow)
)