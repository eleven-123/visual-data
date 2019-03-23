import React from "react";
import {G2,Chart,Geom,Axis,Tooltip,Coord,Label,Legend,View,Guide,Shape,Facet,Util} from "bizcharts";
import DataSet from "@antv/data-set";

class LineChart extends React.Component{
  render() {
    const data = this.props.data;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
        field: "amount",
        // 统计销量
        dimension: "year",
        // 每年的占比
        groupBy: ["month"]
    });
    const cols = {
      month: {
        range: [0, 1]
      }
      
    };
    const label ={
      textStyle:{ fill: "#4a77b6"},
      // formatter(text, item, index) {
      //   console.log(text)
      //   return text + '月';
      // }
    }
    return (
      <div>
        <Chart height={248} padding={[50,30,30,80]} data={dv} scale={cols} forceFit>
        <Axis name="bymonth" line={{stroke: "#3b6ca3",lineWidth: 1}} tickLine={{stroke: "#3b6ca3"}} label={label} />
        <Axis name="amount"  line={{stroke: "#3b6ca3",lineWidth: 1}} label={{textStyle:{ fill: "#4a77b6",}}} grid={{lineStyle:{stroke:"#19275c",lineDash:[0,0]}}}/>
          <Legend position="top-center"
            itemFormatter={(val)=>{
              return val + "年";
            }}
          />
          <Tooltip 
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{year} <span style=&quot;color:#aaa;&quot;>|</span> <b>{count}</b> <span style=&quot;color:#aaa;&quot;>|</span> <b>￥{amount}</b></li>"
            crosshairs={{
              type: "y",
              style:{
                stroke:"#395082",
                lineWidth:1
              }
            }}
          />
          <Geom
            type="line"
            position="bymonth*amount"
            size={2}
            color={"year"}
            shape={"smooth"}
            tooltip={[
              "year*amount*count",
              (year, amount,count) => {
                  
                  return {
                    year: year+'年',
                  amount:amount.toFixed(2),
                  count:count
                  };
              }
          ]}
          />
          <Geom
            type="point"
            position="bymonth*amount"
            size={4}
            shape={"circle"}
            color={"year"}
            style={{
              stroke: "#d6dcef",
              lineWidth: 1
            }}
            tooltip={[
              "year*amount*count",
              (year, amount,count) => {
                  
                  return {
                    year: year,
                  amount:amount.toFixed(2),
                  count:count
                  };
              }
          ]}
          />
        </Chart>
      </div>
    );
  }
}
export default LineChart