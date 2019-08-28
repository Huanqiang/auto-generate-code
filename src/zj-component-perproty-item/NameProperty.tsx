import React from 'react';
import PropertyItemLayout from './PropertyItemLayout';
import { Input } from 'antd';

interface INamePropertyProps {
  name: string;
  onChangeName: (value: string) => void;
}

const NameProperty: React.FC<INamePropertyProps> = ({ name, onChangeName }) => {
  return (
    <PropertyItemLayout name={`组件名`}>
      <Input
        style={{ width: `100%` }}
        placeholder={`请输入组件名...`}
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeName(e.target.value)
        }
      ></Input>
    </PropertyItemLayout>
  );
};

export default NameProperty;
