import React from "react";
import {G2,Chart,Geom,Axis,Tooltip,Coord,Label,Legend,View,Guide,Shape,Facet,Util} from "bizcharts";
import DataSet from "@antv/data-set";

class PieChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        
    }
    render() {
        const { DataView } = DataSet;
        const { Html } = Guide;
        const data = this.props.data;
        const dv = new DataView();
        dv.source(data).transform({
            type: "percent",
            field: "amount",
            dimension: "level",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = (val * 100).toFixed(2) + "%";
                    return val;
                }
            }
        };
        return (
            <div>
                <Chart height={260} data={dv} scale={cols} padding={[40, 150, 0, 40]} forceFit >
                    <Coord type={"theta"} radius={0.75}/>
                    <Axis name="percent" />
                    <Legend position="right" offsetY={-100} offsetX={40} />
                    <Tooltip showTitle={false} itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name} <span style=&quot;color:#aaa;&quot;>|</span> {value} <span style=&quot;color:#aaa;&quot;>|</span> <b>￥{amount}</b></li>" />
                    <Geom type="intervalStack" position="percent" color="level"
                        tooltip={[
                            "level*percent*amount",
                            (level, percent,amount) => {
                            percent = (percent * 100).toFixed(2) + "%";
                            return {
                                name: level,
                                value: percent,
                                amount:amount.toFixed(2)
                            };
                            }
                        ]}
                        style={{
                            lineWidth: 1,
                            stroke: "#fff"
                        }}
                        color={['level', ['#ff420f','#fdca00','#00d722','#0088fc']]}
                    >
                    <Label
                        content="percent"
                        formatter={(val, item) => {
                        return item.point.level + " " + val;
                        }}
                        textStyle={(text, item)=>{
                            const style = {};
                            style.fill = item.color
                            return style;
                        }}
                    />
                    </Geom>
                </Chart>
            </div>
        );
        }
}
export default PieChart