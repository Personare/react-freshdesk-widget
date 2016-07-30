import React from 'react';
import { storiesOf } from '@kadira/storybook';

import FreshdeskWidget from './FreshdeskWidget';

const stories = storiesOf('FreshdeskWidget', module);

stories.add('With pop-up on top position', () => (
    <FreshdeskWidget url="https://support.freshdesk.com" type="pop-up">
        <button>Click Here</button>
    </FreshdeskWidget>
));

stories.add('Incorpored', () => (
    <FreshdeskWidget
        url="https://support.freshdesk.com"
    />
));
