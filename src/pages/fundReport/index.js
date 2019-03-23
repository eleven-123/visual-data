import React, { PureComponent } from 'react';
import { Row,Col} from 'antd';
import Rank from '@/components/rank';
import PieChart from '@/components/pieChart';
import MapChart from '@/components/mapChart';
import PieSolidChart from '@/components/pieSolidChart';
import BarChart from '@/components/barChart';
import LineChart from '@/components/lineChart';
import styles from './index.less';
import common from '../index.css';
import $ from "jquery";

// 格式化数据 - 按时间排序
function formatData(data, prop) {
    for (var i = 0; i < data.length - 1; i++) {
        for (var j = 0; j < data.length - 1 - i; j++) {
            if (Date.parse(data[j][prop]) > Date.parse(data[j+1][prop])) {
                var temp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = temp;
            }
        }
    }
    return data;
}

class FundReport extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            monthTabs:[{name:'1月',id:'01'},{name:'2月',id:'02'},{name:'3月', id:'03'},{name:'4月',id:'04'},{name:'5月',id:'05'},{name:'6月',id:'06'},{name:'7月',id:'07'},{name:'8月',id:'08'},{name:'9月',id:'09'},{name:'10月',id:'10'},{name:'11月',id:'11'},{name:'12月',id:'12'}],
            currentMonth:'',
            regionTabs:[{name:'珠海市',id:0},{name:'斗门区',id:440403},{name:'金湾区',id:440404},{name:'香洲区',id:440402},{name:'异地',id:'异地'}],
            currentRegion:0,
            catalogData:[],
            payData:[],
            fundCompareMonth:[],
            fundCompareCity:[]
        };
    }
    onMonthTab=(id)=>{
        this.state.payData.map((item)=>{
            item.amount=0
            item.data.map((nItem)=>{
                if((nItem.month).substr(-2,2)===id){
                    item.amount+=parseFloat(nItem.amount)
                }
            })
        })
        this.setState({
            currentMonth:id
        });
    }
    onRegionTab=(id)=>{
        var list=this.state.fundCompareCityTotal;

        if(id==0){
            this.resetFundCompareCityTotal()
                this.setState({
                    currentRegion:id,
                })
        }else{
            var map = {},
            newArry = [],
            newFund=[];
            for(var i = 0; i < list.length; i++){
                var item = list[i];
                if(!map[item.area]){
                    newArry.push({
                        area:item.area,
                        month: item.month,
                        amount:0,
                        count:0,
                        data: [item],
                    });
                    map[item.area] = item;
                }else{
                    for(var j = 0; j < newArry.length; j++){
                        if(newArry[j].area == item.area){
                            newArry[j].data.push(item);
                            break;
                        }
                    }
                }
            }
            newArry.map((item)=>{
                if(item.area===(id+'')){
                    newFund=item.data
                }
            })
            newFund.map((nItem,nIndex)=>{
                var yearMonth=(nItem.month).split('-');
                nItem.year=yearMonth[0];
                nItem.bymonth=parseFloat(yearMonth[1])+'月';
                nItem.amount=parseFloat(nItem.amount)
                nItem.count=parseInt(nItem.count)
            })
            this.setState({
                currentRegion:id,
                fundCompareCity:newFund
            })
        }
    }
    // 三目录分布数据
    getCataLog(){
        $.ajax({
            url:'/json/three_catalog.json',
            type: 'get',
            async: true,
            success: function (res) {
                this.setState({
                    catalogData:res.data,
                });
            }.bind(this),
            error: function (httprequest,status,err) {
                console.log("error")
                console.log(httprequest)
                console.log(err)
                console.log(status)
            }.bind(this)
        })        
    }
    // 总金额
    getTotal(){
        $.ajax({
            url:'/json/total.json',
            type: 'get',
            async: true,
            success: function (res) {
                this.setState({                    
                    totalMiddleAmount :parseFloat((res.total_middle_amount)/10000).toFixed(2),
                    totalReimbursementAmount:parseFloat((res.total_reimbursement_amount)/10000).toFixed(2),
                    totalHospitalizationCount:res.total_hospitalization_count,
                });
            }.bind(this),
            error: function (httprequest,status,err) {
                console.log("error")
                console.log(httprequest)
                console.log(err)
                console.log(status)
            }.bind(this)
        })
    }
    // 地图数据
    getMapToolTips(){
        $.ajax({
            url:'/json/zhuhai-map.json',
            type: 'get',
            async: true,
            success: function (res) {
                this.setState({
                    mapToolTips:res
                });
            }.bind(this),
            error: function (httprequest,status,err) {
                console.log("error")
                console.log(httprequest)
                console.log(err)
                console.log(status)
            }.bind(this)
        })
    }
    // 各等级支付情况
    getPayData(){
        $.ajax({
            url:'/json/fund_pay.json',
            type: 'get',
            async: true,
            success: function (res) {
                var map = {},
                    newArry = [];
                for(var i = 0; i < res.length; i++){
                    var item = res[i];
                    if(!map[item.level]){
                        newArry.push({
                            level: item.level,
                            data: [item],
                            amount:0
                        });
                        map[item.level] = item;
                    }else{
                        for(var j = 0; j < newArry.length; j++){
                            if(newArry[j].level == item.level){
                                newArry[j].data.push(item);
                                break;
                            }
                        }
                    }
                }
                newArry.map((item)=>{
                    item.data.map((nItem)=>{
                        item.amount+=parseFloat(nItem.amount)
                    })
                })
                this.setState({
                    payData:newArry
                });
            }.bind(this),
            error: function (httprequest,status,err) {
                console.log("error")
                console.log(httprequest)
                console.log(err)
                console.log(status)
            }.bind(this)
        })
    }
    // 2018年与2017年基金支出各月份对比
    getFundCompareMonth(){
        $.ajax({
            url:'/json/2017-2018-fund_compare-2.json',
            type: 'get',
            async: true,
            success: function (res) {
                res.map((item)=>{
                    var yearMonth=(item.month).split('-');
                    item.year=yearMonth[0]
                    item.month=parseFloat(yearMonth[1])+'月'
                    item.amount=parseFloat(item.amount)
                })
                this.setState({
                    fundCompareMonth:res
                })
                
            }.bind(this),
            error: function (httprequest,status,err) {
                console.log("error")
                console.log(httprequest)
                console.log(err)
                console.log(status)
            }.bind(this)
        })
    }
    // 珠海2018年各区基金支出与2017年对比
    getFundCompareCity(){
        $.ajax({
            url:'/json/zhuhai-2017-2018-fund_compare.json',
            type: 'get',
            async: true,
            success: function (res) { 
                res.map((item)=>{
                    var yearMonth=(item.month).split('-');
                    item.bymonth=parseFloat(yearMonth[1]);
                })
                formatData(res, "month");

                this.setState({
                    fundCompareCityTotal:res
                })
                this.resetFundCompareCityTotal()
                
            }.bind(this),
            error: function (httprequest,status,err) {
                console.log("error")
                console.log(httprequest)
                console.log(err)
                console.log(status)
            }.bind(this)
        })
    }
    resetFundCompareCityTotal(){
        var data = this.state.fundCompareCityTotal;
        var map = {},
            newArry = [];
        for(var i = 0; i < data.length; i++){
            var item = data[i];
            if(!map[item.month]){
                newArry.push({
                    month: item.month,
                    amount:0,
                    count:0,
                    data: [item],
                });
                map[item.month] = item;
            }else{
                for(var j = 0; j < newArry.length; j++){
                    if(newArry[j].month == item.month){
                        newArry[j].data.push(item);
                        break;
                    }
                }
            }
        }
        newArry.map((item)=>{
            var yearMonth=(item.month).split('-');
            item.year=yearMonth[0];
            item.bymonth=parseFloat(yearMonth[1])+'月';
            item.data.map((nItem)=>{
                item.amount+=parseFloat(nItem.amount)
                item.count+=parseInt(nItem.count)
            })
                                   
        })
        this.setState({
            fundCompareCity:newArry
        })
    }

    componentDidMount() {
        this.getCataLog();
        this.getTotal();
        this.getMapToolTips()
        this.getPayData()
        this.getFundCompareMonth()
        this.getFundCompareCity()
    }
    componentWillUnmount() {

    }
    render(){          
        
        // 月份遍历
        var _this=this;
        var monthList= this.state.monthTabs.map(function(res,index) {
            var tabStyle=(res.id==this.state.currentMonth) ? 'linkCell active' : 'linkCell';
            return  <a key={index} onClick={this.onMonthTab.bind(_this,res.id)} className={tabStyle}>{res.name}</a>
        }.bind(_this));
        // 市区遍历
        var regionList= this.state.regionTabs.map(function(res,index) {
            var tabStyle=(res.id==this.state.currentRegion) ? 'tabBtn active' : 'tabBtn';
            return  <a key={index} onClick={this.onRegionTab.bind(_this,res.id)} className={tabStyle}>{res.name}</a>
        }.bind(_this));

        return (
            <div className={styles.container}>
            <Row gutter={24} className={styles.row}>
                <Col lg={6} md={12} sm={24} xs={24} className={styles.left}> 
                <div className={common.section+" "+common.irregular}>
                    <h3 className={common.title}>全市医院报销总额 TOP20</h3>
                    <div className={common.inner}>
                    <Rank id="Reimbursement"/>              
                    </div>
                </div>
                <div className={common.section+" "+common.irregular}>
                    <h3 className={common.title}>各区1-12月报销总额</h3>
                    <div className={common.inner}>
                    <Rank id="TotalReimbursement"/>              
                    </div>
                </div>
                <div className={common.section+" "+common.irregular}>
                    <h3 className={common.title}>全市报销三目录占比</h3>
                    <div className={common.inner}>
                        <PieChart data={this.state.catalogData} innerRadius={0.75} title="三目录分布"/>
                    </div>
                </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24} className={styles.middle}> 
                <div className={common.section+" "+common.normal}>
                    <div className={common.bg+' '+ common.bgLeftTop}></div>
                    <div className={common.bg+' '+ common.bgRightTop}></div>
                    <div className={common.bg+' '+ common.bgLeftBottom}></div>
                    <div className={common.bg+' '+ common.bgRightBottom}></div>
                    <div className={common.inner}>
                    <Row className={styles.listBox}>
                        <Col sm={8} xs={24} className={styles.cell}>                  
                        <div className={styles.itemBox}>
                            <p>申请报销总金额(万元)</p>
                            <h4 className={styles.number}>￥<b>{this.state.totalMiddleAmount}</b></h4>
                        </div>
                        </Col>
                        <Col sm={8} xs={24} className={styles.cell}>
                        <div className={styles.itemBox}>
                            <p>报销总额(万元)</p>
                            <h4 className={styles.number +' '+ styles.yFontColor}>￥<b>{this.state.totalReimbursementAmount}</b></h4>
                        </div>
                        </Col>
                        <Col sm={8} xs={24} className={styles.cell}>
                        <div className={styles.itemBox}>
                            <p>住院人次</p>
                            <h4 className={styles.number +' '+ styles.yFontColor}><b>{this.state.totalHospitalizationCount}</b></h4>
                        </div>
                        </Col>
                    </Row>
                    </div>
                </div>
                <div className={common.section+" "+common.normal}>
                    <div className={common.bg+' '+ common.bgLeftTop}></div>
                    <div className={common.bg+' '+ common.bgRightTop}></div>
                    <div className={common.bg+' '+ common.bgLeftBottom}></div>
                    <div className={common.bg+' '+ common.bgRightBottom}></div>
                    <div className={common.inner}>
                    <MapChart height={772} padding={[82,25,82,25]} data={this.state.mapToolTips} id="fundMap"/>
                    </div>
                </div>
                </Col>
                <Col lg={6} md={12} sm={24} xs={24} className={styles.right}> 
                <div className={common.section+" "+common.irregular}>
                    <h3 className={common.title}>各等级医疗机构基金支付情况</h3>
                    <div className={common.inner}>
                    <PieSolidChart data={this.state.payData} />
                    <div className={styles.linkTab}>
                        {monthList}
                    </div>
                    </div>
                </div>
                <div className={common.section+" "+common.irregular}>
                    <h3 className={common.title}>2018年与2017年基金支出各月份同比情况</h3>
                    <div className={common.inner}>
                    <BarChart data={this.state.fundCompareMonth}/>
                    </div>
                </div>
                <div className={common.section+" "+common.irregular}>
                    <h3 className={common.title}>珠海2018年各区基金支出与2017年同比情况</h3>
                    <div className={common.inner}>
                    <LineChart data={this.state.fundCompareCity} />
                    <div className={styles.btnList}>
                        {regionList}
                    </div>
                    </div>
                </div>
                </Col>
            </Row>
            </div>
        );
    }
}
export default FundReport;