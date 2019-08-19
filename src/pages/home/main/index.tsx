import React from 'react';
import { connect } from 'react-redux';
import DragScaleWrapper from '../../../components/drag-scale-wrapper';
// import DragScaleWrapper from '../../../components/drag-scale-wrapper/index.hook.back';
import './index.css';

type IProp = {
  components: IZJComponent[];
};

type IState = {
  width: number;
  height: number;
};

let isResize = true;
class Main extends React.PureComponent<IProp, IState> {
  state = {
    width: 0,
    height: 0,
  };

  canvasRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  static getDerivedStateFromProps(props: IProp, state: IState) {
    if (isResize) {
      isResize = false;
    }
    return null;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    if (this.canvasRef.current !== null) {
      isResize = true;
      this.setState({
        width: this.canvasRef.current.clientWidth,
        height: this.canvasRef.current.clientWidth * 0.75,
      });
    }
  };

  render() {
    const { components } = this.props;
    const { width, height } = this.state;
    return (
      <div>
        Main
        <div
          id="MainCanvas"
          ref={this.canvasRef}
          className="home_main_canvas"
          style={{ height: height }}
        >
          {components.map((c: IZJComponent) => (
            <DragScaleWrapper
              key={c.id}
              parentWidth={width}
              parentHeight={height}
              id={c.id}
              size={c.size}
              isSelected={c.isSelected}
              Component={c.type}
            ></DragScaleWrapper>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  components: state.components,
});

export default connect(
  mapStateToProps,
  null
)(Main);
