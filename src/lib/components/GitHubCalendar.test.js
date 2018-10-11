import React from 'react';
import ReactDOM from 'react-dom';
import GitHubCalendar from './GitHubCalendar';

it('Example renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GitHubCalendar username="grubersjoe" />, div);
});
