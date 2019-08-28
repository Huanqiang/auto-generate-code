import React from 'react';
import { InputNumber } from 'antd';

type ITextPerprotyItemProps = {
  property: IZJComponentCustomPropertyCategory;
  value: number;
  onChange: (property: string, value: number) => void;
};

const TextPerprotyItem: React.FC<ITextPerprotyItemProps> = ({
  property,
  value,
  onChange,
}) => {
  return (
    <InputNumber
      style={{ width: `100%` }}
      placeholder={`请输入属性${property.name}的值...`}
      value={value}
      onChange={(num: number | undefined) => onChange(property.property, num || 0)}
    ></InputNumber>
  );
};

export default TextPerprotyItem;
