
import PropTypes from 'prop-types';
import React from 'react';
import dateFns from 'date-fns';

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: props.currentMonth,
    };
  }

  render() {
    const dateFormat = 'dddd';
    const days = [];
    const startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i += 1) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>,
      );
    }

    return (
      <div className="days row">
        {days}
      </div>
    );
  }
}

Day.propTypes = {
  currentMonth: PropTypes.instanceOf(Date),
}

Day.defaultProps = {
  currentMonth: new Date(),
}


export default Day;
