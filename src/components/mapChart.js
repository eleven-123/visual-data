import $ from "jquery";
// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, View, Geom, Label,Tooltip } from 'bizcharts';
import DataSet from "@antv/data-set";
import mapData from '../zhuhai.json';

// $.ajax({
//   url: "../zhuhai.json",
// //   url: "https://geo.datav.aliyun.com/areas/bound/440400_full.json",
//   async : false,
//   success: (iData) => {
//       console.log(iData)
//        data = iData 
//     }
// });
let data = mapData;
// var toolTipData = [{name:"斗门区",amount:10,manTime:31},{name:"金湾区",amount:11,manTime:21},{name:"香洲区",amount:12,manTime:11}];
const geoDv = new DataSet.View().source(data, {
  type: 'GeoJSON',
}).transform({
  type: 'map', 
});
const scale = {
  latitude: {
    sync: true,
    nice: false,
  },
  longitude: {
    sync: true,
    nice: false,
  },
};

class MapChart extends React.Component{
    render(){    
        const toolTipData = this.props.data;

        return(
            <Chart height={this.props.height} padding={this.props.padding} scale={scale} forceFit >        
                {/* // geo view */}
                <View data={geoDv}>
                    <Geom type="polygon" position="longitude*latitude*amount" color="#57a2f6"
                        tooltip={[
                        "name*amount",
                        (name) => {
                            var toolTiphtml = ''
                            for(var i = 0;i<toolTipData.length;i++){
                                if(this.props.id==='fundMap'){
                                    if(name==toolTipData[i].area){
                                        toolTiphtml += '<div>总金额：<b>￥'+toolTipData[i].amount+'</b></div><div>总人次：<b>'+toolTipData[i].count+'</b></div><div>医院总数：<b>'+toolTipData[i].total_hospital+'</b></div>';
                                    }
                                }else if(this.props.id==='auditMap'){
                                    if(name==toolTipData[i].name){
                                        toolTiphtml += '<div>异常金额：<b>￥'+toolTipData[i].amount+'</b></div><div>异常人次：<b>'+toolTipData[i].count+"</b></div>";
                                    }
                                }
                            }                
                            return {
                            name: name,
                            value:toolTiphtml
                            };
                        }
                        ]}
                    >
                        <Label content="name" offset={0}
                            htmlTemplate={(name)=>{    
                                if(name=='香洲区'){
                                    if(this.props.id==='fundMap'){
                                       return '<div class="title" style="position:absolute;left: -230px;top: -70px;font-size:12px;color:#f5f6f8;cursor:default">' + name + '</div>';
                                    }
                                    if(this.props.id==='auditMap'){
                                        return '<div class="title" style="position:absolute;left: -250px;top: -30px;font-size:12px;color:#f5f6f8;cursor:default">' + name + '</div>';
                                    }
                                }else{
                                    return '<div class="title" style="min-width: 50px;font-size:12px;color:#f5f6f8;cursor:default">' + name + '</div>';
                                }                        
                            }}
                        />
                    </Geom> 
                </View>
                <Tooltip showTitle={false} />
            </Chart>
        )
    }
}
export default MapChart