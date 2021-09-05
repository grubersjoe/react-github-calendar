import React, { FormEventHandler, FunctionComponent, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import GitHubCalendar, { Props } from 'react-github-calendar';
import 'typeface-public-sans';

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

          <GitHubCalendar username={username}>
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
          <CodeBlock style={{ marginTop: '0.5rem' }}>yarn install react-github-calendar</CodeBlock>
          <p>Then in your code:</p>
          <CodeBlock>
            {`import GitHubCalendar from 'react-github-calendar';

<GitHubCalendar username="${username}" />`}
          </CodeBlock>
        </section>

        <section id="upgrade">
          <h2>Upgrading from v2 to v3</h2>
          <p>
            With Version 3 lots of code has been rewritten and the contribution data is fetched more
            efficiently. The calendar itself has been extracted to an agnostic React component that
            you can use to show all kinds of calendar intensity data:{' '}
            <a href="https://grubersjoe.github.io/react-activity-calendar/?path=/docs/activity-calendar--default">
              <strong>React Activity Calendar</strong>
            </a>
            .
          </p>
          <h3>New</h3>
          <ul>
            <li>
              All labels can be localized now. See this page for{' '}
              <a href="https://grubersjoe.github.io/react-activity-calendar/?path=/story/activity-calendar--with-localized-labels">
                documentation
              </a>
              . Note that all properties are optional, only the specified labels will overwrite the
              default ones in English.
            </li>
            <li>
              There is a new <code>weekStart</code> property that allows you to specify what day
              should be taken as start of a week. By default Sunday is used like on GitHub. Note
              that days are zero indexed (0 represents Sunday).
            </li>
            <li>
              A new <code>transformData</code> property has been added. It allows you to manipulate
              the array with contribution data after it has been fetched from the API. This way, you
              can, e.g., show a specific date range like the last two months in the calendar. See
              below for an <a href="#example-transform-data">example</a>.
            </li>
            <li>
              Weekday labels can be displayed left of the calendar. This legend is{' '}
              <b>hidden by default</b> and can be enabled by setting the <code>showDayLegend</code>{' '}
              property.
            </li>
            <li>
              There is a new color legend below the calendar. You can hide it by passing the{' '}
              <code>hideColorLegend</code> property.
            </li>
            <li>
              The overall design of the calendar has changed slightly. You can use CSS to overwrite
              the styling of elements if you do not like the look. Inspect the component for class
              names.
            </li>
          </ul>
          <h3>Breaking changes</h3>
          <ul>
            <li>
              The <code>years</code> property has been removed in favor of a <code>year</code>{' '}
              property. Render this component multiple times to show several years.
            </li>
            <li>
              <p>
                The <code>fullYear</code> property has been removed. Set the year property either to{' '}
                <code>last</code> to show the last year (default) or to the current one for the same
                effect:
              </p>
              <CodeBlock>{`<GitHubCalendar username="${username}" year={new Date().getFullYear()} />`}</CodeBlock>
            </li>
            <li>
              The attribute names of the <code>Theme</code> object have changed. They are{' '}
              <code>level[0-4]</code> instead of <code>grade[0-4]</code> now. Plus, the{' '}
              <code>background</code> and <code>text</code> properties have been removed. Use CSS to
              set these colors explicitly if required.
            </li>
            <li>
              Because this component uses a different component for rendering the calendar now, all
              CSS class names have changed. Sorry.
            </li>
            <li>
              Please use <code>hideTotalCount</code> instead of the previous{' '}
              <code>showTotalCount</code> property.
            </li>
            <li>
              The <code>tooltips</code> property is obsolete. Simply add the{' '}
              <code>{`<ReactTooltip html />`}</code> component as child to show tooltips.
            </li>
          </ul>
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
  hideTotalCount 
  hideColorLegend
/>`}
          </CodeBlock>

          <GitHubCalendar
            username={username}
            transformData={selectLastHalfYear}
            hideTotalCount
            hideColorLegend
          >
            <ReactTooltip html />
          </GitHubCalendar>
        </section>

        <p style={{ marginTop: '4rem' }}>
          <button onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}>Back to top</button>
        </p>
      </main>
    </div>
  );
};

export default Demo;
