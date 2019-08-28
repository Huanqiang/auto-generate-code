import React from 'react';
import { SketchPicker } from 'react-color';
import { Popover, Input } from 'antd';

type ITextPerprotyItemProps = {
  property: IZJComponentCustomPropertyCategory;
  value: string;
  onChange: (property: string, value: string) => void;
};

const TextPerprotyItem: React.FC<ITextPerprotyItemProps> = ({
  property,
  value,
  onChange,
}) => {
  return (
    <div>
      <Popover
        content={
          <SketchPicker
            color={value}
            onChange={(color: any) => {
              onChange(property.property, color.hex);
            }}
          ></SketchPicker>
        }
        placement="bottomRight"
        trigger="click"
      >
        <Input
          style={{ width: `100%` }}
          placeholder={`请输入属性${property.name}的值...`}
          value={value}
        ></Input>
      </Popover>
    </div>
  );
};

export default TextPerprotyItem;
