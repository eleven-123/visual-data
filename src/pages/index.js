import React, { PureComponent } from 'react';
import Redirect from 'umi/redirect'

class Index extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      isLogined:true
    };
  }
  render(){
    if(this.state.isLogined){
      return <Redirect to={`/fundReport`} />
    }else{
      return <Redirect to={`/login`} />
    }
  }  
}
export default Index