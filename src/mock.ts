import ZJComponentClasses from './zj-components';

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
  },
  {
    id: 2,
    tag: ZJComponentTags.BUTTON,
    title: '按钮',
    type: ZJComponentClasses.ZJButton,
    img: '',
  },
  {
    id: 3,
    tag: ZJComponentTags.TEXT,
    title: '文本框',
    type: ZJComponentClasses.ZJText,
    img: '',
  },
  {
    id: 4,
    tag: ZJComponentTags.DIV,
    title: '画布111',
    type: ZJComponentClasses.ZJDiv,
    img: '',
  },
  {
    id: 5,
    tag: ZJComponentTags.BUTTON,
    title: '按钮222',
    type: ZJComponentClasses.ZJButton,
    img: '',
  },
  {
    id: 6,
    tag: ZJComponentTags.TEXT,
    title: '文本框333',
    type: ZJComponentClasses.ZJText,
    img: '',
  },
];
