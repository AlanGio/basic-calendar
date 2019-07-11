import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimePicker from 'rc-time-picker-date-fns';
import { GithubPicker } from 'react-color';
import { addReminder } from '../../actions/reminders';
import { getWeather } from '../../actions/weather';


import 'rc-time-picker-date-fns/assets/index.css';
import './AddDate.scss';

const showSecond = false;

class AddDate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      city: '',
      color: '',
      title: '',
      time: props.selectedDate,
      typing: false,
      typingTimeout: 0,
    };

    this.closeButton = this.closeButton.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  onChangeCity(event) {
    const { getWeather, selectedDate } = this.props;
    const { typingTimeout } = this.state;
    const city = event.target.value;
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    this.setState({
      city,
      typing: false,
      typingTimeout: setTimeout(() => {
        if (city.length > 2) {
          getWeather({
            city,
            dt: selectedDate.getTime() / 1000,
          });
        }
      }, 1000)});
  }

  onChangeTime(value) {
    this.setState({ time: value });
  }

  onChangeColor(color) {
    this.setState({ color: color.hex });
  }

  closeButton() {
    this.props.showAddForm(false);
  }

  handleSubmit(event) {
    const { addReminder } = this.props;

    const time = new Date(this.props.selectedDate);
    time.setHours(this.state.time.getHours());
    time.setMinutes(this.state.time.getMinutes());

    addReminder({
      city: this.state.city,
      color: this.state.color,
      time,
      title: this.state.title,
      weather: this.props.weather,
    });
    this.props.showAddForm(false);
    event.preventDefault();
  }

  render() {
    const { weather, loading } = this.props;
    const { city } = this.state;
    console.log(this.props);

     return (
      <div className="form col-center add-reminder-form">
        <div className="close" onClick={this.closeButton} />
        <h2>
          Add a reminder
        </h2>
        <form onSubmit={this.handleSubmit}>

          <label>
            Choose Hour:
            <TimePicker
              showSecond={showSecond}
              defaultValue={this.props.selectedDate}
              className="time-picker"
              onChange={this.onChangeTime}
            />
          </label>
          <hr />

          <label>
            Choose Color:
            <GithubPicker
              color={this.state.background}
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

          <hr />

          <label>
            City:
            <span>
              <input type="text" name="city" maxLength="30" value={this.state.city} onChange={this.onChangeCity} />
            </span>
          </label>

          <hr />
          The weather will be:
          <div>{loading && 'Loading...'}</div>
          {!loading && weather && city && weather.map(({ id, main, description }) => (
            <div key={id}>The weather will be: <b>{main}</b> ({description})</div>
          ))}

          <input type="submit" value="Add Reminder" disabled={loading} />
        </form>
      </div>
    );
  }
}

AddDate.propTypes = {
  addReminder: PropTypes.func,
  getWeather: PropTypes.func,
  selectedDate: PropTypes.instanceOf(Date),
  showAddForm: PropTypes.func,
  weather: PropTypes.array,
};

AddDate.defaultProps = {
  addReminder: null,
  getWeather: null,
  selectedDate: new Date(),
  showAddForm: null,
  weather: [],
};


const mapStateToProps = state => ({
  weather: state.weather.status,
  loading: state.weather.loading,
});

const mapDispatchToProps = dispatch => ({
  addReminder: bindActionCreators(addReminder, dispatch),
  getWeather: bindActionCreators(getWeather, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDate);
