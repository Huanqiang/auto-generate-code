import React from 'react';
import { connect } from 'react-redux';
import DragScaleWrapper from '../../../components/drag-scale-wrapper';
import './index.css';

type IProp = {
  components: IZJComponent[];
};

type IState = {
  width: number;
  height: number;
};

let isResize = true;
class Main extends React.Component<IProp, IState> {
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
      return null;
    }

    props.components.forEach((c: IZJComponent) => {
      c.ref.current && c.ref.current.clearSelected();
    });
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

  clearAllComponentsSelected = () => {
    this.props.components.forEach((c: IZJComponent) => {
      c.ref.current && c.ref.current.clearSelected();
    });
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
              ref={c.ref}
              parentWidth={width}
              parentHeight={height}
              Component={c.type}
              onClearAllComponentsSelected={this.clearAllComponentsSelected}
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
