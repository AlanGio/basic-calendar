import PropTypes from 'prop-types';
import React from 'react';
import dateFns from 'date-fns';

const Header = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={prevMonth}>chevron_left</div>
      </div>
      <div className="col col-center">
        <span>
          {dateFns.format(currentMonth, 'MMMM YYYY')}
        </span>
        <hr />
        <small>
          Click on any day to add a reminder
        </small>
      </div>
      <div className="col col-end" onClick={nextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  );
};

Header.propTypes = {
  currentMonth: PropTypes.instanceOf(Date),
  prevMonth: PropTypes.func,
  nextMonth: PropTypes.func,
};

Header.defaultProps = {
  currentMonth: new Date(),
  prevMonth: null,
  nextMonth: null,
};

export default Header;
