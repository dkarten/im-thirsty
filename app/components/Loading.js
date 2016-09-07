import React from 'react';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.originalText = props.loadingText;
    this.state = {
      text:this.originalText
    }
  }
  componentDidMount = () => {
    console.log('loading did mount')
    var stopper = this.originalText + "...";
    this.interval = setInterval(()=>{
      console.log('loading set interval');
      if (this.state.text === stopper) {
        this.setState({
          text:this.originalText
        });
      } else {
        this.setState({
          text: this.state.text + "."
        });
      }
    }, this.props.speed);
  }
  componentWillUnmount = () => {
    console.log("Loading unmounting");
    window.clearInterval(this.interval);
  }
  render(){
    const style = {};
    if (this.props.hide) {
      style.display = 'none';
    }
    console.log("Loading render! hide is " + this.props.hide);
    return (
      <div style={style} className={this.props.className}>
        <p>{this.state.text}</p>
      </div>
    )
  }
}

Loading.defaultProps = {
  loadingText:'Loading',
  speed:300
}

export default Loading;
