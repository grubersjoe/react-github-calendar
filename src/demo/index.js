import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './Demo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Demo />, document.getElementById('root'));
serviceWorker.unregister();
