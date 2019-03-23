import React from 'react';
import $ from 'jquery';
import Marquee from './marquee/marquee';
import styles from './index.less';
import { parse } from 'path';

// 比较
function compare(propertyName){
    return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2 - value1;
    }
}
function compareSTB(propertyName){
    return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value1 - value2;
    }
}
class MarqueePage extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className={styles.boxWarp}>
                <div className={styles.boxVertical} onMouseEnter={this.stopVerticalMarquee} onMouseLeave={this.runVerticalMarquee}>
                    <Marquee id={this.props.id} loopData={this.props.data} getMarquee={this.getVerticalMarquee} direction='vertical' verticalItemHeight='30px' />
                </div>
            </div>
        )
    }

    //竖向
    getVerticalMarquee = (params) => {
        this.verticalMarqueeParams = params
    }
    stopVerticalMarquee = () => {
        this.verticalMarqueeParams.stopMarquee();
    }
    runVerticalMarquee = () => {
        this.verticalMarqueeParams.runMarquee();
    }
}

// 报销 Top20
class Reimbursement extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        };
    }
    getAllCityTop(){
        $.ajax({
            url:'/json/all_city_top20.json',
            dataType:'json',
            success:function(res){
                res.sort(compare("amount"));
                this.setState({data:res});
            }.bind(this),
            error: function (httprequest,status,err) {
                console.log("error")
                console.log(httprequest)
                console.log(err)
                console.log(status)
            }.bind(this)
        });
    }
    componentDidMount(){
        this.getAllCityTop();
    }
    componentWillUnmount() {
    }
    render(){
        return (
            <div className={styles.list}>
                <MarqueePage id="allCityTop" data={this.state.data}/>
            </div>
        );
    }
}

// 报销总额
class TotalReimbursement extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        };
    }
    getAjax(){
        $.ajax({
            url:'/json/page1_left.json',
            dataType:'json',
            async: false,
            success:function(res){
                res.map((item,index)=>{
                    var yearMonth=item.month.split('-');
                    item.byMonth=parseInt(yearMonth[1]);                    
                })
                res.sort(compareSTB("byMonth"));
                this.setState({data:res});
            }.bind(this),
            error: function (httprequest,status,err) {
                console.log("error")
                console.log(httprequest)
                console.log(err)
                console.log(status)
            }.bind(this)
        });
    }
    componentDidMount(){
        this.getAjax();
    }
    componentWillUnmount() {

    }

    render(){
        return (
            <div className={styles.list}>
                <MarqueePage id="totalReimbursement" data={this.state.data}/>
            </div>
        );
    }
}

// 审核异常明细展示
class AbnormalDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            thead:{},
            tbody:[]
        };
    }
    getAjax(){
        $.ajax({
            url:'/json/page2_detail.json',
            type: 'get',
            async: true,
            success: function (res) {
                var thead={},
                    tbody=[];
                res.map((item,index)=>{
                    (index<1)?thead=item:tbody.push(item)
                })
                this.setState({
                    data:res,
                    thead:thead,
                    tbody:tbody
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
    componentDidMount(){
        this.getAjax();
    }
    componentWillUnmount() {
    }
    render(){
        return (
            <div className={styles.table}>
                <dl className={styles.thead}>
                    <dd className={styles.no}>{this.state.thead.no}</dd>
                    <dd className={styles.name}>{this.state.thead.name}</dd>
                    <dd className={styles.insurance}>{this.state.thead.insurance}</dd>
                    <dd className={styles.rule}>{this.state.thead.rule_name}</dd>
                    <dd className={styles.desc}>{this.state.thead.desc}</dd>
                    <dd className={styles.amount}>{this.state.thead.amount}</dd>
                </dl>
                <div className={styles.list}>
                    <MarqueePage id="abnormalDetails" data={this.state.tbody}/>
                </div>
            </div>
        );
    }
}


function GetRankData(props){
    const id=props.id;
    if(id=='Reimbursement'){
        return <Reimbursement  id={id}/>
    }else if(id=='TotalReimbursement'){
        return <TotalReimbursement  id={id}/>
    }else if(id=='abnormalDetails'){
        return <AbnormalDetails  id={id}/>
    }
}
class Rank extends React.Component{
    render(){
        return(
            <GetRankData id={this.props.id}/>
        )
    }
}

export default Rank;