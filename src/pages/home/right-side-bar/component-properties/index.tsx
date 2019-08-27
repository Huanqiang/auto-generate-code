import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { changeZJComponentCustomProperty } from '../../../../store/zj-components/actions';
import { ChangeZJComponentCustomProperty } from '../../../../store/zj-components/types';
import initPerportyItem from '../../../../zj-component-perproty-item';

type IComponentPropertiesProps = {
  component: IZJComponent;
  changeCustomProperty: (payload: ChangeZJComponentCustomProperty) => void;
};

const ComponentProperties: React.FC<IComponentPropertiesProps> = ({
  component,
  changeCustomProperty,
}) => {
  const onChange = (property: string, value: number | string) => {
    console.log(value, typeof value);
    changeCustomProperty({ id: component.id, value, property });
  };
  return component ? (
    <div>
      <h4>通用属性：</h4>
      <div>这里是通用属性</div>
      <h4>私有属性：</h4>
      <div>
        {component.customPerproties.length !== 0 ? (
          component.customPerproties.map(perproty =>
            initPerportyItem(perproty, component[perproty.property], onChange)
          )
        ) : (
          <div>暂无私有属性</div>
        )}
      </div>
    </div>
  ) : (
    <div>请选择组件</div>
  );
};

const mapStateToProps = (state: any) => ({
  component: state.components.filter((c: any) => c.isSelected)[0] || undefined,
});

const mapDispatchToProps = (disaptch: Dispatch) => ({
  changeCustomProperty: ({ id, property, value }: ChangeZJComponentCustomProperty) =>
    disaptch(changeZJComponentCustomProperty({ id, property, value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentProperties);
