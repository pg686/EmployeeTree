import React, { useEffect, useState } from "react";
import { fetchEmployees } from "./services/api.js";
import { createEmployeeTree } from "./utils.js";
import TreeNode from "./components/TreeNode/TreeNode.jsx";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchEmployees()
      .then((data) => {
        setEmployees(createEmployeeTree(data));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h1>Employee Tree</h1>
      {employees?.validEmployees?.map((root) => {
        return <TreeNode key={root.Id} employee={root} valid={true} />;
      })}
      {employees?.invalidEmployees?.length > 0 &&
        employees.invalidEmployees.map((employee) => {
          return (
            <TreeNode key={employee.Id} employee={employee} valid={false} />
          );
        })}
      <button onClick={() => {}}>Submit Selected</button>
    </div>
  );
}
export default App;
