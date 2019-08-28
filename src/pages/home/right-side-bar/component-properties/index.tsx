import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  changeZJComponentCustomProperty,
  changeZJComponentName,
} from '../../../../store/zj-components/actions';
import { ChangeZJComponentCustomProperty } from '../../../../store/zj-components/types';
import initPerportyItem from '../../../../zj-component-perproty-item';
import NameProperty from '../../../../zj-component-perproty-item/NameProperty';

type IComponentPropertiesProps = {
  component: IZJComponent;
  changeCustomProperty: (payload: ChangeZJComponentCustomProperty) => void;
  changeName: (id: string, name: string) => void;
};

const ComponentProperties: React.FC<IComponentPropertiesProps> = ({
  component,
  changeName,
  changeCustomProperty,
}) => {
  const onChangeCustomProperty = (property: string, value: number | string) => {
    changeCustomProperty({ id: component.id, value, property });
  };
  const onChangeName = (name: string) => {
    changeName(component.id, name);
  };

  return component ? (
    <div>
      <h4 style={{ marginTop: 8 }}>通用属性：</h4>
      <div>
        <NameProperty name={component.name} onChangeName={onChangeName}></NameProperty>
      </div>
      <h4 style={{ marginTop: 8 }}>私有属性：</h4>
      <div>
        {component.customPerproties.length !== 0 ? (
          component.customPerproties.map(perproty =>
            initPerportyItem(
              perproty,
              component[perproty.property],
              onChangeCustomProperty
            )
          )
        ) : (
          <div>暂无私有属性</div>
        )}
      </div>
    </div>
  ) : (
    <div>请添加组件</div>
  );
};

const mapStateToProps = (state: any) => ({
  component: state.components.filter((c: any) => c.isSelected)[0] || undefined,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeCustomProperty: ({ id, property, value }: ChangeZJComponentCustomProperty) =>
    dispatch(changeZJComponentCustomProperty({ id, property, value })),
  changeName: (id: string, name: string) => dispatch(changeZJComponentName({ id, name })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentProperties);
