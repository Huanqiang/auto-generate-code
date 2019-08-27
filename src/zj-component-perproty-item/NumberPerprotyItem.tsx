import React from 'react';

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
    <input
      style={{ width: `100%` }}
      placeholder={`请输入属性${property.name}的值...`}
      value={value}
      type="number"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(property.property, +e.target.value)
      }
    ></input>
  );
};

export default TextPerprotyItem;
