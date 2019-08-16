// import React, { useState, useEffect, useRef } from 'react';
// import DragScaleWrapper from '../../../components/drag-scale-wrapper/index.hook.back';
// import './index.css';

// type IProp = {
//   componentType: IComponentClass | undefined;
// };

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
//       const component = {
//         id: components.length + 1,
//         C: componentType.type,
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

// export default Main;
export default 1;
