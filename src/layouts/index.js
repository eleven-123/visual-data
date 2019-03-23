import Header from './Header';
function BasicLayout(props) {
  return (
    <div>
      <Header/>
      { props.children }
    </div>
  );
}

export default BasicLayout;
