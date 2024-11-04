import React from "react";

const TreeNode = ({ employee, valid }) => {
  return (
    <div style={{ marginLeft: 20 }}>
      <label>
        <input type="checkbox" onChange={() => {}} />
        {employee.Title}: {employee.Name}
      </label>
      {employee?.children?.length > 0 && (
        <div style={{ marginLeft: 20 }}>
          {employee.children.map((child) => (
            <TreeNode key={child.Id} employee={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
