interface IComponentClass {
  id: number;
  tag: string;
  title: string;
  type: React.FC<IDragProps>;
  img: string;
}

interface IZJComponent {
  id: string;
  type: React.FC<IDragProps>;
  size: { width: number; height: number };
  isSelected: false;
}

declare var IComponentClass: IComponentClass;
declare var IZJComponent: IZJComponent;
