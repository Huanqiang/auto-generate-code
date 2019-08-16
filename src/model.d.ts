interface IComponentClass {
  id: number;
  tag: string;
  title: string;
  type: React.FC<IDragProps>;
  img: string;
}

interface IZJComponent {
  id: string;
  ref: React.RefObject<any>;
  type: React.FC<IDragProps>;
}

declare var IComponentClass: IComponentClass;
declare var IZJComponent: IZJComponent;
