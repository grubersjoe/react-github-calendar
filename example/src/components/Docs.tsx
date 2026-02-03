import { useEffect, useState, type SubmitEventHandler } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import GitHubButton from 'react-github-btn'
import { GitHubCalendar, type Props } from 'react-github-calendar'
import { useSearchParams } from 'react-router'
import tooltipsCSS from '../../../src/styles/tooltips.css?raw'
import CodeBlock from './CodeBlock'
import { errorRenderer } from './Error'
import '../styles.scss'
import showdown from 'showdown'
import calendarProps from '../docgen.json'
import ForkMe from './ForkMe'

const defaultUsername = 'grubersjoe'
const markdown = new showdown.Converter()

type DocgenProp = {
  tsType: {
    name: string
    raw?: string
  }
  required: boolean
  defaultValue?: {
    value: string
    computed: boolean
  }
  description: string
}

const propsList: Array<[string, DocgenProp]> = [
  [
    'username',
    {
      tsType: { name: 'string' },
      required: true,
      description: 'GitHub username for which to display contributions.',
    },
  ],
  [
    'year',
    {
      tsType: { name: "number | 'last'" },
      required: false,
      defaultValue: { value: "'last'", computed: false },
      description:
        "Year to display in the calendar. Defaults to the current year, matching GitHub's behavior.",
    },
  ],
  [
    'errorMessage',
    {
      tsType: { name: 'string' },
      required: false,
      description:
        'Message to display if fetching GitHub contributions data fails. Only relevant if `throwOnError` is `false`.',
    },
  ],
  [
    'throwOnError',
    {
      tsType: { name: 'string' },
      required: false,
      defaultValue: { value: 'false', computed: false },
      description:
        'Whether to throw an `Error` if loading GitHub contributions data fails. Use a React [error boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) to handle the error.',
    },
  ],
  ...Object.entries(calendarProps.props as Record<string, DocgenProp>).filter(
    ([name]) => name !== 'data',
  ),
]

const Docs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const username = searchParams.get('user') ?? defaultUsername
  const [input, setInput] = useState(username)

  useEffect(() => {
    setInput(username)
  }, [username])

  const onUsernameSubmit: SubmitEventHandler = event => {
    event.preventDefault()
    if (input && input !== username) {
      setSearchParams({ user: input })
    }
  }

  return (
    <div>
      <header>
        <ForkMe />
        <div className="container">
          <h1>GitHub Contributions Calendar</h1>
          <div>A React component to display a GitHub contributions calendar </div>
          <form onSubmit={onUsernameSubmit}>
            <input
              type="text"
              placeholder="Enter your GitHub username"
              value={input}
              onChange={event => {
                setInput(event.target.value.trim().toLowerCase())
              }}
              autoComplete="on"
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

          <ErrorBoundary fallbackRender={errorRenderer} key={username}>
            <GitHubCalendar username={username} fontSize={16} throwOnError />
          </ErrorBoundary>

          <p style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>
            Made with love by <a href="https://jogruber.de">@grubersjoe</a>.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
            <a href="https://www.npmjs.com/package/react-github-calendar">
              <img
                src="https://badge.fury.io/js/react-github-calendar.svg"
                alt="npm version"
                height="25"
              />
            </a>
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

          <p style={{ marginTop: '2rem' }}>
            <b>Version 5 has been released</b> 🎉
            <br />
            See the list of{' '}
            <a href="https://github.com/grubersjoe/react-github-calendar/releases/tag/v5.0">
              breaking changes
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Installation</h2>
          <CodeBlock>npm add react-github-calendar</CodeBlock>
          <p>Then, in your code:</p>
          <CodeBlock>
            {`import GitHubCalendar from 'react-github-calendar';

<GitHubCalendar username="${username}" />`}
          </CodeBlock>
        </section>

        <section>
          <h2>Component properties</h2>
          <p>
            The component uses{' '}
            <a href="https://github.com/grubersjoe/react-activity-calendar">
              <code>react-activity-calendar</code>
            </a>{' '}
            internally, so all its properties are supported. See the React Activity Calendar{' '}
            <a href="https://grubersjoe.github.io/react-activity-calendar/?path=/docs/react-activity-calendar--docs">
              documentation
            </a>{' '}
            for details.
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
                {propsList.map(([name, { tsType, defaultValue, description, required }]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>
                      {tsType.raw && tsType.raw.length <= 20 ? tsType.raw : tsType.name}
                      {required ? '!' : ''}
                    </td>
                    <td>{defaultValue?.value ?? '-'}</td>
                    <td dangerouslySetInnerHTML={{ __html: markdown.makeHtml(description) }} />
                  </tr>
                ))}
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
            Refer to the{' '}
            <a href="https://grubersjoe.github.io/react-activity-calendar/?path=/story/react-activity-calendar--tooltips">
              tooltip documentation
            </a>
            .
          </p>

          <h3 id="tooltips-styling">How to style tooltips?</h3>
          <p>
            Tooltips are implemented as a “headless” component, meaning they come{' '}
            <b>without predefined styles</b>. This gives you full control over the appearance:
          </p>
          <ul>
            <li>
              Import the default styles provided by this package, <b>or</b>
            </li>
            <li>Add your own custom CSS like below.</li>
          </ul>

          <CodeBlock>import 'react-github-calendar/styles.css';</CodeBlock>
          <CodeBlock>
            {'/* The class name must match the internal calendar component. */\n'.concat(
              tooltipsCSS,
            )}
          </CodeBlock>

          <h3 id="example-transform-data">Using the transformData prop</h3>
          <p>
            You can pass a function as the <code>transformData</code> prop that receives the array
            of contributions and allows you to manipulate them. The transformation function must
            have the following signature:
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
            For example, to show only the contributions from the last six months, you can do the
            following:
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

          <ErrorBoundary fallbackRender={errorRenderer} key={username}>
            <GitHubCalendar
              username={username}
              transformData={selectLastHalfYear}
              showColorLegend={false}
              fontSize={16}
              labels={{
                totalCount: '{{count}} contributions in the last half year',
              }}
              throwOnError
            />
          </ErrorBoundary>
        </section>

        <p style={{ marginTop: '3rem' }}>
          <button
            onClick={() => {
              window.scroll({ top: 0, behavior: 'smooth' })
            }}
          >
            Back to top
          </button>
        </p>
      </main>
    </div>
  )
}

const selectLastHalfYear: Props['transformData'] = contributions => {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const shownMonths = 6

  return contributions.filter(activity => {
    const date = new Date(activity.date)
    const monthOfDay = date.getMonth()

    return (
      date.getFullYear() === currentYear &&
      monthOfDay > currentMonth - shownMonths &&
      monthOfDay <= currentMonth
    )
  })
}

export default Docs
