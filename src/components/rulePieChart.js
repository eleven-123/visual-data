import React from "react";
import {G2,Chart,Geom,Axis,Tooltip,Coord,Label,Legend,View,Guide,Shape,Facet,Util} from "bizcharts";
import DataSet from "@antv/data-set";

class PieChart extends React.Component{
    
    componentDidMount() {
        
    }
    render(){
        const { DataView } = DataSet;
        const { Html } = Guide;
        const data = this.props.data;
        const dv = new DataView();
        dv.source(data).transform({
          type: "percent",
          field: "value",
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
            <Chart height={234} data={dv} scale={cols} padding={[0, 220, 0,0]} forceFit>
                <Coord type={"theta"} radius={0.8} innerRadius={this.props.innerRadius} />
                <Axis name="percent" />
                <Legend name="name" position="right" offsetY={-15} offsetX={-5} 
                    itemMarginBottom={6}
                    textStyle={{
                        fill: '#98C2F3', // 文本的颜色
                        fontSize: '12', // 文本大小
                    }}
                />
                <Tooltip showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name} <span style=&quot;color:#aaa;&quot;>|</span> {percent} <span style=&quot;color:#aaa;&quot;>|</span> <b>{value}</b></li>"
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
                        "name*percent*value",
                        (name, percent,value) => {
                            percent = (percent * 100).toFixed(2) + "%";
                            if(this.props.id=='ruleAmount'){
                                value = '￥'+value;
                            }
                            
                            return {
                                name: name,
                                percent: percent,
                                value:value
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