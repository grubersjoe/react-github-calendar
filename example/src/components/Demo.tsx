import { createRef, FormEventHandler, FunctionComponent, useState } from 'react';
import GitHubCalendar, { Props } from 'react-github-calendar';

import '../styles.scss';
import pkg from '../../package.json';

import CodeBlock from './CodeBlock.tsx';
import ForkMe from './ForkMe.tsx';
import GitHubButton from 'react-github-btn';

const selectLastHalfYear: Props['transformData'] = contributions => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const shownMonths = 6;

  return contributions.filter(activity => {
    const date = new Date(activity.date);
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
  const input = createRef<HTMLInputElement>();

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
          <h4 style={{ fontWeight: 'normal', margin: '1em 0' }}>
            <a href={`https://github.com/${username}`} style={{ textDecoration: 'none' }}>
              @{username}
            </a>{' '}
            on GitHub
          </h4>

          <GitHubCalendar username={username} fontSize={16} />

          <p style={{ marginBottom: '1.25rem' }}>
            Made with love by <a href="https://jogruber.de">@grubersjoe</a>, current version:{' '}
            <a href="https://www.npmjs.com/package/react-github-calendar">
              <code>v{pkg.version}</code>
            </a>
          </p>
          <div>
            <GitHubButton
              href="https://github.com/grubersjoe/react-github-calendar"
              data-color-scheme="no-preference: light; light: light; dark: dark;"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star grubersjoe/react-github-calendar on GitHub"
            >
              Star
            </GitHubButton>
          </div>
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
            <a href="https://grubersjoe.github.io/react-activity-calendar/?path=/docs/react-activity-calendar--docs">
              documentation
            </a>{' '}
            of <code>react-activity-calendar</code>
          </p>
          <div className="table-overflow">
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
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
                  <td>number | 'last'</td>
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
                  <td>Block size in pixels.</td>
                </tr>
                <tr>
                  <td>colorScheme</td>
                  <td>'light' | 'dark'</td>
                  <td />
                  <td>Use a specific color scheme instead of the system one.</td>
                </tr>
                <tr>
                  <td>eventHandlers</td>
                  <td>
                    (event: SyntheticEvent)
                    <br />
                    &nbsp;&nbsp;{'=>'} (data:{' '}
                    <a href="https://github.com/grubersjoe/react-activity-calendar/blob/main/src/types.ts">
                      Activity
                    </a>
                    )
                    <br />
                    &nbsp;&nbsp;{'=>'} void
                  </td>
                  <td>&#123;&#125;</td>
                  <td>
                    Event handlers to register for the SVG{' '}
                    <code>
                      {'<'}rect{'>'}
                    </code>{' '}
                    elements that are used to render the calendar days. See this{' '}
                    <a href="https://grubersjoe.github.io/react-activity-calendar/?path=/story/react-activity-calendar--event-handlers">
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
                    <a href="https://grubersjoe.github.io/react-activity-calendar/?path=/story/react-activity-calendar--with-localized-labels">
                      See here for details
                    </a>
                    .
                  </td>
                </tr>
                <tr>
                  <td>loading</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>Toggle for loading state.</td>
                </tr>
                <tr>
                  <td>renderBlock</td>
                  <td>
                    (<br />
                    &nbsp;&nbsp;block:{' '}
                    <a href="https://github.com/grubersjoe/react-activity-calendar/blob/main/src/types.ts">
                      BlockElement
                    </a>
                    ,
                    <br />
                    &nbsp;&nbsp;activity:{' '}
                    <a href="https://github.com/grubersjoe/react-activity-calendar/blob/main/src/types.ts">
                      Activity
                    </a>
                    <br />
                    )&nbsp;{'=>'} ReactElement
                  </td>
                  <td>false</td>
                  <td>
                    Render prop for calendar blocks (activities). For example, useful to wrap the
                    element with a tooltip component. Use{' '}
                    <a href="https://react.dev/reference/react/cloneElement">
                      <code>React.cloneElement</code>
                    </a>{' '}
                    to pass additional props to the element if necessary.
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
                  <td>
                    <a href="https://github.com/grubersjoe/react-activity-calendar/blob/main/src/types.ts">
                      ThemeInput
                    </a>
                  </td>
                  <td>GitHub theme</td>
                  <td>
                    <p>
                      Set the calendar colors for the <code>light</code> and <code>dark</code>{' '}
                      system color scheme. The color scale for at least one color scheme needs to be
                      specified. For undefined values, the default theme is selected. By default,
                      the calendar will use the currently set system color scheme, but you can
                      enforce a specific color scheme with the <code>colorScheme</code> prop.
                    </p>
                    <p>
                      Define each color scale explicitly with five colors or pass exactly two colors
                      (lowest and highest intensity) to calculate a single-hue scale. Colors can be
                      specified in any valid CSS format.
                    </p>
                    <p>
                      <a href="https://grubersjoe.github.io/react-activity-calendar/?path=/story/react-activity-calendar--with-theme">
                        See this example
                      </a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>totalCount</td>
                  <td>number</td>
                  <td />
                  <td>
                    Overwrite the total activity count. Useful in combination with{' '}
                    <code>transformData</code>.
                  </td>
                </tr>
                <tr>
                  <td>transformData</td>
                  <td>
                    (data:{' '}
                    <a href="https://github.com/grubersjoe/react-activity-calendar/blob/main/src/types.ts">
                      Activity
                    </a>
                    [])
                    <br />
                    &nbsp;&nbsp;{'=>'}{' '}
                    <a href="https://github.com/grubersjoe/react-activity-calendar/blob/main/src/types.ts">
                      Activity
                    </a>
                    []
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
          <h2>Examples & FAQ</h2>
          <p>
            Please refer to the Storybook of the calendar component for{' '}
            <a href="https://grubersjoe.github.io/react-activity-calendar">interactive examples</a>.
          </p>

          <h3 id="tooltips">How do I add tooltips?</h3>
          <p>
            See{' '}
            <a href="https://grubersjoe.github.io/react-activity-calendar/?path=/story/react-activity-calendar--with-tooltips">
              tooltip examples
            </a>{' '}
            how to use the <code>renderBlock</code> prop. .
          </p>

          <h3 id="example-transform-data">Usage of the transformData prop</h3>
          <p>
            You can pass a function as the <code>transformData</code> prop that receives the array
            of contribution data to manipulate it. The transformation function must meet the
            following signature:
          </p>
          <CodeBlock>
            {`interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function transformData(data: Array<Activity>): Array<Activity>;`}
          </CodeBlock>
          <p>
            For example, to only show the the contribution data of the last six months you can do
            the following:
          </p>
          <CodeBlock>
            {`const selectLastHalfYear = contributions => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const shownMonths = 6;

  return contributions.filter(activity => {
    const date = new Date(activity.date);
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
  labels={{
    totalCount: '{{count}} contributions in the last half year',
  }}
/>`}
          </CodeBlock>

          <br />

          <GitHubCalendar
            username={username}
            transformData={selectLastHalfYear}
            hideColorLegend
            fontSize={16}
            labels={{
              totalCount: '{{count}} contributions in the last half year',
            }}
          />

          <p>
            The total count will be recalculated based on the transformed data. However, you can
            enforce that the total count of the untransformed data is shown by setting the{' '}
            <code>transformTotalCount</code> to <code>false</code>. The text of total count label
            below the calendar can be adjusted using the <code>labels.totalCount</code> prop and the{' '}
            <code>&#x007B;&#x007B; count &#x007D;&#x007D;</code> placeholder.
          </p>
        </section>

        <p style={{ marginTop: '3rem' }}>
          <button onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}>Back to top</button>
        </p>
      </main>
    </div>
  );
};

export default Demo;
