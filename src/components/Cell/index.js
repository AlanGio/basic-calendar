import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import dateFns from 'date-fns';
import AddDate from '../AddDate';
import EditReminderForm from '../EditReminderForm';
import { removeReminder } from '../../actions/reminders';

import './Cell.scss';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditForm: false,
      showAddForm: false,
      selectedReminder: null,
    };
  }

  removeReminder = (e, reminder) => {
    e.stopPropagation();
    this.props.removeReminder(reminder);
  }

  getTodayReminders = (day) => {
    const todayReminders = this.props.reminders.filter((reminder) => dateFns.isSameDay(day, reminder.time));
    return todayReminders.sort((a, b) => {
      return dateFns.isAfter(a.time, b.time);
    });
  }

  showEditForm = (action) => {
    this.setState({
      showEditForm: action,
    });
  };

  showAddForm = (action) => {
    this.setState({
      showAddForm: action,
    });
  };

  editReminder(e, reminder) {
    e.stopPropagation();

    this.setState({
      showEditForm: true,
      selectedReminder: reminder,
    });
  }

  deleteAllReminders(e, todayReminders) {
    e.stopPropagation(e);
    for (let i in todayReminders) { 
      this.props.removeReminder(todayReminders[i]);
    }
  }

  handleCellClick(cloneDay) {
    this.props.onDateClick(dateFns.parse(cloneDay));
    this.setState({
      showEditForm: false,
      showAddForm: true,
    });
  }


  render() {

    const monthStart = dateFns.startOfMonth(this.props.currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const hourFormat = 'HH:mm';

    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {

        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const todayReminders = this.getTodayReminders(day);

        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, this.props.selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={(e) => this.handleCellClick(cloneDay)}
          >
            <span className="number">
              {formattedDate}
            </span>

            {todayReminders.length > 0 && (<button className="removeall" onClick={(e) => this.deleteAllReminders(e, todayReminders)}>X Clean Date</button>)}
            {todayReminders.map((reminder, index) => (
              <div className="event" key={`dat_${index}`} style={{ backgroundColor: reminder.color }}>
                  <div className="edit" onClick={(e) => this.editReminder(e, reminder)} />
                  <b>{dateFns.format(reminder.time, hourFormat).toString()}</b> - {reminder.title}
                </div>
            ))}
          </div>,
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return (
      <div>
        <div className="body">{rows}</div>

        {this.state.showEditForm ? (
          <EditReminderForm reminder={this.state.selectedReminder} showEditForm={this.showEditForm} removeReminder={this.removeReminder} />
        ) : this.props.selectedDate && this.state.showAddForm  && (
          <AddDate selectedDate={this.props.selectedDate} showAddForm={this.showAddForm} />
        )}
      </div>
    );
  };
};

Cell.propTypes = {
  currentMonth: PropTypes.instanceOf(Date),
  removeReminder: PropTypes.func,
  onDateClick: PropTypes.func,
};

Cell.defaultProps = {
  currentMonth: new Date(),
  removeReminder: null,
  onDateClick: null,
};

const mapStateToProps = state => ({
  reminders: state.reminders,
});

const mapDispatchToProps = dispatch => ({
  removeReminder: bindActionCreators(removeReminder, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
