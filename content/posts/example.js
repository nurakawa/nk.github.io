d3.selectAll('circle')
  .style('fill', 'orange')
  .attr('r', function() {
    return 10 + Math.random() * 40;
  });
