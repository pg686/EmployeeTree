export const createEmployeeTree = (employees) => {
  const invalidEmployees = employees.filter(
    (e) =>
      e.ManagerId !== null && !employees.map((x) => x.Id).includes(e.ManagerId),
  );

  const buildTree = (employee) => {
    const children = employees.filter((e) => e.ManagerId === employee.Id);
    employee.children = children.length ? children.map(buildTree) : [];
    return employee;
  };

  const rootEmployees = employees.filter((e) => e.ManagerId === null);
  const validEmployees = rootEmployees.map(buildTree);
  return {
    validEmployees,
    invalidEmployees,
  };
};

export const findEmployeeById = (id, nodes) => {
  for (const node of nodes) {
    if (node.Id === id) {
      return node;
    }
    const found = findEmployeeById(id, node.children || []);
    if (found) {
      return found;
    }
  }
  return null;
};

export const toggleSelection = (id, selectedSet, nodes) => {
  const toggle = !selectedSet.has(id);
  const applySelection = (empId) =>
    toggle ? selectedSet.add(empId) : selectedSet.delete(empId);

  const selectChildren = (employee) => {
    applySelection(employee.Id);
    employee.children?.forEach(selectChildren);
  };

  const selectUpward = (employee) => {
    applySelection(employee.Id);
    if (employee.ManagerId) {
      const parent = findEmployeeById(employee.ManagerId, nodes);
      if (
        parent &&
        parent.children.every((child) => selectedSet.has(child.Id))
      ) {
        selectUpward(parent);
      }
    }
  };

  const deselectUpward = (employee) => {
    applySelection(employee.Id);
    if (employee.ManagerId) {
      const parent = findEmployeeById(employee.ManagerId, nodes);
      if (
        parent &&
        parent.children.every((child) => !selectedSet.has(child.Id))
      ) {
        deselectUpward(parent);
      }
    }
  };

  const employee = findEmployeeById(id, nodes);
  if (employee) {
    selectChildren(employee);
    toggle ? selectUpward(employee) : deselectUpward(employee);
  }
};
