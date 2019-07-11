
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import TimePicker from 'rc-time-picker-date-fns';
import { GithubPicker } from 'react-color';
import { editReminder } from '../../actions/reminders';
import { getWeather } from '../../actions/weather';

import 'rc-time-picker-date-fns/assets/index.css';

const showSecond = false;

class EditReminderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.reminder.city,
      color: props.reminder.color,
      time: props.reminder.time,
      title: props.reminder.title,
    };

    this.closeButton = this.closeButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.removeReminderButton = this.removeReminderButton.bind(this);

    props.getWeather({
      city: props.reminder.city,
      dt: props.reminder.time.getTime() / 1000,
    });
  }

  onChangeCity(event) {
    const { getWeather, reminder } = this.props;
    const { typingTimeout } = this.state;
    const city = event.target.value;
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    this.setState({
      city,
      typing: false,
      typingTimeout: setTimeout(() => {
        if (city.length > 2 && reminder.time) {
          getWeather({
            city,
            dt: reminder.time.getTime() / 1000,
          });
        }
      }, 1000)});
  }

  onChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  onChangeTime(value) {
    this.setState({ time: value });
  }

  onChangeColor(color) {
    this.setState({ color: color.hex })
  }

  closeButton() {
    this.props.showEditForm(false);
  }

  handleSubmit(event) {
    const time = new Date(this.props.reminder.time);
    time.setHours(this.state.time.getHours());
    time.setMinutes(this.state.time.getMinutes());

    const { id } = this.props.reminder;
    const { title, city, color } = this.state;

    this.props.editReminder({
      id,
      city,
      color,
      title,
      time,
    });

    this.props.showEditForm(false);
    event.preventDefault();
  }

  removeReminderButton(e) {
    this.props.removeReminder(e, this.props.reminder);
    this.props.showEditForm(false);
  }

  render() {

    const { reminder, weather, loading } = this.props;
    const { city } = this.state;

    return (
      <div className="form col-center edit-reminder-form">
        <div className="close" onClick={this.closeButton} />
        <h2>
          Edit a reminder
        </h2>
        <form onSubmit={this.handleSubmit}>

          <label>
            Choose Hour
            <TimePicker
              showSecond={showSecond}
              defaultValue={reminder.time}
              className="xxx"
              onChange={this.onChangeTime}
            />
          </label>
          <hr />

          <label>
            Choose Color:
            <GithubPicker
              color={ this.state.background }
              onChangeComplete={this.onChangeColor}
            />
          </label>
          <hr />

          <label>
            Reminder Title:
            <span>
              <input type="text" name="title" maxLength="30" value={this.state.title} onChange={this.onChangeTitle} />
            </span>
          </label>

          <label>
            City:
            <span>
              <input type="text" name="city" value={this.state.city} onChange={this.onChangeCity} />
            </span>
          </label>

          <hr />
          The weather will be:
          <div>{loading && 'Loading'}</div>
          {!loading && weather && city && weather.map(({ id, main, description }) => (
            <div key={id}><b>{main}</b> ({description})</div>
          ))}

          <button type="button" onClick={this.removeReminderButton}>
            Remove Reminder
          </button>
          <input type="submit" value="Edit Reminder" />
        </form>
      </div>
    );
  }
}

EditReminderForm.propTypes = {
  reminder: PropTypes.object,
  showEditForm: PropTypes.func,
  weather: PropTypes.array,
};

EditReminderForm.defaultProps = {
  reminder: {},
  showEditForm: null,
  weather: [],
};

const mapStateToProps = state => ({
  weather: state.weather.status,
  loading: state.weather.loading,
});

const mapDispatchToProps = dispatch => ({
  editReminder: bindActionCreators(editReminder, dispatch),
  getWeather: bindActionCreators(getWeather, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditReminderForm);
