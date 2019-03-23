import React, { PureComponent } from 'react';
import Link from 'umi/link';
import {Layout} from 'antd';
import styles from './Header.less';
const {Header} = Layout;
import moment from "moment";
import router from 'umi/router';

class Clock extends React.Component{
    constructor(props) {
        super(props);
        var obj = {
            year:moment(new Date()).format('YYYY'),
            month:moment(new Date()).format('MM'),
            day:moment(new Date()).format('DD'),
            time:moment(new Date()).format('HH:mm:ss'),
            week:this.weekFormat(moment(new Date()).format('d'))
        }
        this.state = {date: obj};
    }
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    weekFormat(num){
        if(num==1){
            return '星期一'
        }
        else if(num==2){
            return '星期二'
        }
        else if(num==3){
            return '星期三'
        }
        else if(num==4){
            return '星期四'
        }
        else if(num==5){
            return '星期五'
        }
        else if(num==6){
            return '星期六'
        }
        else if(num=7){
            return '星期日'
        }
    }
    tick() {
        var obj = {
            year:moment(new Date()).format('YYYY'),
            month:moment(new Date()).format('MM'),
            day:moment(new Date()).format('DD'),
            time:moment(new Date()).format('HH:mm:ss'),
            week:this.weekFormat(moment(new Date()).format('d'))
        }
        this.setState({
          date: obj
        });
    }
    render() {
        return (
            <div className={styles.date}>
                {this.state.date.year}年{this.state.date.month}月{this.state.date.day}日 {this.state.date.time} {this.state.date.week}
            </div>
        );
    }
}
class Menu extends PureComponent{
    constructor(props) {
        super(props);
        this.state = { 
            menuTabs:[{name:'全年基金报告',id:0,key:"/fundReport"},{name:'审计报告',id:1,key:'/auditReport'}]
        };
    }
    getCurrentMenu(path){
        var menuId;        
        if(path==='/'){
            this.setState ({ 
                currentMenu:0
            })
        }else{
            this.state.menuTabs.map(function(res,index) {
                if(path===res.key){
                    menuId= res.id
                }
            })
            this.setState ({ 
                currentMenu:menuId
            })
        }
    }
    componentDidMount(){  
        this.getCurrentMenu(location.pathname);
        document.addEventListener("keydown", this.onKeyDown)
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.onKeyDown)
    }
    onKeyDown = (e) => {
        if(e.keyCode==40){
            var pathname=location.pathname;
            if(pathname!=='/auditReport'){
                router.push('/auditReport')
            }
            this.setState({
                currentMenu:1,
            });
        }else if(e.keyCode==38){
            var pathname=location.pathname;
            if(pathname!=='/fundReport'){
                router.push('/fundReport')
            }
            this.setState({
                currentMenu:0,
            });
        }
    }
    onMenuTab=(id)=>{
        this.setState({
            currentMenu:id,
        });
    }
    render(){
        return(
            this.state.menuTabs.map(function(res,index) {
                return <li key={index} onClick={this.onMenuTab.bind(this,res.id)} className={res.id==this.state.currentMenu ? styles.active : ''}>
                    <Link to={res.key}>{res.name}</Link>
                </li>
            }.bind(this))
        )
    }
}
class BasicHeader extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render(){
        return (
            <Layout>
                <Header className={styles.header}>
                    {/* <div className={styles.logo}></div> */}
                    {/* <div className={styles.date}>2019年03月21日 18:02:53 星期四</div> */}
                    <Clock />
                    <h3 className={styles.title}>珠海智慧人社</h3>
                    <ul className={styles.menu}>
                        <Menu />
                    </ul>
                    {/* <div className={styles.userInfo}>
                        <span>珠海人社</span>
                        <Link to="/login" className={styles.logout}>退出</Link>
                    </div> */}
                </Header>
            </Layout>
            
        );
    }
  
}

export default BasicHeader
