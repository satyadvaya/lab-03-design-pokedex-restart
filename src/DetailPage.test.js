import React from 'react';
import { shallow } from 'enzyme';
import DetailPage from './DetailPage.js';

test('test dynamic renders', () => {
  const wrapper = shallow(<DetailPage pokemon={{}} />);
  expect(wrapper.find('div').length).toBe(1);
});

test('renders learn react link', () => {
  const wrapper = shallow(<DetailPage pokemon={{}} />);
  expect(wrapper).toMatchSnapshot();
});