import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { describe, it } from 'mocha';

import FreshdeskWidget from './../src/FreshdeskWidget';

describe('<FreshdeskWidget />', function FreshdeskWidgetTests() {
    it('should be rendered the child element when type is pop-up', () => {
        const wrapper = shallow(
            <FreshdeskWidget url="https://support.freshdesk.com" type="pop-up">
                <button>Send Feedback</button>
            </FreshdeskWidget>
        );

        expect(wrapper.containsMatchingElement([
            <button>Send Feedback</button>
        ])).to.equal(true);
    });

    it('should be rendered an iframe when type is incorporated', () => {
        const wrapper = shallow(
            <FreshdeskWidget url="https://support.freshdesk.com" type="incorporated" />
        );

        expect(wrapper.find('#freshwidget-embedded-form')).to.have.length(1);
    });

    it('should be rendered an iframe with a correct src', () => {
        const supportUrl = 'https://support.freshdesk.com';

        const formTitle = 'Help here';
        const formHeight = '200px';
        const submitThanks = 'Fine';

        const wrapper = mount(
            <FreshdeskWidget
                url={supportUrl}
                formTitle={formTitle}
                formHeight={formHeight}
                submitThanks={submitThanks}
            />
        );

        const mockWidgetUrl = `${supportUrl}/widgets/feedback_widget/new?`;

        const mockQueryString = [
            'widgetType=embedded',
            'screenshot=no',
            `formTitle=${formTitle}`,
            `formHeight=${formHeight}`,
            `submitThanks=${submitThanks}`
        ].join('&');

        expect(
            wrapper.find('iframe').node.getAttribute('src')
        ).to.equal(`${mockWidgetUrl}${mockQueryString}`);
    });

    it('should automatically fill in fields correctly.', () => {
        const wrapper = mount(
            <FreshdeskWidget
                url="https://support.freshdesk.com"
                autofill={{ requester: 'test@example.com' }}
            />
          );

        expect(
            wrapper.find('iframe').node.getAttribute('src')
        ).to.match(/helpdesk_ticket\[requester\]=test@example.com/);
    });
});
