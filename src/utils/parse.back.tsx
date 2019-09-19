import React from 'react';
import ReactDom from 'react-dom';
import ReactDomServer from 'react-dom/server';
import ZJButton from '../zj-components/zj-button';

const eventNames = ['onClick', 'onMouseDown', 'onMouseMove', 'onMouseUp'];

class Example extends React.Component<{}, { count: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 1,
    };
  }
  click = () => {
    this.setState(prev => ({ count: prev.count + 1 }));
  };
  render() {
    return (
      <div>
        <div onClick={this.click}>dfsdfds {this.state.count}</div>fdsa
      </div>
    );
  }
}

const renderRootNode = () => {
  const rootNode = document.createElement('div');
  rootNode.id = 'root-app';

  return rootNode;
};

const parseReactComponent = (Component: any, props: any) => {
  let exam = null;
  if (isReactComponent(Component)) {
    exam = new Component(props).render();
  } else {
    exam = Component(props);
  }

  const events: { [index: string]: any } = {};

  console.log('exam', exam);

  for (const key of Object.keys(exam.props)) {
    if (eventNames.includes(key)) {
      events[key] = exam.props[key];
    }
  }

  if (typeof exam.type === 'string') {
    const element = document.createElement(exam.type);
  } else {
    const { children, ...props } = exam.props;
    const x = new exam.type(props);
    const exam1 = x.render();
    console.log('x', x);
    console.log('exam1', exam1);
  }

  return ReactDomServer.renderToString(Component);
};

const parse = () => {
  const root = renderRootNode();

  // const e = React.createElement(ZJButton, {
  //   text: 'fdfs',
  //   textColor: 'red',
  //   fontSize: 17,
  //   backgroundColor: 'blue',
  //   borderRadius: 3,
  // });

  // console.log(e);

  // const son1 = parseReactComponent(ZJButton, {
  //   text: 'fdfs',
  //   textColor: 'red',
  //   fontSize: 17,
  //   backgroundColor: 'blue',
  //   borderRadius: 3,
  // });

  // const son2 = parseReactComponent(Example, {});

  ReactDom.render(
    <ZJButton
      text={'haode'}
      textColor={'red'}
      fontSize={17}
      backgroundColor={'white'}
      borderRadius={3}
    ></ZJButton>,
    root
  );

  console.log(root);
};

const isReactComponent = (Component: Function) => {
  const prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
};

export default parse;
