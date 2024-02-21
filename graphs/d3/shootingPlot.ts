const MARGIN = { LEFT: 80, RIGHT: 10, TOP: 10, BOTTOM: 80 };
const WIDTH = 650 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

import * as d3 from 'd3';
type ShootingData = {
  name: string;
  team: string;
  threePointPercentage: number;
  threePointAttempts: number;
  threePointMakes: number;
  teamId: number;
  minutes: number;
  gamesPlayed: number;
  color: string;
  shootingAttemptsPer36: number;
};

export function addShootingPlot(data: ShootingData[], ref: React.RefObject<HTMLDivElement>) {
  d3.select('#shooting-plot').remove();
  d3.select('#select-box').remove();
  const width = WIDTH + MARGIN.LEFT + MARGIN.RIGHT;
  const height = HEIGHT + MARGIN.TOP + MARGIN.BOTTOM;
  const svg = d3
    .select(ref.current)
    .append('svg')
    .attr('id', 'shooting-plot')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .style('background-color', '#fff')
    .style('color', '#000');
  const g = svg.append('g').attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

  // X label
  g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', WIDTH / 2)
    .attr('y', HEIGHT + 55)
    .attr('font-size', '16px')
    .attr('text-anchor', 'middle')
    .text('3 point attempts per 36 minutes');

  // append a select box to the graph
  d3.select(ref.current)
    .append('select')
    .attr('id', 'select-box')
    .style('background-color', 'white')
    .style('border', '1px solid black')
    .style('margin-top', '6px')
    .style('padding', '5px')
    .style('color', '#000')
    .selectAll('option')
    .data(
      data
        .filter((d, i, self) => self.findIndex((t) => t.team === d.team) === i)
        .map((d) => d.team)
        .concat('All')
        .sort((a, b) => a.localeCompare(b))
    )
    .enter()
    .append('option')
    .attr('value', (d) => d)
    .text((d) => d);

  d3.select('#select-box').on('change', function (event) {
    const selectedTeam = event.target.value;
    if (selectedTeam === 'All') {
      update(data);
    } else {
      const filteredData = data.filter((d) => d.team === selectedTeam);
      update(filteredData);
    }
  });

  const tooltip = d3
    .select(ref.current)
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', '0');

  // Y label
  g.append('text')
    .attr('class', 'y axis-label')
    .attr('x', -(HEIGHT / 2))
    .attr('y', -50)
    .attr('font-size', '16px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('3 point shooting %');

  const x = d3.scaleLinear().range([0, WIDTH]);

  const y = d3.scaleLinear().range([HEIGHT, 0]);

  const xAxisGroup = g
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${HEIGHT})`);

  const yAxisGroup = g.append('g').attr('class', 'y axis');

  data.forEach((d) => {
    d.threePointPercentage = Number(d.threePointPercentage);
    d.shootingAttemptsPer36 = Number(d.threePointAttempts) / (Number(d.minutes) / 36);
  });

  const filter = data.filter((d) => d.threePointAttempts > 100);

  update(filter);

  function update(data: ShootingData[]) {
    g.selectAll('circle').remove();

    x.domain([
      d3.min(data, (d) => d.shootingAttemptsPer36) - 1,
      d3.max(data, (d) => d.shootingAttemptsPer36) + 1,
    ]);
    y.domain([
      d3.min(data, (d) => d.threePointPercentage) - 0.05,
      d3.max(data, (d) => d.threePointPercentage) + 0.05,
    ]);

    const xAxisCall = d3.axisBottom(x).ticks(5);
    xAxisGroup
      .call(xAxisCall)
      .selectAll('text')
      .attr('y', '10')
      .attr('x', '-5')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

    const yAxisCall = d3.axisLeft(y).ticks(5);
    yAxisGroup.call(yAxisCall);

    // ENTER new elements present in new data...
    const rects = g.selectAll('circle').data(data);

    rects
      .enter()
      .append('circle')
      .attr('cx', function (d: ShootingData) {
        return x(d.shootingAttemptsPer36);
      })
      .attr('cy', function (d: ShootingData) {
        return y(d.threePointPercentage);
      })
      .attr('r', 4)
      .attr('fill', (d: ShootingData) => d.color)
      .on('mouseover', function (event, d: ShootingData) {
        tooltip.html(() => {
          let html = `<p class="title"><strong>${d.name}</strong></p>`;
          html += `<p><strong>${(d.threePointPercentage * 100).toFixed(1)}%</strong></p>`;
          html += `<p><strong>${d.shootingAttemptsPer36.toFixed(1)}</strong> attempts per 36</p>`;
          return html;
        });
        tooltip
          .style('top', event.pageY - 48 + 'px')
          .style('left', event.pageX + 10 + 'px')
          .style('background', d.color)
          .transition()
          .duration(200)
          .style('opacity', 0.9);
      })
      .on('mouseout', function () {
        tooltip.transition().duration(200).style('opacity', 0);
      });
  }
}
