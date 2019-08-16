import React from 'react';
import DragScaleWrapper from '../../../components/drag-scale-wrapper';
import './index.css';

type IProp = {
  componentType: IComponentClass | undefined;
};

type IState = {
  components: any[];
  width: number;
  height: number;
};

class Main extends React.PureComponent<IProp, IState> {
  state = {
    components: [],
    width: 0,
    height: 0,
  };

  canvasRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  static getDerivedStateFromProps(props: IProp, state: IState) {
    if (props.componentType !== undefined) {
      state.components.forEach(c => {
        c[`componentsRef_${c.id}`].current.clearSelected();
      });

      const component = {
        id: state.components.length + 1,
        C: props.componentType.type,
        [`componentsRef_${state.components.length + 1}`]: React.createRef(),
      };
      return { components: [...state.components, component] };
    }
    return null;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    if (this.canvasRef.current !== null) {
      this.setState({
        width: this.canvasRef.current.clientWidth,
        height: this.canvasRef.current.clientWidth * 0.75,
      });
    }
  };

  clearAllComponentsSelected = () => {
    this.state.components.forEach((c: any) => {
      c[`componentsRef_${c.id}`].current.clearSelected();
    });
  };

  render() {
    const { components, width, height } = this.state;
    return (
      <div>
        Main
        <div ref={this.canvasRef} className="home_main_canvas" style={{ height: height }}>
          {components.map((c: any) => (
            <DragScaleWrapper
              key={c.id}
              ref={c[`componentsRef_${c.id}`]}
              parentWidth={width}
              parentHeight={height}
              Component={c.C}
              onClearAllComponentsSelected={this.clearAllComponentsSelected}
            ></DragScaleWrapper>
          ))}
        </div>
      </div>
    );
  }
}

// const Main: React.FC<IProp> = ({ componentType }) => {
//   const [components, setComponents] = useState<any[]>([]);
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//   const canvasRef = useRef<HTMLDivElement | null>(null);

//   const resize = () => {
//     if (canvasRef.current !== null) {
//       setWidth(canvasRef.current.clientWidth);
//       setHeight(canvasRef.current.clientWidth * 0.75);
//     }
//   };

//   useEffect(() => {
//     resize();
//   });

//   useEffect(() => {
//     window.addEventListener('resize', resize);
//     return () => window.removeEventListener('resize', resize);
//   });

//   useEffect(() => {
//     if (componentType !== undefined) {
//       components.forEach(c => {
//         c[`componentsRef_${c.id}`].clearSelected();
//       });

//       const component = {
//         id: components.length + 1,
//         C: componentType.type,
//         [`componentsRef_${components.length + 1}`]: useRef(),
//       };
//       setComponents([...components, component]);
//     }
//     // eslint-disable-next-line
//   }, [componentType]);

//   return (
//     <div>
//       Main
//       <div
//         ref={canvasRef}
//         className="home_main_canvas"
//         style={{ height: height }}
//       >
//         {components.map(c => (
//           <DragScaleWrapper
//             key={c.id}
//             ref={c[`componentsRef_${c.id}`]}
//             parentWidth={width}
//             parentHeight={height}
//             Component={c.C}
//           ></DragScaleWrapper>
//         ))}
//       </div>
//     </div>
//   );
// };

export default Main;
