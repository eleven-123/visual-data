import React, { PureComponent } from 'react';
import { Row,Col,Progress} from 'antd';
import Rank from '@/components/rank';
import RulePieChart from '@/components/rulePieChart';
import MapChart from '@/components/mapChart';
import AbnormalSumMantime from '@/components/abnormalSumMantime';
import styles from './index.less';
import common from '../index.css';
import $ from 'jquery'

class AuditReport extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            ruleAmount:[],
            ruleCount:[]
        }
    }
    // 审核总金额等
    getTotal(){
        $.ajax({
            url:'/json/page2_total.json',
            type: 'get',
            async: true,
            success: function (res) {
                // 异常金额
                var abnormalAmount=[];
                // 异常人次
                var abnormalCount=[];
                res.by_month.map((item,index)=>{
                    item.name=parseFloat((item.name).split('-')[1])+'月';
                    abnormalAmount.push({
                        name:item.name,
                        value:parseFloat(item.amount)
                    })
                    abnormalCount.push({
                        name:item.name,
                        value:parseFloat(item.count)
                    })
                })
                //审核规则占比
                var ruleAmount=[],ruleCount=[];
                res.rule.map((item,index)=>{
                    ruleAmount.push({
                        name:item.name,
                        value:item.amount
                    })
                    ruleCount.push({
                        name:item.name,
                        value:item.count
                    })
                })
                //各区域审核异常金额、人次
                var mapToolTips=res.area;

                this.setState({
                    totalAmount :parseFloat((res.total.total_amount)/1000).toFixed(2),
                    totalFundAmount:parseFloat((res.total.total_fund_amount)/1000).toFixed(2),
                    totalPersonCount:res.total.total_person_count,
                    auditBillsCount:res.total.audit_bills_count,
                    systemAuditAmount:res.abnormal.system_audit_amount.amount,
                    systemAuditAmountPercent:parseFloat((res.abnormal.system_audit_amount.proportion).substr(0, (res.abnormal.system_audit_amount.proportion).length - 1)),
                    systemAuditCount:res.abnormal.system_audit_count.count,
                    systemAuditCountPercent:parseFloat((res.abnormal.system_audit_count.proportion).substr(0, (res.abnormal.system_audit_count.proportion).length - 1)),
                    humanAuditAmount:res.abnormal.human_audit_amount.amount,
                    humanAuditAmountPercent:parseFloat((res.abnormal.human_audit_amount.proportion).substr(0, (res.abnormal.human_audit_amount.proportion).length - 1)),
                    humanAuditCount:res.abnormal.human_audit_count.count,
                    humanAuditCountPercent:parseFloat((res.abnormal.human_audit_count.proportion).substr(0, (res.abnormal.human_audit_count.proportion).length - 1)),
                    // 异常金额、人次
                    abnormalAmount:abnormalAmount,
                    abnormalCount:abnormalCount,
                    // 审核规则占比
                    ruleAmount:ruleAmount,
                    ruleCount:ruleCount,

                    mapToolTips:mapToolTips
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
    componentDidMount() {
        this.getTotal();

    }
    componentWillUnmount() {

    }
    render(){

        return (
            <div className={styles.container}>
                <Row gutter={24} className={styles.row}>
                    <Col sm={12} xs={24} className={styles.col}> 
                        <div className={common.section+" "+common.normal}>
                            <div className={common.bg+' '+ common.bgLeftTop}></div>
                            <div className={common.bg+' '+ common.bgRightTop}></div>
                            <div className={common.bg+' '+ common.bgLeftBottom}></div>
                            <div className={common.bg+' '+ common.bgRightBottom}></div>
                            <div className={common.inner}>
                                <Row className={styles.listBox}>
                                    <Col sm={6} xs={24} className={styles.cell}>                  
                                        <div className={styles.itemBox}>
                                            <p>审核总金额(万元)</p>
                                            <h4 className={styles.number}>￥<b>{this.state.totalAmount}</b></h4>
                                        </div>
                                    </Col>
                                    <Col sm={6} xs={24} className={styles.cell}>
                                        <div className={styles.itemBox}>
                                            <p>基金总金额(万元)</p>
                                            <h4 className={styles.number +' '+ styles.yFontColor}>￥<b>{this.state.totalFundAmount}</b></h4>
                                        </div>
                                    </Col>
                                    <Col sm={6} xs={24} className={styles.cell}>
                                        <div className={styles.itemBox}>
                                            <p>总人次(次)</p>
                                            <h4 className={styles.number +' '+ styles.yFontColor}><b>{this.state.totalPersonCount}</b></h4>
                                        </div>
                                    </Col>
                                    <Col sm={6} xs={24} className={styles.cell}>
                                        <div className={styles.itemBox}>
                                            <p>审核单据总数</p>
                                            <h4 className={styles.number +' '+ styles.yFontColor}><b>{this.state.auditBillsCount}</b></h4>
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
                                <div className={styles.lineBox}>
                                    <Row className={styles.lineCell}>
                                        <Col sm={6}>
                                            <h4 className={styles.name}>系统初审异常金额</h4>
                                        </Col>
                                        <Col sm={6}>
                                            <p className={styles.value}>{this.state.systemAuditAmount}<span  className={styles.unit}>元</span></p>
                                        </Col>
                                        <Col sm={5}>
                                            <h5 className={styles.subname}>初审占总基金比</h5>
                                        </Col>
                                        <Col sm={7}>
                                            <Progress className={styles.progress} percent={this.state.systemAuditAmountPercent} />
                                        </Col>
                                    </Row>
                                    <Row className={styles.lineCell}>
                                        <Col sm={6}>
                                            <h4 className={styles.name}>系统初审异常人次</h4>
                                        </Col>
                                        <Col sm={6}>
                                            <p className={styles.value}>{this.state.systemAuditCount}<span  className={styles.unit}>人次</span></p>
                                        </Col>
                                        <Col sm={5}>
                                            <h5 className={styles.subname}>初审占总人次比</h5>
                                        </Col>
                                        <Col sm={7}>
                                            <Progress className={styles.progress} percent={this.state.systemAuditCountPercent} />
                                        </Col>
                                    </Row>
                                    <Row className={styles.lineCell}>
                                        <Col sm={6}>
                                            <h4 className={styles.name}>人工复审异常金额</h4>
                                        </Col>
                                        <Col sm={6}>
                                            <p className={styles.value}>{this.state.humanAuditAmount}<span  className={styles.unit}>元</span></p>
                                        </Col>
                                        <Col sm={5}>
                                            <h5 className={styles.subname}>复审占初审金额比</h5>
                                        </Col>
                                        <Col sm={7}>
                                            <Progress className={styles.progress} percent={this.state.humanAuditAmountPercent} />
                                        </Col>
                                    </Row>
                                    <Row className={styles.lineCell}>
                                        <Col sm={6}>
                                            <h4 className={styles.name}>人工复审异常人次</h4>
                                        </Col>
                                        <Col sm={6}>
                                            <p className={styles.value}>{this.state.humanAuditCount}<span className={styles.unit}>人次</span></p>
                                        </Col>
                                        <Col sm={5}>
                                            <h5 className={styles.subname}>复审占初审人次比</h5>
                                        </Col>
                                        <Col sm={7}>
                                            <Progress className={styles.progress} percent={this.state.humanAuditCountPercent} />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className={common.section+" "+common.irregular}>
                            <h3 className={common.title}>审核异常明细展示</h3>
                            <div className={common.inner}>
                                <Rank id="abnormalDetails"/>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} xs={24} className={common.col}> 
                        <div className={common.section+" "+common.irregular}>
                            <h3 className={common.title}>各月份审核异常金额及人次</h3>
                            <div className={common.inner}>
                                <Row>
                                    <Col sm={12} className={styles.itemWrap}>
                                        <h4 className={styles.celTtitle}>金额</h4>
                                        <AbnormalSumMantime data={this.state.abnormalAmount} title="金额" padding={[15,30,30,70]}/>
                                    </Col>
                                    <Col sm={12} className={styles.itemWrap}>
                                        <h4 className={styles.celTtitle}>人次</h4>
                                        <AbnormalSumMantime data={this.state.abnormalCount} title="人次" padding={[15,30,30,50]}/>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className={common.section+" "+common.irregular}>
                            <h3 className={common.title}>各区域审核出异常金额、异常人次</h3>
                            <div className={common.inner}>
                                <MapChart height={295} padding={[30,60,30,60]} data={this.state.mapToolTips} id="auditMap"/>
                            </div>
                        </div>
                        <div className={common.section+" "+common.irregular}>
                            <h3 className={common.title}>审核规则异常占比</h3>
                            <div className={common.inner}>
                                <Row>
                                    <Col sm={12} className={styles.itemWrap}>
                                        <h4 className={styles.celTtitle}>金额</h4>
                                        <RulePieChart id="ruleAmount" data={this.state.ruleAmount} innerRadius={0.75} title="规则占比"/>
                                    </Col>
                                    <Col sm={12} className={styles.itemWrap}>
                                        <h4 className={styles.celTtitle}>人次</h4>
                                        <RulePieChart id="ruleCount" data={this.state.ruleCount} innerRadius={0.75} title="规则占比"/>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }    
}
export default AuditReport;