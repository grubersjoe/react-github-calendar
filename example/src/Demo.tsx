import React, { FormEventHandler, FunctionComponent, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import GitHubCalendar, { Props } from 'react-github-calendar';

import './Demo.css';
import pkg from '../package.json';

import CodeBlock from './CodeBlock';
import ForkMe from './ForkMe';

const selectLastHalfYear: Props['transformData'] = contributions => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const shownMonths = 6;

  return contributions.filter(day => {
    const date = new Date(day.date);
    const monthOfDay = date.getMonth();

    return (
      date.getFullYear() === currentYear &&
      monthOfDay > currentMonth - shownMonths &&
      monthOfDay <= currentMonth
    );
  });
};

const Demo: FunctionComponent = () => {
  const [username, setUsername] = useState('grubersjoe');
  const input = React.createRef<HTMLInputElement>();

  const updateUsername: FormEventHandler = event => {
    event.preventDefault();
    if (input.current && String(input.current.value).trim()) {
      setUsername(String(input.current.value).trim().toLowerCase());
    }
  };

  return (
    <div>
      <header>
        <ForkMe />
        <div className="container">
          <h1>GitHub Contributions Calendar</h1>
          <div>A React component to display a GitHub contributions calendar </div>
          <form onSubmit={updateUsername}>
            <input
              type="text"
              placeholder="Enter your GitHub username"
              name="name"
              autoComplete="on"
              ref={input}
              required
            />
            <button type="submit">Show calendar</button>
          </form>
        </div>
      </header>

      <main className="container">
        <section>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=grubersjoe&repo=react-github-calendar&type=star&count=true&size=large"
            frameBorder="0"
            scrolling="0"
            width="170"
            height="30"
            title="GitHub"
          />

          <h4 style={{ fontWeight: 'normal', margin: '1em 0 0.75em' }}>
            <a href={`https://github.com/${username}`} style={{ textDecoration: 'none' }}>
              @{username}
            </a>{' '}
            on GitHub
          </h4>

          <GitHubCalendar username={username} fontSize={16}>
            <ReactTooltip delayShow={50} html />
          </GitHubCalendar>

          <p>
            Made with love by <a href="https://jogruber.de">@grubersjoe</a>, current version:{' '}
            <a href="https://www.npmjs.com/package/react-github-calendar">
              <code>v{pkg.version}</code>
            </a>
          </p>
        </section>

        <section>
          <h2>Installation</h2>
          <CodeBlock style={{ marginTop: '0.5rem' }}>yarn add react-github-calendar</CodeBlock>
          <p>Then in your code:</p>
          <CodeBlock>
            {`import GitHubCalendar from 'react-github-calendar';

<GitHubCalendar username="${username}" />`}
          </CodeBlock>
        </section>

        <section>
          <h2>Component properties</h2>
          <p>
            See{' '}
            <a href="https://grubersjoe.github.io/react-activity-calendar/?path=/docs/activity-calendar--default">
              documentation
            </a>{' '}
            of <code>react-activity-calendar</code>
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
                  <td>string</td>
                  <td />
                  <td>
                    A GitHub username (<em>required, obviously</em>).
                  </td>
                </tr>
                <tr>
                  <td>year</td>
                  <td>number|'last'</td>
                  <td>'last'</td>
                  <td>To be rendered year. Defaults to the last year like on GitHub.</td>
                </tr>
                <tr>
                  <td>blockMargin</td>
                  <td>number</td>
                  <td>4</td>
                  <td>Margin between blocks in pixels.</td>
                </tr>
                <tr>
                  <td>blockRadius</td>
                  <td>number</td>
                  <td>2</td>
                  <td>Border radius of blocks in pixels.</td>
                </tr>
                <tr>
                  <td>blockSize</td>
                  <td>number</td>
                  <td>12</td>
                  <td>Size of one block (one day) in pixels.</td>
                </tr>
                <tr>
                  <td>children</td>
                  <td>ReactNode</td>
                  <td />
                  <td>
                    Pass{' '}
                    <a href="https://github.com/wwayne/react-tooltip">
                      <code>{`<ReactTooltip html />`}</code>
                    </a>{' '}
                    as child if you want to show tooltips.
                  </td>
                </tr>
                <tr>
                  <td>color</td>
                  <td>
                    string|<a href="https://www.npmjs.com/package/tinycolor2">Color</a>
                  </td>
                  <td />
                  <td>
                    Base color to compute graph intensity hues (darkest color). Any valid CSS color
                    is accepted. Note that the <code>theme</code> property has higher precedence.
                  </td>
                </tr>
                <tr>
                  <td>dateFormat</td>
                  <td>string</td>
                  <td>'MMM d, yyyy'</td>
                  <td>
                    A{' '}
                    <a href="https://date-fns.org/docs/format">
                      <code>date-fns/format</code>
                    </a>{' '}
                    compatible date string used in tooltips.
                  </td>
                </tr>
                <tr>
                  <td>eventHandlers</td>
                  <td>
                    (event: SyntheticEvent)
                    <br />
                    &nbsp;&nbsp;{'=>'} (data: Day)
                    <br />
                    &nbsp;&nbsp;{'=>'} void
                  </td>
                  <td>&#123;&#125;</td>
                  <td>
                    Map of event handlers to register for the SVG{' '}
                    <code>
                      {'<'}rect{'>'}
                    </code>{' '}
                    elements that are used to render the calendar days. See this{' '}
                    <a href="https://grubersjoe.github.io/react-activity-calendar/?path=/story/activity-calendar--event-handlers">
                      example
                    </a>
                    .
                  </td>
                </tr>
                <tr>
                  <td>fontSize</td>
                  <td>number</td>
                  <td>14</td>
                  <td>Font size for text in pixels.</td>
                </tr>
                <tr>
                  <td>hideColorLegend</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Toggle to hide color legend below calendar.</td>
                </tr>
                <tr>
                  <td>hideMonthLabels</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Toggle to hide month labels above calendar.</td>
                </tr>
                <tr>
                  <td>hideTotalCount</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Toggle to hide total count below calendar.</td>
                </tr>
                <tr>
                  <td>labels</td>
                  <td>Labels</td>
                  <td />
                  <td>
                    Localization strings for all calendar labels.{' '}
                    <a href="https://grubersjoe.github.io/react-activity-calendar/?path=/story/activity-calendar--with-localized-labels">
                      See here for details
                    </a>
                    .
                  </td>
                </tr>
                <tr>
                  <td>loading</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>
                    Toggle for loading state. The <code>data</code> property will be ignored if set.
                  </td>
                </tr>
                <tr>
                  <td>showWeekdayLabels</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Toggle to show weekday labels left to the calendar.</td>
                </tr>
                <tr>
                  <td>style</td>
                  <td>CSSProperties</td>
                  <td />
                  <td>Style object to pass to component container.</td>
                </tr>
                <tr>
                  <td>theme</td>
                  <td>Theme</td>
                  <td>GitHub theme</td>
                  <td>An object specifying all theme colors explicitly.</td>
                </tr>
                <tr>
                  <td>transformData</td>
                  <td>
                    (data: Day[])
                    <br />
                    &nbsp;&nbsp;{'=>'} Day[]
                  </td>
                  <td />
                  <td>
                    A function that receives the array of contribution data and that has to return
                    an array with the same data type. See{' '}
                    <a href="#example-transform-data">example</a>.
                  </td>
                </tr>
                <tr>
                  <td>weekStart</td>
                  <td>number</td>
                  <td>0 (Sunday)</td>
                  <td>Index of day to be used as start of week. 0 represents Sunday.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Examples</h2>
          <p>
            Please refer to the Storybook of the calendar component for{' '}
            <a href="https://grubersjoe.github.io/react-activity-calendar">interactive examples</a>.
          </p>

          <h3 id="example-transform-data">
            Usage of the <code>transformData</code> property
          </h3>
          <p>
            You can pass a function as <code>transformData</code> property that receives the array
            of contribution data as argument and that has to return an array with the same data
            type. So the following interface must be met:
          </p>
          <CodeBlock>
            {`interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function transformData(data: Array<Day>): Array<Day>;`}
          </CodeBlock>
          <p>
            For example, in order to show the last six months of contribution data you can use a
            function like the following:
          </p>
          <CodeBlock>
            {`const selectLastHalfYear = contributions => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const shownMonths = 6;

  return contributions.filter(day => {
    const date = new Date(day.date);
    const monthOfDay = date.getMonth();

    return (
      date.getFullYear() === currentYear &&
      monthOfDay > currentMonth - shownMonths &&
      monthOfDay <= currentMonth
    );
  });
};

// ...
  
<GitHubCalendar 
  username="${username}" 
  transformData={selectLastHalfYear} 
  hideColorLegend
  hideTotalCount
/>`}
          </CodeBlock>

          <GitHubCalendar
            username={username}
            transformData={selectLastHalfYear}
            hideColorLegend
            hideTotalCount
            fontSize={16}
          >
            <ReactTooltip html />
          </GitHubCalendar>

          <p>
            Per default the total count will be calculated from the passed data. However, you can
            enforce that the total count of the untransformed data is shown by setting the{' '}
            <code>transformTotalCount</code> to <code>false</code>. The text of total count label
            below the calendar can be adjusted using the <code>labels.totalCount</code> property and
            the <code>&#x007B;&#x007B; count &#x007D;&#x007D;</code> placeholder.
          </p>
        </section>

        <p style={{ marginTop: '4rem' }}>
          <button onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}>Back to top</button>
        </p>
      </main>
    </div>
  );
};

export default Demo;
