import React from "react";
import {G2,Chart,Geom,Axis,Tooltip,Coord,Label,Legend,View,Guide,Shape,Facet,Util} from "bizcharts";


class LineChart extends React.Component{
  render() {
    const data = this.props.data;
    const cols = {
      value: {
        min: 0
      },
      name: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart height={234} padding={this.props.padding} data={data} scale={cols} forceFit>
          <Axis name="name" line={{stroke: "#3b6ca3",lineWidth: 1}} tickLine={{stroke: "#3b6ca3"}}  label={{textStyle:{ fill: "#4a77b6",}}}/>
          <Axis name="value"  line={{stroke: "#3b6ca3",lineWidth: 1}} label={{textStyle:{ fill: "#4a77b6",}}} grid={{lineStyle:{stroke:"#19275c",lineDash:[0,0]}}} />
          <Tooltip crosshairs={{ type: "y",
              style:{
                   stroke:"#395082",
                    lineWidth:1
              }
            }}
            
          />
          <Geom type="line" position="name*value" size={2} color="#57a2f5" tooltip={["name*value", (name, value)=>{
              return {
                name:this.props.title,
                value: value
              }
            }]}/>
          <Geom type="point" position="name*value" size={4} shape={"circle"}
            style={{
              stroke: "#57a2f5",
              lineWidth: 1
            }}
            tooltip={["name*value", (name, value)=>{
              return {
                name:this.props.title,
                value: value
              }
            }]}
          />
        </Chart>
      </div>
    );
  }
}
export default LineChart