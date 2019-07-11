import React, { Component } from 'react';
import dateFns from 'date-fns';
import Header from '../Header';
import Day from '../Day';
import Cell from '../Cell';

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
    };
  }

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
    });
  };

  render() {
    const { currentMonth, selectedDate } = this.state;
    return (
      <div className="calendar">
        <Header currentMonth={currentMonth} prevMonth={this.prevMonth} nextMonth={this.nextMonth} />
        <Day currentMonth={currentMonth} />
        <Cell currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={this.onDateClick}/>
      </div>
    );
  }
}

export default Calendar;
