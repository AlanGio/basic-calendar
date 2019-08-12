import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar.js';

describe('Page Render Component', () => {
  it('render a Calendar title', () => {
    const wrapper = shallow(<Calendar />);
    const text = wrapper.find('h1').text();
    expect(text).toEqual('Calendar');
  });
});