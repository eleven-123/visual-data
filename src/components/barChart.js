import React from "react";
import {G2,Chart,Geom,Axis,Tooltip,Coord,Label,Legend,View,Guide,Shape,Facet,Util} from "bizcharts";
import DataSet from "@antv/data-set";

class BarChart extends React.Component{
    render() {
        const data = this.props.data;
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
          field: "amount",
          dimension: "year",
          groupBy: ["month"]
        });
        return (
          <div>
            <Chart height={293} padding={[50,20,30,80]} data={dv} forceFit>
              <Axis name="month" line={{stroke: "#3b6ca3",lineWidth: 1}} tickLine={{stroke: "#3b6ca3"}}  label={{textStyle:{ fill: "#4a77b6",}}}/>
              <Axis name="amount" line={{stroke: "#3b6ca3",lineWidth: 1}} label={{textStyle:{ fill: "#4a77b6",}}} grid={{lineStyle:{stroke:"#19275c",lineDash:[0,0]}}}/>
              <Legend position="top-center"/>
              <Tooltip />
              <Geom type="interval" position="month*amount" color={"year"}
                adjust={[
                  {
                    type: "dodge",
                    marginRatio: 1 / 32
                  }
                ]}
              />
            </Chart>
          </div>
        );
      }
}
export default BarChart