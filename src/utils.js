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
