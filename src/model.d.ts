declare interface IComponentClass {
  id: number;
  tag: string;
  title: string;
  type: React.FC<IDragProps>;
  img: string;
  customPerproties?: IZJComponentCustomPropertyCategory[];
}

declare interface IZJComponent {
  id: string;
  name: string;
  type: React.FC<IDragProps>;
  size: { width: number; height: number };
  isSelected: false;
  customPerproties: IZJComponentCustomPropertyCategory[];
  [index: string]: string | number | boolean | any;
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
