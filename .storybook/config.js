import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/FreshdeskWidget.story');
}

configure(loadStories, module);
