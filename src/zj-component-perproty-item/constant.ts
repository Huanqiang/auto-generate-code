export enum ZJComponentPropertyCategories {
  TEXT = 'TEXT',
  COLOR = 'COLOR',
  NUMBER = 'NUMBER',
}

export const getInitPropertyValue = (categoty: string) => {
  switch (categoty) {
    case ZJComponentPropertyCategories.NUMBER:
      return 0;
    case ZJComponentPropertyCategories.COLOR:
      return '#fff';
    case ZJComponentPropertyCategories.TEXT:
      return '';
    default:
      return '';
  }
};
