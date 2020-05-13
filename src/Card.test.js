import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card.js';

test('test dynamic renders', () => {
  const wrapper = shallow(<Card pokemon={{}} />);
  expect(wrapper.find('div').length).toBe(1);
});

test('renders learn react link', () => {
  const wrapper = shallow(<Card pokemon={{}} />);
  expect(wrapper).toMatchSnapshot();
});