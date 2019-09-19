import store from '../store';

const blank = '  ';

const template = (deps: string, children: string) => {
  return `
  import React from 'react'
  ${deps}

  export default () => {
    return <div>
${children}
    </div>
  }
  `;
};

/**
 * 获取组件依赖
 * @param types zj-components 类型
 */
const getComponentDeps = (components: any[]) => {
  const types = components.map(comp => comp.type);
  const ts = Array.from(new Set(types.map(type => type.name)));
  return `import {${ts.join()}} from 'zj-components'`;
};

/**
 * 获取props
 * @param component zj-component实例
 */
const setProps = (component: IZJComponent) => {
  const style = {
    width: component.size.width,
    height: component.size.height,
    textAlign: `center`,
    lineHeight: `${component.size.height}px`,
    verticalAlign: `middle`,
    position: `absolute`,
    transform: `translate(${component.position.left}px, ${component.position.top}px)`,
  };

  const cusConfig = Object.keys(component.config)
    .map(
      key =>
        `${key}={${
          typeof component.config[key] === 'number'
            ? component.config[key]
            : `'${component.config[key]}'`
        }}`
    )
    .join(' ');

  return `style={${JSON.stringify(style)}} ${cusConfig}`;
};

/**
 * 渲染单一的组件实例
 * @param component zj-component实例
 */
const renderComponent = (component: IZJComponent, level: number): string => {
  const type = component.type.name;
  return `${renderBlank(level)}<${type} ${setProps(component)}>${
    component.hasChildren && component.children.length > 0
      ? '\n' +
        getComponentChild(component.children, level + 1) +
        '\n' +
        renderBlank(level)
      : ''
  }</${type}>`;
};

const renderBlank = (level: number) => {
  return Array(level)
    .fill(blank)
    .join('');
};

/**
 *
 * @param components 实例组件
 */
const getComponentChild = (components: IZJComponent[], level: number) => {
  return components.map(comp => renderComponent(comp, level)).join(`\n`);
};

export const parse = () => {
  const components = store.getState().components;

  if (components.length === 0) {
    return '';
  }

  const deps = getComponentDeps(components);
  const child = getComponentChild(components, 3);

  return template(deps, child);
};
