import React from 'react';
import {G2,Chart,Geom,Axis,Tooltip,Coord,Label,Legend,View,Guide,Shape,Facet,Util} from "bizcharts";
import DataSet from "@antv/data-set";

class PieChart extends React.Component{
    render(){
        const { DataView } = DataSet;
        const { Html } = Guide;
        const data = this.props.data;
        const dv = new DataView();
        dv.source(data).transform({
            type: "percent",
            field: "amount",
            dimension: "name",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                val = val * 100 + "%";
                return val;
                }
            }
        };
        return(
            <Chart height={293} data={dv} scale={cols} padding={[40, 150, 0, 0]} forceFit>
                <Coord type={"theta"} radius={0.8} innerRadius={this.props.innerRadius} />
                <Axis name="percent" />
                <Legend position="right" offsetY={-120} offsetX={20} />
                <Tooltip showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name} <span style=&quot;color:#aaa;&quot;>|</span> {value} <span style=&quot;color:#aaa;&quot;>|</span> <b>￥{amount}</b></li>"
                />
                <Guide>
                    <Html position={["50%", "50%"]}
                    html={()=>{
                        return "<div style='color:#60769a;font-size:1.16em;text-align: center;width: 10em;'>"+this.props.title+"</div>"
                    }}
                    alignX="middle" alignY="middle" />
                </Guide>
                <Geom type="intervalStack" position="percent" color="name"
                    tooltip={[
                        "name*percent*amount",
                        (name, percent,amount) => {
                            percent = (percent * 100).toFixed(2) + "%";
                            return {
                            name: name,
                            value: percent,
                            amount:amount
                            };
                        }
                    ]}
                    style={{ lineWidth: 1, stroke: "#fff" }}
                >
                    
                </Geom>
            </Chart>
        )
    }
}
export default PieChart