import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const Wrapper = styled.article`
  display: inline-block;
`;

const Chart = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const Title = styled.div`
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid ${props => props.theme.grade0};
  font-size: ${props => Math.round(props.fontSize * TITLE_SCALE_FACTOR)}px;
  
  a {
    color: inherit;
  }
`;

const Calendar = styled.svg`
  max-width: 100%;
  height: auto;
  margin-bottom: 0.25rem;
  background-color: ${props => props.theme.background};
`;

const Meta = styled.div`
  font-size: ${props => props.fontSize}px;
`;

class GitHubCalendar extends Component {
  state = {
    graphs: null,
    error: null,
  };

  // noinspection JSCheckFunctionSignatures
  componentDidMount() {
    const { years, username, fullYear } = this.props;

    try {
      getGitHubGraphData({
        years,
        username,
        fullYear,
      }).then((graphs) => this.setState({ graphs }));

      // this.setState({ graphs });
    } catch (error) {
      this.setState({ error });
    }
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
      <Wrapper className={NAMESPACE}>
        <Title
          fontSize={fontSize}
          theme={this.getTheme()}
          className={`${NAMESPACE}__title`}
        >
          <a href={`https://github.com/${username}`} title="GitHub profile">@{username} on GitHub</a>
        </Title>
        {
          graphs.map((graph) => {
            const { year, blocks, monthLabels, totalCount } = graph;
            const isCurrentYear = getYear(new Date()) === year;

            return (
              <Chart key={year} {...otherProps}>
                <Calendar
                  xmlns="http://www.w3.org/2000/svg"
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  textRendering="optimizeLegibility"
                  theme={this.getTheme()}
                  className={`${NAMESPACE}__calendar`}
                >
                  {this.renderBlocks(blocks)}
                  {this.renderMonthLabels(monthLabels)}
                </Calendar>

                <Meta fontSize={fontSize} className={`${NAMESPACE}__meta`}>
                  {isCurrentYear && fullYear ? 'Last year' : year}
                  {' – '}
                  {isCurrentYear && !fullYear ? 'So far ' : null}
                  {totalCount} contributions
                </Meta>
              </Chart>
            );
          })
        }
      </Wrapper>
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
