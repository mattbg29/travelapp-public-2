//thank you pluralsight for providing helpful code that I could leverage for this! 
//https://www.pluralsight.com/guides/using-d3.js-inside-a-react-app

import { useD3 } from "../hooks/useD3";
import React, { useState } from "react";
import * as d3 from "d3";

//note that although key below serves no clear function, it is necessary to
//force React to re-render the DOM when the data set is altered
function BarChart({ data, filterNow, key }) {

  React.useEffect(() => {
    function handleResize() {
      setWidthNow(Math.min(window.innerWidth * .9,1000))    
  }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  const [countrySelect, setCountrySelect] = useState("");  
  const [rankingSelect, setRankingSelect] = useState("");  
  const [widthNow, setWidthNow] = useState(Math.min(window.innerWidth * .9,1000));  
  const ref = useD3(
    (svg) => {
      const width = widthNow;
      const height = widthNow*.5;
      const margin = { top: 40, right: 30, bottom: 30, left: 40 };
      if (filterNow) {
        data = data.filter((a) => (a.ranking > filterNow))        
      }
      data.sort((a,b) => {
        return d3.descending(a.ranking, b.ranking)
      })  
      
      //scaleBand splits the range into n bands, where n is the # of values in the domain array
      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.ranking)])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3  
            .axisBottom(x)
            .tickValues(d3)
            .tickSizeOuter(0)
        );

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      const mousemove = (event) => {
        setCountrySelect(event.toElement.__data__.name)
        setRankingSelect(event.toElement.__data__.ranking)
      };

      svg
        .select(".plot-area")
        .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.name))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.ranking))
        .attr("height", (d) => y1(0) - y1(d.ranking))
        .on("mousemove", mousemove);
    }
  );

  return (
    <div className="Container" style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop: 50}}>
      <h2>Country Safety Map</h2>
      <h4>Selected Country: {countrySelect}</h4>
      <h4>Country Ranking: {rankingSelect}</h4>
        <svg
          ref={ref}
          style={{
            width: widthNow,
            height: widthNow*.5,
          }}
        >
          <g className="plot-area" />
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
    </div>
  );
}

export default BarChart;