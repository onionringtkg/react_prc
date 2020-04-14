import React, { Component } from 'react';
import { connect } from 'react-redux';
import { readEvents } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

class EventsIndex extends Component {
  //コンポーネントがマウントされた際に呼ばれるメソッド
  //イベント一覧を表示する
  componentDidMount() {
    this.props.readEvents()
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </td>
        <td>{event.body}</td>
      </tr>
    ))
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>

        <tbody>
          {this.renderEvents()}
        </tbody>
        </table>

        <Link to="/events/new">New Event</Link>
      </div>
    )
  }
}

//stateとactioをcomponentに関連づけるコーディング　start
//このコンポーネントに必要なものをstateから取り出して、どのオブジェクトをcomponentのpropsとして対応させるのかを関数の戻り値で定義
const mapStateToProps = state => ({ events: state.events })
//あるアクションが発生した際に、reducerに状態に応じてActionを実行させる
//const mapDispatchToProps = ({increment, decrement})でも同意
const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
//stateとactioをcomponentに関連づけるコーディング　fin
