interface IComponentClass {
  id: number;
  tag: string;
  title: string;
  type: React.FC<IDragProps>;
  img: string;
}

declare var IComponentClass: IComponentClass;
