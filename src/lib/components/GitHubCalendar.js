import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import modules separately to reduce bundle size
import format from 'date-fns/format';
import getYear from 'date-fns/get_year';

import { DEFAULT_THEME, LINE_HEIGHT, NAMESPACE, TITLE_SCALE_FACTOR } from '../utils/constants';
import { getGitHubGraphData } from '../services/contributions';
import { createCalendarTheme } from '../utils';

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

  // Unfortunately there is no support for CSS modules right now...
  getStyles() {
    const { fontSize, theme } = this.props;

    return {
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
        overflow: 'visible',
      },
      meta: {
        fontSize,
      },
      title: {
        marginBottom: '0.5rem',
        paddingBottom: '0.25rem',
        borderBottom: `2px solid ${this.getTheme().grade0}`,
        fontSize: `${Math.round(fontSize * TITLE_SCALE_FACTOR)}px`,
      },
      wrapper: {
        display: 'inline-block',
      },
    };
  }

  // noinspection JSMethodCanBeStatic
  getClassNameFor(object) {
    return `${NAMESPACE}__${object}`;
  }

  getDimensions() {
    const { blockMargin, blockSize, fontSize } = this.props;

    const textHeight = Math.round(fontSize * LINE_HEIGHT);

    // Since weeks start on Sunday, there is a good chance that the graph starts
    // in the week before January 1st. Therefore, the calendar shows 53 weeks.
    const width = (52 + 1) * (blockSize + blockMargin) - blockMargin;
    const height = textHeight + (blockSize + blockMargin) * 7 - blockMargin;

    return { width, height };
  }

  getTooltipMessage(day) {
    return `<strong>${day.info.count} contributions</strong> on ${format(
      day.date,
      this.props.dateFormat,
    )}`;
  }

  renderTitle() {
    const { username } = this.props;

    return (
      <div className={this.getClassNameFor('title')} style={this.getStyles().title}>
        <a
          href={`https://github.com/${username}`}
          title="GitHub profile"
          style={this.getStyles().anchor}
        >
          @{username} on GitHub
        </a>
      </div>
    );
  }

  renderMonthLabels(monthLabels) {
    const { blockSize, blockMargin, fontSize } = this.props;

    return monthLabels.map(month => (
      <text
        x={(blockSize + blockMargin) * month.x}
        y={fontSize}
        key={month.x}
        style={{
          fill: this.getTheme().text,
          fontSize,
        }}
      >
        {month.label}
      </text>
    ));
  }

  renderBlocks(blocks) {
    const { blockSize, blockMargin, fontSize } = this.props;

    const theme = this.getTheme();
    const textHeight = Math.round(fontSize * LINE_HEIGHT);

    return blocks
      .map(week =>
        week.map((day, y) => (
          <rect
            x="0"
            y={textHeight + (blockSize + blockMargin) * y}
            width={blockSize}
            height={blockSize}
            fill={theme[`grade${day.info.intensity}`]}
            data-tip={day.info.count ? this.getTooltipMessage(day) : null}
            key={day.date}
          />
        )),
      )
      .map((week, x) => (
        <g key={x} transform={`translate(${(blockSize + blockMargin) * x}, 0)`}>
          {week}
        </g>
      ));
  }

  renderMeta(year, totalCount) {
    const { fullYear } = this.props;
    const isCurrentYear = getYear(new Date()) === year;

    return (
      <div className={this.getClassNameFor('meta')} style={this.getStyles().meta}>
        {isCurrentYear && fullYear ? 'Last year' : year}
        {' – '}
        {isCurrentYear && !fullYear ? 'So far ' : null}
        {totalCount} contributions
      </div>
    );
  }

  render() {
    const { error, graphs } = this.state;
    const { children } = this.props;

    const styles = this.getStyles();
    const { width, height } = this.getDimensions();

    if (error) {
      return <p>Error :(</p>;
    }

    if (!graphs) {
      return <div className={this.getClassNameFor('loading')}>Loading …</div>;
    }

    return (
      <article className={NAMESPACE} style={Object.assign({}, styles.wrapper, this.props.style)}>
        {this.renderTitle()}
        {graphs.map((graph, i) => {
          const { year, blocks, monthLabels, totalCount } = graph;

          return (
            <div
              key={year}
              className={this.getClassNameFor('chart')}
              style={i < graphs.length - 1 ? styles.chart : null}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                textRendering="optimizeLegibility"
                className={this.getClassNameFor('calendar')}
                style={styles.calendar}
              >
                {this.renderMonthLabels(monthLabels)}
                {this.renderBlocks(blocks)}
              </svg>

              {this.renderMeta(year, totalCount)}
              {children}
            </div>
          );
        })}
      </article>
    );
  }
}

GitHubCalendar.propTypes = {
  blockSize: PropTypes.number,
  blockMargin: PropTypes.number,
  color: PropTypes.string,
  dateFormat: PropTypes.string,
  fontSize: PropTypes.number,
  fullYear: PropTypes.bool,
  theme: PropTypes.objectOf(PropTypes.string),
  tooltips: PropTypes.bool,
  username: PropTypes.string.isRequired,
  years: PropTypes.arrayOf(PropTypes.number),
};

GitHubCalendar.defaultProps = {
  blockSize: 10,
  blockMargin: 2,
  color: null,
  dateFormat: 'MMM D, YYYY',
  fontSize: 12,
  fullYear: true,
  theme: DEFAULT_THEME,
  tooltips: true,
  years: [Number(format(new Date(), 'YYYY'))],
};

export default GitHubCalendar;
