declare interface IComponentClass {
  id: number;
  tag: string;
  title: string;
  type: React.FC<IDragProps>;
  img: string;
  hasChildren?: boolean;
  // children?: React.ReactNode;
  customPerproties?: IZJComponentCustomPropertyCategory[];
}

declare interface IZJComponent {
  id: string;
  name: string;
  type: React.FC<IDragProps>;
  size: { width: number; height: number };
  position: { top: number; left: number };
  isSelected: false;
  parent: string;
  children: IZJComponent[];
  hasChildren: boolean;
  config: {
    [index: string]: string | number | boolean | any;
  };
  customPerproties: IZJComponentCustomPropertyCategory[];
  [index: string]: any;
}

declare interface IMultiSelectedComponents {
  id: string;
  componentIds: string[];
}

declare interface IZJComponentCustomPropertyCategory {
  property: string;
  name: string;
  categoty: string;
  defaultValue?: string | number | any;
}

// declare var IComponentClass: IComponentClass;
// declare var IZJComponent: IZJComponent;
// declare var IZJComponentCustomPropertyCategory: IZJComponentCustomPropertyCategory;
