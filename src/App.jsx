import React, { useEffect, useState } from "react";
import { fetchEmployees, submitSelectedEmployees } from "./services/api.js";
import { createEmployeeTree, toggleSelection } from "./utils.js";
import TreeNode from "./components/TreeNode/TreeNode.jsx";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    setLoading(true);
    fetchEmployees()
      .then((data) => {
        setEmployees(createEmployeeTree(data));
      })
      .finally(() => setLoading(false));
  }, []);

  const isChecked = (id) => selectedIds.has(id);

  const handleCheck = (id) => {
    const newSelectedIds = new Set(selectedIds);
    toggleSelection(id, newSelectedIds, [
      ...employees.validEmployees,
      ...employees.invalidEmployees,
    ]);
    setSelectedIds(newSelectedIds);
  };

  const handleSubmit = () => {
    const idsArray = Array.from(selectedIds);
    submitSelectedEmployees(idsArray).then((response) => {
      if (response.success) {
        console.log(
          "Employee IDs submitted successfully. IDs: " + response.data,
        );
      }
    });
  };
  if (loading) return <div>Loading...</div>;

  const allEmployees = [
    ...(employees.validEmployees?.map((emp) => ({ ...emp, valid: true })) ||
      []),
    ...(employees.invalidEmployees?.map((emp) => ({ ...emp, valid: false })) ||
      []),
  ];

  return (
    <div>
      <h1>Employee Tree</h1>
      {allEmployees.map((employee) => (
        <TreeNode
          key={employee.Id}
          employee={employee}
          isChecked={isChecked}
          handleCheck={handleCheck}
          valid={employee.valid}
        />
      ))}
      <button onClick={handleSubmit}>Submit Selected</button>
    </div>
  );
}

export default App;
