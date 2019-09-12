export const insertComponent: (
  components: IZJComponent[],
  parentId: string,
  child: IZJComponent
) => IZJComponent[] = (
  components: IZJComponent[],
  parentId: string,
  child: IZJComponent
) => {
  const hasParentComponent = components.filter(comp => comp.id === parentId);

  if (hasParentComponent.length === 0) {
    return components.map(comp =>
      comp.hasChildren
        ? { ...comp, children: insertComponent(comp.children, parentId, child) }
        : comp
    );
  } else {
    return components.map(comp =>
      comp.id === parentId
        ? {
            ...comp,
            children: [...comp.children, child],
          }
        : comp
    );
  }
};

export const deleteComponent: (
  components: IZJComponent[],
  id: string
) => IZJComponent[] = (components: IZJComponent[], id: string) => {
  const hasDeleteComponent = components.filter(comp => comp.id === id);

  if (hasDeleteComponent.length === 0) {
    return components.map(comp =>
      comp.hasChildren ? { ...comp, children: deleteComponent(comp.children, id) } : comp
    );
  } else {
    return components.filter(comp => comp.id !== id);
  }
};

export const findComponent: (
  components: IZJComponent[],
  id: string
) => IZJComponent | undefined = (components: IZJComponent[], id: string) => {
  for (const comp of components) {
    if (comp.id === id) {
      return { ...comp };
    } else {
      const c = findComponent(comp.children, id);
      if (c) {
        return c;
      }
    }
  }
};

export const changeComponentInfo = (
  component: IZJComponent,
  option: { [index: string]: any }
) => {
  const newComponent = { ...component };
  for (const key in option) {
    if (newComponent.hasOwnProperty(key)) {
      newComponent[key] = option[key];
    }
  }
  return newComponent;
};

export const resetChildPositionWhenInsert = (
  child: IZJComponent,
  parentId: string,
  parentPosition: { left: number; top: number }
) => {
  child.parent = parentId;
  const left = child.position.left - parentPosition.left;
  const top = child.position.top - parentPosition.top;

  return changeComponentInfo(child, {
    parent: parentId,
    position: { left: left < 0 ? 0 : left, top: top < 0 ? 0 : top },
  });
};
