import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Import modules separately to reduce bundle size
import format from 'date-fns/format';
import getYear from 'date-fns/get_year';

import { getGitHubGraphData } from '../services/contributions';
import { createCalendarTheme } from '../utils';

const NAMESPACE = 'github-contributions-calendar';

// GitHub theme
export const DEFAULT_THEME = {
  background: 'transparent',
  text: '#000',
  grade4: '#196127',
  grade3: '#239a3b',
  grade2: '#7bc96f',
  grade1: '#c6e48b',
  grade0: '#ebedf0',
};

const LINE_HEIGHT = 1.5;
const TITLE_SCALE_FACTOR = 1.25;

class GitHubCalendar extends Component {
  state = {
    graphs: null,
    error: null,
  };

  componentDidMount() {
    const { years, username, fullYear } = this.props;

    getGitHubGraphData({
      years,
      username,
      fullYear,
    })
      .then(graphs => this.setState({ graphs }))
      .catch(error => this.setState({ error }));
  }

  getTheme() {
    const { color, theme } = this.props;

    if (typeof color === 'string') {
      return createCalendarTheme(color);
    }

    return theme ? Object.assign({}, DEFAULT_THEME, theme) : DEFAULT_THEME;
  }

  renderMonthLabels(monthLabels) {
    const { blockSize, blockMargin, fontSize } = this.props;
    const theme = this.getTheme();

    return monthLabels.map(month => (
      <text
        x={(blockSize + blockMargin) * month.x}
        y={fontSize}
        key={month.label}
        style={{
          fill: theme.text,
          fontSize,
        }}
      >
        {month.label}
      </text>
    ));
  }

  renderBlocks(blocks) {
    const { fontSize, blockSize, blockMargin } = this.props;

    const theme = this.getTheme();
    const textHeight = Math.round(fontSize * LINE_HEIGHT);

    return blocks
      .map(week => week.map((day, y) => {
        const block = (
          <rect
            x="0"
            y={textHeight + (blockSize + blockMargin) * y}
            width={blockSize}
            height={blockSize}
            fill={theme[`grade${day.info.intensity}`]}
            data-date={day.date}
            key={day.date}
          />
        );

        return day.info.count ? (
          <g key={day.date}>
            <title>{day.info.count} contributions</title>
            {block}
          </g>
        ) : block;
      }))
      .map((week, x) => (
        // eslint-disable-next-line react/no-array-index-key
        <g key={x} transform={`translate(${(blockSize + blockMargin) * x}, 0)`}>{week}</g>
      ));
  }

  // Unfortunately there is no support for CSS modules right now...
  getStyles() {
    const { fontSize, theme } = this.props;

    return {
      wrapper: {
        display: 'inline-block'
      },
      anchor: {
        color: 'inherit',
      },
      chart: {
        marginBottom: '1rem',
      },
      calendar: {
        maxWidth: '100%',
        height: 'auto',
        marginBottom: '0.25rem',
        backgroundColor: theme.background,
      },
      meta: {
        fontSize,
      }
    }
  }

  render() {
    const { error, graphs } = this.state;

    // noinspection JSUnusedLocalSymbols
    const {
      username,
      years,
      theme,
      fullYear,
      blockSize,
      blockMargin,
      fontSize,
      color,
      ...otherProps
    } = this.props;

    const styles = this.getStyles();
    const textHeight = Math.round(fontSize * LINE_HEIGHT);

    // Since weeks start on Sunday, there is a good chance that the graph starts
    // in the week before January 1st. Therefore, the calendar shows 53 weeks.
    const width = (52 + 1) * (blockSize + blockMargin) - blockMargin;
    const height = textHeight + (blockSize + blockMargin) * 7 - blockMargin;

    if (error) {
      return <p>Error :(</p>;
    }

    if (!graphs) {
      return <div className={`${NAMESPACE}--loading`}>Loading …</div>;
    }

    return (
      <article
        {...otherProps}
        className={NAMESPACE}
        style={Object.assign({}, styles.wrapper, this.props.style)}
      >
        <div
          className={`${NAMESPACE}__title`}
          style={{
            marginBottom: '0.5rem',
            paddingBottom: '0.25rem',
            borderBottom: `2px solid ${theme.grade0}`,
            fontSize: `${Math.round(fontSize * TITLE_SCALE_FACTOR)}px`,
          }}
        >
          <a href={`https://github.com/${username}`} title="GitHub profile" style={styles.anchor}>
            @{username} on GitHub
          </a>
        </div>
        {
          graphs.map((graph, i) => {
            const { year, blocks, monthLabels, totalCount } = graph;
            const isCurrentYear = getYear(new Date()) === year;

            return (
              <div
                key={year}
                className={`${NAMESPACE}--chart`}
                style={i < (graphs.length - 1) ? styles.chart : null}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  textRendering="optimizeLegibility"
                  className={`${NAMESPACE}__calendar`}
                  style={styles.calendar}
                >
                  {this.renderBlocks(blocks)}
                  {this.renderMonthLabels(monthLabels)}
                </svg>

                <div className={`${NAMESPACE}__meta`} style={styles.meta}>
                  {isCurrentYear && fullYear ? 'Last year' : year}
                  {' – '}
                  {isCurrentYear && !fullYear ? 'So far ' : null}
                  {totalCount} contributions
                </div>
              </div>
            );
          })
        }
      </article>
    );
  }
}

GitHubCalendar.propTypes = {
  username: PropTypes.string.isRequired,
  years: PropTypes.arrayOf(PropTypes.number),
  fullYear: PropTypes.bool,
  blockSize: PropTypes.number,
  blockMargin: PropTypes.number,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  theme: PropTypes.objectOf(PropTypes.string),
};

GitHubCalendar.defaultProps = {
  years: [Number(format(new Date(), 'YYYY'))],
  fullYear: true,
  theme: DEFAULT_THEME,
  color: null,
  blockSize: 10,
  blockMargin: 2,
  fontSize: 12,
};

export default GitHubCalendar;
