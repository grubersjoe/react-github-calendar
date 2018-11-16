import React from 'react';
import ReactTooltip from 'react-tooltip';
import { format } from "date-fns";

import 'typeface-roboto';
import 'typeface-roboto-mono';
import './Demo.css';

import GitHubCalendar from '../lib';

const username = 'grubersjoe';

const Demo = () => (
  <div>
    <header>
      <div className="container">
        <h1>GitHub Contributions Calendar</h1>
        <div style={{ marginBottom: '1rem' }}>A React component to display a GitHub contributions
          graph
        </div>
        <div>
          <small>
            Made
            with <span style={{ margin: '0 0.2em' }}>❤</span> by <a href="https://github.com/grubersjoe" target="_blank" rel="noopener noreferrer">@grubersjoe</a>
          </small>
        </div>
      </div>
    </header>

    <main className="container">
      <p>
        This project is originally based on the nicely
        working <a href="https://github.com/sallar/github-contributions-chart" target="_blank" rel="noopener noreferrer">@sallar/github-contributions-chart </a> and
        uses the
        same <a href="https://github.com/sallar/github-contributions-api" target="_blank" rel="noopener noreferrer">API</a> to
        retrieve the contribution data.
      </p>
      <p>
        Unlike @sallar's canvas based chart, this component uses SVG to render the graph, so it
        scales automatically. The meta information above and below the chart is ordinary text with a
        font size relative to the component's <code>fontSize</code> property. So, this text won't
        resize in smaller viewports. Use media queries to adjust the font size it if
        required.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>username</td>
              <td>String</td>
              <td>-</td>
              <td>A GitHub username (<em>required, obviously</em>)</td>
            </tr>
            <tr>
              <td>blockMargin</td>
              <td>Number</td>
              <td>2</td>
              <td>Margin between blocks</td>
            </tr>
            <tr>
              <td>blockSize</td>
              <td>Number</td>
              <td>10</td>
              <td>Size of one block (one day)</td>
            </tr>
            <tr>
              <td>color</td>
              <td>String|<a href="https://www.npmjs.com/package/color">Color</a></td>
              <td>null</td>
              <td>Base color to compute graph intensity colors (see below)</td>
            </tr>
            <tr>
              <td>dateFormat</td>
              <td>String</td>
              <td>'MMM D, YYYY'</td>
              <td>A <code><a href="https://date-fns.org/v1.29.0/docs/format">date-fns/format</a></code> compatible
                date string
              </td>
            </tr>
            <tr>
              <td>fontSize</td>
              <td>Number</td>
              <td>12</td>
              <td>Base font size for text in chart. The title above (@user) is 25% larger, however.
              </td>
            </tr>
            <tr>
              <td>fullYear</td>
              <td>Boolean</td>
              <td>true</td>
              <td>Whether to show the whole last year starting now or this year only (starting in
                January).
              </td>
            </tr>
            <tr>
              <td>theme</td>
              <td>Object</td>
              <td><em>GitHub theme</em></td>
              <td>A object specifying all theme colors explicitly (see below)</td>
            </tr>
            <tr>
              <td>tooltips</td>
              <td>Boolean</td>
              <td>true</td>
              <td>Whether to add <code>data-tip</code> attributes to the blocks.
                Add <code>react-tooltip</code> and use it as child of this component. See below example.
              </td>
            </tr>
            <tr>
              <td>years</td>
              <td>Number[]</td>
              <td>[{format(new Date(), 'YYYY')}]</td>
              <td>List of to be rendered years. Defaults to the current year. If no data is
                available the chart for this year will
                be ommited.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Show contributions of last year (default)</h2>
      <p>By default the last whole year is shown.</p>
      <pre>
        {`<GitHubCalendar username="grubersjoe" />`}
      </pre>
      <GitHubCalendar username={username} />

      <h2>Display this year only</h2>
      <p>However, you may prefer the calendar for the current year to start in January (instead of
        showing the last twelve months).</p>
      <pre>
        {`<GitHubCalendar username="grubersjoe" fullYear="{false}" />`}
      </pre>
      <GitHubCalendar username={username} fullYear={false} />

      <h2>Show several years</h2>
      <p>To display multiple years, pass an array into the component:</p>
      <pre>
        {`<GitHubCalendar username="grubersjoe" years="{[2018," 2017, 2016]} fullYear="{false}" />`}
    </pre>
      <GitHubCalendar username={username} years={[2018, 2017, 2016]} fullYear={false} />

      <h2>Set the color theme</h2>
      <p>Either set a base color (any valid CSS color) to calculate the color hues for the
        contribution intensity automatically or specify the different theme colors explicitly. If a
        color is set, the theme will be ignored. If neither color or theme is set, the standard
        GitHub colors will be used (as in these examples).</p>
      <pre>
        {`<GitHubCalendar username="grubersjoe" color="hsl(203, 82%, 33%)" />`}
    </pre>
      <GitHubCalendar username={username} color="hsl(203, 82%, 33%)" />
      <p>Set the colors explicitly like this:</p>
      <pre>
{`const defaultTheme = {
  background: 'transparent',
  text: '#000',
  grade4: '#196127',
  grade3: '#239a3b',
  grade2: '#7bc96f',
  grade1: '#c6e48b',
  grade0: '#ebedf0',
};
<GitHubCalendar username="{username}" theme="{defaultTheme}" />`}
    </pre>
      <GitHubCalendar username={username} />

      <h2>Add tooltips</h2>
      <p>In order to show tooltips on hover, you need to add another dependency <code>react-tooltip</code>. Add
        this component then as child of the calendar. Make sure to enable the `html` property in
        the <code>ReactTooltip</code> component to display the message correctly.</p>
      <pre>
{`<div>
  <GitHubCalendar username="{grubersjoe}">
    <ReactTooltip delayShow="{50}" html />
  </GitHubCalendar>
</div>`}
      </pre>
      <div>
        <GitHubCalendar username={username}>
          <ReactTooltip delayShow={50} html />
        </GitHubCalendar>
      </div>

      <h2>Different block size</h2>
      <p>The block size (10 per default) is configurable:</p>
      <pre>
        {`<GitHubCalendar username="{username}" blockSize="{8}" />`}
    </pre>
      <GitHubCalendar username={username} blockSize={8} />

      <h2>Different block margin (and size)</h2>
      <p>Analogously the block margin can be adjusted.</p>
      <pre>
        {`<GitHubCalendar username="{grubersjoe}" blockSize="{8}" blockMargin="{4}" />`}
      </pre>
      <GitHubCalendar username={username} blockSize={8} blockMargin={4} />

      <h2>Chart font size</h2>
      <p>Finally, there is a property to set the fontsize of the text inside the chart. This comes
        in handy, if a large block size or margin is set. The default base font size is 12px.</p>
      <pre>
        {`<GitHubCalendar username="{grubersjoe}" fontSize="{14}" blockSize="{12}" />`}
      </pre>
      <GitHubCalendar username={username} fontSize={14} blockSize={12} />
    </main>
  </div>
);

export default Demo;
