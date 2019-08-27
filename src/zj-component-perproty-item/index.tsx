import React from 'react';
import { ZJComponentPropertyCategories } from './constant';

import PropertyItemLayout from './PropertyItemLayout';
import ColorPerprotyItem from './ColorPerprotyItem';
import NumberPerprotyItem from './NumberPerprotyItem';
import TextPerprotyItem from './TextPerprotyItem';

const initPerportyItem = (
  perproty: IZJComponentCustomPropertyCategory,
  value: number | string,
  onChange: (property: string, value: any) => void
) => {
  let PerprotyItem = undefined;
  switch (perproty.categoty) {
    case ZJComponentPropertyCategories.TEXT:
      PerprotyItem = (
        <TextPerprotyItem
          property={perproty}
          value={value as string}
          onChange={onChange}
        ></TextPerprotyItem>
      );
      break;
    case ZJComponentPropertyCategories.COLOR:
      PerprotyItem = (
        <ColorPerprotyItem
          property={perproty}
          value={value as string}
          onChange={onChange}
        ></ColorPerprotyItem>
      );
      break;
    case ZJComponentPropertyCategories.NUMBER:
      PerprotyItem = (
        <NumberPerprotyItem
          key={perproty.property}
          property={perproty}
          value={value as number}
          onChange={onChange}
        ></NumberPerprotyItem>
      );
      break;
    default:
      PerprotyItem = <div>类型错误</div>;
  }

  return (
    <PropertyItemLayout key={perproty.property} name={perproty.name}>
      {PerprotyItem}
    </PropertyItemLayout>
  );
};

export default initPerportyItem;
