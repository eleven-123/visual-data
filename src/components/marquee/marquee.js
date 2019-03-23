import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './marquee.css';

class Marquee extends Component {
  static defaultProps = {
    id:'',
    direction: 'landscape',
    verticalItemHeight: ''
  }

  constructor(props) {
    super(props);

    this.timerMarquee = null;
    this.domMi = null;
    this.domMw = null;

    this.state = {};
  }

  initMarquee = () => {
    this.stopMarquee();
    this.runMarquee();
  }

  //竖向滚动
  verticalMarquee = () => {
    (this.domMw.scrollTop >= this.domMi.scrollHeight) ? this.domMw.scrollTop = 0 : this.domMw.scrollTop++;
    this.timerMarquee = requestAnimationFrame(this.verticalMarquee);
  }

  // 运动
  runMarquee = () => {
    this.stopMarquee();
    this.timerMarquee = requestAnimationFrame(this.verticalMarquee);
  }

  //暂停
  stopMarquee = () => {
    this.timerMarquee && cancelAnimationFrame(this.timerMarquee)
  }

  componentDidMount = () => {
    this.initMarquee();
    let { getMarquee } = this.props
    getMarquee && getMarquee({
      runMarquee: this.runMarquee,
      stopMarquee: this.stopMarquee
    });
  }

  componentWillUnmount = () => {
    this.stopMarquee();
  }

  vMarqueeAllCityTop(){
    let { loopData, verticalItemHeight } = this.props;
    return (
      <div className={styles.marqueeVerticalWrap} ref={(mw) => { this.domMw = mw; }}>
        <div className={styles.marqueeList} ref={(mi) => { this.domMi = mi; }}>
          {loopData.map((item, index) => (<div style={{ height: verticalItemHeight, lineHeight: verticalItemHeight }} className={styles.marqueeItem} key={index}><span className={styles.title}>{index+1}. {item.hospital_name}</span><div className={styles.inner}><span>{parseFloat((item.amount)/10000).toFixed(2)}万元</span><span>/{parseInt(item.count)}</span><span className={styles.unit}>笔</span></div> </div>))}
        </div>
        <div className={styles.marqueeList}>
          {loopData.map((item, index) => (<div style={{ height: verticalItemHeight, lineHeight: verticalItemHeight }} className={styles.marqueeItem} key={index}><span className={styles.title}>{index+1}. {item.hospital_name}</span><div className={styles.inner}><span>{parseFloat((item.amount)/10000).toFixed(2)}万元</span><span>/{parseInt(item.count)}</span><span className={styles.unit}>笔</span></div> </div>))}
        </div>
      </div>
    )
  }
  vMarqueeTotalReimbursement(){
    let { loopData, verticalItemHeight } = this.props;
    return (
      <div className={styles.marqueeVerticalWrap} ref={(mw) => { this.domMw = mw; }}>
        <div className={styles.marqueeList} ref={(mi) => { this.domMi = mi; }}>
          {loopData.map((item, index) => (<div style={{ height: verticalItemHeight, lineHeight: verticalItemHeight }} className={styles.marqueeItem} key={index}><span className={styles.title}>{index+1}. 珠海市{item.area}{(item.month).substr(item.month.length-2)}月</span><div className={styles.inner}><span>{parseFloat((item.amount)/10000).toFixed(2)}万元</span><span>/{parseInt(item.count)}<span className={styles.unit}>笔</span></span></div></div>))}
        </div>
        <div className={styles.marqueeList}>
          {loopData.map((item, index) => (<div style={{ height: verticalItemHeight, lineHeight: verticalItemHeight }} className={styles.marqueeItem} key={index}><span className={styles.title}>{index+1}. 珠海市{item.area}{(item.month).substr(item.month.length-2)}月</span><div className={styles.inner}><span>{parseFloat((item.amount)/10000).toFixed(2)}万元</span><span>/{parseInt(item.count)}<span className={styles.unit}>笔</span></span></div></div>))}
        </div>
      </div>
    )
  }
  vMarqueeAbnormalDetails(){
    let { loopData, verticalItemHeight } = this.props;
    return (
      <div className={styles.marqueeVerticalWrap} ref={(mw) => { this.domMw = mw; }}>
        <div className={styles.marqueeList} ref={(mi) => { this.domMi = mi; }}>
          {loopData.map((item, index) => (
            <Tack data={item} verticalItemHeight={verticalItemHeight} key={index} />
          ))}
        </div>
        <div className={styles.marqueeList}>
          {loopData.map((item, index) => (
              <Tack data={item} verticalItemHeight={verticalItemHeight} key={index}/>
            ))}
        </div>
      </div>
    )
  }
  showInfo(){
    console.log("vdf")
  }
  hideInfo(){
    console.log("vdf111")
  }

  render() {
    let { id } = this.props;
    return (
      <div className={styles.reactMarqueeBox}>
        {(id === 'allCityTop')?this.vMarqueeAllCityTop():''}
        {(id === 'totalReimbursement')?this.vMarqueeTotalReimbursement():''}
        {(id === 'abnormalDetails')?this.vMarqueeAbnormalDetails():''}
      </div>
    )
  }
}

export default Marquee;

Marquee.propTypes = {
  id: PropTypes.string,
  loop: PropTypes.bool,
  loopData: PropTypes.array,
  getMarquee: PropTypes.func,
  direction: PropTypes.string,
  verticalItemHeight: PropTypes.string
};

class Tack extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver:false
    };
  }
  showFullInfo(e) {
    console.log(e.currentTarget.dataset.details)
    this.setState({
      isMouseOver:true
    })
  }

  hideFullInfo(e) {
    this.setState({
      isMouseOver:false
    })
  }
  render(){
    let data=this.props.data;
    let verticalItemHeight=this.props.verticalItemHeight;
    return(
      <div className={this.state.isMouseOver?'tack active':'tack'}>
        <dl data-details={data} onMouseEnter={this.showFullInfo.bind(this)} onMouseLeave={this.hideFullInfo.bind(this)} style={{ height: verticalItemHeight, lineHeight: verticalItemHeight }} className={styles.marqueeItem} >
              <dd className={styles.no}>{data.no}</dd>
              <dd className={styles.name}>{data.name}</dd>
              <dd className={styles.insurance}>{data.insurance}</dd>
              <dd className={styles.rule}>{data.rule_name}</dd>
              <dd className={styles.desc}>{data.desc}</dd>
              <dd className={styles.amount}>{data.amount}</dd>
        </dl>
        <div className="tips"><span className="tips_name">单据号：</span>{data.no} <span className="tips_name">| 姓名：</span>{data.name} <span className="tips_name">| 险种：</span>{data.insurance} <span className="tips_name">| 规则名称：</span>{data.rule_name} <span className="tips_name">| 违规描述：</span>{data.desc} <span className="tips_name">| 扣款金额：</span>{data.amount}</div>
      </div>
    )
  }
}