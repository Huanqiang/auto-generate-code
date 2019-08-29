import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import DragScaleWrapper from './drag-scale-wrapper';
import {
  clearZJComponentIsSelected,
  multiSelectedZJComponent,
} from '../../../store/zj-components/actions';
import {
  addMultiSelectedZJComponent,
  deletedMultiSelectedZJComponent,
} from '../../../store/multi-selected-zj-components/actions';
import './index.css';

type IProp = {
  components: IZJComponent[];
  clearZJComponentIsSelected: () => void;
  multiSelectedZJComponent: (ids: string[]) => void;
  addMultiSelectedZJComponent: (ids: string[]) => void;
  deletedMultiSelectedZJComponent: (componentId: string) => void;
};

type IState = {
  width: number;
  height: number;
  multiSelectedCover: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  multiSelectedIds: string[];
  needMultiSelecteing: boolean;
  isMultiSelecteing: boolean;
};

const getCustomPerproties = (component: IZJComponent) => {
  let newPerproties: {
    [index: string]: string | number;
  } = {};
  component.customPerproties.forEach(perproty => {
    newPerproties[perproty.property] = component.config[perproty.property];
  });
  return newPerproties;
};

let isResize = true;
class Main extends React.PureComponent<IProp, IState> {
  state = {
    width: 0,
    height: 0,
    multiSelectedCover: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    multiSelectedIds: [],
    needMultiSelecteing: false,
    isMultiSelecteing: false,
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

  onClearAllComponentSelected = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // 判断是点击了当前画布还是组件元素
    if (e.target === this.canvasRef.current) {
      this.props.clearZJComponentIsSelected();
    }
  };

  multiSelectStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    this.onClearAllComponentSelected(e);
    if (e.target === this.canvasRef.current) {
      this.setState({
        needMultiSelecteing: false,
        isMultiSelecteing: true,
        multiSelectedCover: {
          width: 0,
          height: 0,
          left: e.pageX - this.canvasRef.current!.offsetLeft,
          top: e.pageY - this.canvasRef.current!.offsetTop,
        },
      });
    }
  };

  multiSelecting = (e: React.MouseEvent<HTMLDivElement>) => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    if (this.state.isMultiSelecteing) {
      const offset = {
        left: e.pageX - this.canvasRef.current!.offsetLeft,
        top: e.pageY - this.canvasRef.current!.offsetTop,
      };

      this.setState(prevState => ({
        multiSelectedCover: {
          ...prevState.multiSelectedCover,
          width: offset.left - prevState.multiSelectedCover.left,
          height: offset.top - prevState.multiSelectedCover.top,
        },
      }));
    }
  };

  multiSelectEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    const {
      isMultiSelecteing,
      multiSelectedCover: { top, left, width, height },
    } = this.state;

    if (!isMultiSelecteing) {
      return;
    }

    const multiSelectedIds = this.props.components
      .filter(
        component =>
          component.position.top > top &&
          component.position.left > left &&
          component.position.left + component.size.width < left + width &&
          component.position.top + component.size.height < top + height
      )
      .map(c => c.id);

    if (multiSelectedIds.length !== 0) {
      //  将选择框内的组件设置为被选中状态
      this.props.multiSelectedZJComponent(multiSelectedIds);
      if (multiSelectedIds.length > 1) {
        this.setState({ multiSelectedIds, needMultiSelecteing: true });
      }
    }

    this.setState({
      isMultiSelecteing: false,
      multiSelectedCover: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
    });
  };

  onCombine = (e: MouseEvent) => {
    e.preventDefault();
    const { needMultiSelecteing, multiSelectedIds } = this.state;
    if (needMultiSelecteing) {
      this.setState({ needMultiSelecteing: false });
      this.props.addMultiSelectedZJComponent(multiSelectedIds);
      this.props.multiSelectedZJComponent(multiSelectedIds);
    }
  };

  onCancelCombine = (e: MouseEvent, componentId: string) => {
    e.preventDefault();
    this.props.deletedMultiSelectedZJComponent(componentId);
  };

  render() {
    const { components } = this.props;
    const {
      width,
      height,
      isMultiSelecteing,
      multiSelectedCover,
      needMultiSelecteing,
    } = this.state;
    return (
      <div
        id="MainCanvas"
        ref={this.canvasRef}
        className="home_main_canvas"
        style={{ height }}
        // onClick={}
        onMouseDown={this.multiSelectStart}
        onMouseMove={this.multiSelecting}
        onMouseUp={this.multiSelectEnd}
        onMouseLeave={this.multiSelectEnd}
      >
        {components.map((c: IZJComponent) => (
          <DragScaleWrapper
            key={c.id}
            parentWidth={width}
            parentHeight={height}
            component={c}
            needMultiSelecteing={needMultiSelecteing}
            onCombine={this.onCombine}
            onCancelCombine={this.onCancelCombine}
            customPerproties={getCustomPerproties(c)}
          >
            {c.children &&
              c.children.map((child: IZJComponent) => (
                <DragScaleWrapper
                  key={child.id}
                  parentWidth={c.size.width}
                  parentHeight={c.size.height}
                  component={child}
                  needMultiSelecteing={needMultiSelecteing}
                  onCombine={this.onCombine}
                  onCancelCombine={this.onCancelCombine}
                  customPerproties={getCustomPerproties(child)}
                ></DragScaleWrapper>
              ))}
          </DragScaleWrapper>
        ))}
        {/* 多选框 */}
        <div
          className=""
          style={{
            display: isMultiSelecteing ? 'block' : 'none',
            border: `1px dashed #C2C2C2`,
            backgroundColor: `rgba(194, 194, 194, 0.4)`,
            position: 'absolute',
            transform: `translate(${multiSelectedCover.left}px, ${multiSelectedCover.top}px)`,
            width: multiSelectedCover.width,
            height: multiSelectedCover.height,
          }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  components: state.components,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearZJComponentIsSelected: () => dispatch(clearZJComponentIsSelected()),
  multiSelectedZJComponent: (ids: string[]) =>
    dispatch(multiSelectedZJComponent({ ids })),
  addMultiSelectedZJComponent: (ids: string[]) =>
    dispatch(addMultiSelectedZJComponent({ componentIds: ids })),
  deletedMultiSelectedZJComponent: (componentId: string) =>
    dispatch(deletedMultiSelectedZJComponent({ componentId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
