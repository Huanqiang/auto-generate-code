import ZJComponentClasses from './zj-components';
import { ZJComponentPropertyCategories } from './zj-component-perproty-item/constant';

export enum ZJComponentTags {
  DIV = 'ZJDiv',
  BUTTON = 'ZJButton',
  TEXT = 'ZJText',
}

export const components: IComponentClass[] = [
  {
    id: 1,
    tag: ZJComponentTags.DIV,
    title: '画布',
    type: ZJComponentClasses.ZJDiv,
    img: '',
    customPerproties: [
      {
        property: 'backgroundColor',
        name: '背景色',
        categoty: ZJComponentPropertyCategories.COLOR,
      },
      {
        property: 'borderRadius',
        name: '圆角',
        categoty: ZJComponentPropertyCategories.NUMBER,
      },
    ],
  },
  {
    id: 2,
    tag: ZJComponentTags.BUTTON,
    title: '按钮',
    type: ZJComponentClasses.ZJButton,
    img: '',
    customPerproties: [],
  },
  {
    id: 3,
    tag: ZJComponentTags.TEXT,
    title: '文本',
    // needDrag: true,
    // needScale: false,
    type: ZJComponentClasses.ZJText,
    img: '',
    customPerproties: [
      {
        property: 'text',
        name: '文本内容',
        defaultValue: '请修改文本内容',
        categoty: ZJComponentPropertyCategories.TEXT,
      },
      {
        property: 'textColor',
        name: '文本颜色',
        defaultValue: 'black',
        categoty: ZJComponentPropertyCategories.COLOR,
      },
      {
        property: 'fontSize',
        name: '文本大小',
        defaultValue: 17,
        categoty: ZJComponentPropertyCategories.NUMBER,
      },
    ],
  },
];
