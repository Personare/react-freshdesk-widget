import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { describe, it, before } from 'mocha';

import FreshdeskWidget from './../src/FreshdeskWidget';

describe('<FreshdeskWidget />', function FreshdeskWidgetTests() {
    it('the state of rendered should be equal false componentDidMount', () => {
        const wrapper = mount(<FreshdeskWidget url="https://support.freshdesk.com" />);
    });
});
