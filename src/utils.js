export const createEmployeeTree = (employees) => {
  const invalidEmployees = employees.filter(
    (e) => e.ManagerId !== null && !employees.some((x) => x.Id === e.ManagerId),
  );
  const validEmployees = employees.filter(
    (e) => !invalidEmployees.some((invalid) => invalid.Id === e.Id),
  );

  const cyclicDependencies = detectCycles(validEmployees);
  const visited = new Set();

  function detectCycles(employees) {
    const cycles = new Set();

    const dfs = (employee, ancestors = new Set()) => {
      if (ancestors.has(employee.Id)) {
        ancestors.forEach((id) => cycles.add(id));
        return;
      }

      ancestors.add(employee.Id);
      const children = employees.filter((e) => e.ManagerId === employee.Id);
      children.forEach((child) => {
        if (!cycles.has(child.Id)) {
          dfs(child, new Set(ancestors));
        }
      });
    };
    employees.forEach((emp) => {
      if (!cycles.has(emp.Id)) {
        dfs(emp);
      }
    });

    return Array.from(cycles);
  }

  const buildTree = (employee) => {
    if (cyclicDependencies.includes(employee.Id) || visited.has(employee.Id)) {
      return null;
    }

    visited.add(employee.Id);

    const children = validEmployees.filter((e) => e.ManagerId === employee.Id);
    employee.children = children.map(buildTree).filter(Boolean);

    return employee;
  };

  const trees = validEmployees
    .filter((e) => e.ManagerId === null || !visited.has(e.Id))
    .map(buildTree)
    .filter(Boolean);

  validEmployees
    .filter((e) => !visited.has(e.Id))
    .forEach((employee) => {
      const tree = buildTree(employee);
      if (tree) trees.push(tree);
    });

  return {
    validEmployees: trees,
    invalidEmployees,
    cyclicDependencies,
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
