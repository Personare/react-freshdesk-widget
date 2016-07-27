import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { describe, it, before } from 'mocha';

import FreshdeskWidget from './../src/FreshdeskWidget';

describe('<FreshdeskWidget />', function FreshdeskWidgetTests() {
    this.timeout(5000);

    before(() => {
        const componentDidMount = FreshdeskWidget.prototype.componentDidMount;

        return componentDidMount.calledOnce;
    });

    it('the state should be equal three after three seconds', done => {
        const wrapper = mount(<FreshdeskWidget />);

        setTimeout(() => {
            expect(wrapper.state('count')).to.be.equal(3);
            done();
        }, 4000);
    });
});
