import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

test('test dynamic renders', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('div').length).toBe(1);
});

test('renders learn react link', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});