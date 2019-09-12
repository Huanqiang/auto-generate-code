import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ZJComponentWrapper from './zj-component-wrapper';
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

  /**
   * 画布大小变化时，自动计算height
   */
  resize = () => {
    if (this.canvasRef.current !== null) {
      isResize = true;
      this.setState({
        width: this.canvasRef.current.clientWidth,
        height: this.canvasRef.current.clientWidth * 0.75,
      });
    }
  };

  /**
   * 取消所有的自定义选中状态
   */
  onClearAllComponentSelected = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // 判断是点击了当前画布还是组件元素
    if (e.target === this.canvasRef.current) {
      this.props.clearZJComponentIsSelected();
      this.setState({ multiSelectedIds: [] });
    }
  };

  /**
   * 开始拖拽生成多选框
   */
  multiSelectStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    this.onClearAllComponentSelected(e);
    // this.setState({ multiSelectedIds: [] });
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

  /**
   * 拖拽生成多选框中
   */
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

  /**
   * 结束拖拽生成多选框
   */
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

  /**
   * 多自定义组件合并 - Redux
   */
  onCombine = (e: MouseEvent) => {
    e.preventDefault();
    const { needMultiSelecteing, multiSelectedIds } = this.state;
    if (needMultiSelecteing) {
      this.setState({ needMultiSelecteing: false });
      this.props.addMultiSelectedZJComponent(multiSelectedIds);
      this.props.multiSelectedZJComponent(multiSelectedIds);
      this.setState({ multiSelectedIds: [] });
    }
  };

  /**
   * 取消合并 - Redux
   */
  onCancelCombine = (e: MouseEvent, componentId: string) => {
    e.preventDefault();
    this.props.deletedMultiSelectedZJComponent(componentId);
    this.setState({ multiSelectedIds: [] });
  };

  /**
   * 渲染ZJ自定义组件
   */
  renderZJComponent = (
    components: IZJComponent[],
    parentWidth: number,
    parentHeight: number,
    multiSelectedIds: string[],
    needMultiSelecteing: boolean
  ) => {
    return components.map((c: IZJComponent) => (
      <ZJComponentWrapper
        key={c.id}
        parentSize={{
          width: parentWidth,
          height: parentHeight,
        }}
        parentOffset={{
          left: this.canvasRef.current!.offsetLeft,
          top: this.canvasRef.current!.offsetTop,
        }}
        component={c}
        tempMultiSelectedIds={multiSelectedIds}
        needMultiSelecteing={needMultiSelecteing}
        onCombine={this.onCombine}
        onCancelCombine={this.onCancelCombine}
        customPerproties={getCustomPerproties(c)}
      >
        {this.renderZJComponent(
          c.children,
          c.size.width,
          c.size.height,
          multiSelectedIds,
          needMultiSelecteing
        )}
      </ZJComponentWrapper>
    ));
  };

  /**
   * 渲染多选框
   */
  renderMultiSelectedBox = () => {
    const { isMultiSelecteing, multiSelectedCover } = this.state;
    return (
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
    );
  };

  render() {
    const { components } = this.props;
    const { width, height, needMultiSelecteing, multiSelectedIds } = this.state;

    return (
      <div
        id="MainCanvas"
        ref={this.canvasRef}
        className="home_main_canvas"
        style={{ height }}
        onMouseDown={this.multiSelectStart}
        onMouseMove={this.multiSelecting}
        onMouseUp={this.multiSelectEnd}
        onMouseLeave={this.multiSelectEnd}
      >
        {this.renderZJComponent(
          components,
          width,
          height,
          multiSelectedIds,
          needMultiSelecteing
        )}
        {/* 多选框 */}
        {this.renderMultiSelectedBox()}
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
