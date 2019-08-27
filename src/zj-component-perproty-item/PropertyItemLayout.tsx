import React from 'react';

import './index.css';

type IPropertyItemLayoutProps = {
  name: string;
};

const PropertyItemLayout: React.FC<IPropertyItemLayoutProps> = ({ name, children }) => (
  <div className="zjcomponent-custom-property-item">
    <div className="zjcomponent-custom-property-item-left">
      <span>{name}：</span>
    </div>
    <div className="zjcomponent-custom-property-item-right">{children}</div>
  </div>
);

export default PropertyItemLayout;
