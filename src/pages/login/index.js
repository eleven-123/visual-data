import React, { PureComponent } from 'react';
import { message } from 'antd';
import styles from './index.less';

class Login extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            account: '',
            password: ''
        }
    }
    onInputChange(e){
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    // 判断输入框是否为空
    checkLoginInfo(loginInfo){
        let account = loginInfo.account,
            password = loginInfo.password;
        if(typeof account !== 'string' || account.length ===0){
            return {
                status: false,
                msg: '账号不能为空！'
            }
        }
        if(typeof password !== 'string' || password.length ===0){
            return {
                status: false,
                msg: '密码不能为空！'
            }
        }
        return {
            status : true,
            msg : '账号、密码均不为空'
        }
    }
    onSubmit(){
        let loginInfo = {
            account : this.state.account,
            password : this.state.password
        };
        let checkResult = this.checkLoginInfo(loginInfo)
        if(checkResult.status){
            if(loginInfo.account==="zhrs"&&loginInfo.password=="zhrs@123"){
                // message.success("登录成功");
                this.props.history.push("/")
            }else{
                message.success("账号或密码输入错误");
            }                
        }else{
            message.error(checkResult.msg);
        }
    }
    render(){
        return (
            <div className={styles.login}>
                <div className={styles.logo +' '+ styles.s_logo}>珠海智慧人社</div>
                <div className={styles.logo}></div>
                <div className={styles.form}>
                    <div className={styles.inner}>
                        <h4 className={styles.title}>智慧人社大屏展示系统</h4>
                        <form>
                            <div className={styles.form_row}>
                                <input type="text" className={styles.text} placeholder="账号" name="account" onKeyUp={e => this.onInputKeyUp(e)} onChange={e => this.onInputChange(e)}/>
                            </div>
                            <div className={styles.form_row}>
                                <input type="password" className={styles.text} placeholder="密码" name="password" onKeyUp={e => this.onInputKeyUp(e)} onChange={e => this.onInputChange(e)}/>
                            </div>
                            <div className={styles.form_btn}>
                                <button type="button" className={styles.loginBtn} onClick={e => {this.onSubmit(e)}}>登录</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.footer}>
                    <p>2018-2019 平安医疗健康管理股份有限公司. Design. All rights reserved.</p>
                </div>
            </div>
        );
    }    
}
export default Login;