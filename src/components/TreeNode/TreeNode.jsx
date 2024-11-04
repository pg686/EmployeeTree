import React from "react";

const TreeNode = ({ employee, isChecked, handleCheck, valid }) => {
  const handleChange = () => handleCheck(employee.Id);

  return (
    <div style={{ marginLeft: 20 }}>
      <label>
        <input
          type="checkbox"
          checked={isChecked(employee.Id)}
          onChange={handleChange}
        />
        {employee.Title}: {employee.Name}
      </label>
      {employee?.children?.length > 0 && (
        <div style={{ marginLeft: 20 }}>
          {employee.children.map((child) => (
            <TreeNode
              key={child.Id}
              employee={child}
              isChecked={isChecked}
              handleCheck={handleCheck}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
