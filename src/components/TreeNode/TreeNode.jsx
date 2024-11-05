import React from "react";
import PropTypes from "prop-types";

function TreeNode({ employee, isChecked, handleCheck, valid }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked(employee.Id)}
        onChange={() => handleCheck(employee.Id)}
      />
      {employee.Title}: {employee.Name}{" "}
      {valid === false && (
        <span className="error-message">
          (The employee's manager does not exist)
        </span>
      )}
      {employee.children && employee.children.length > 0 && (
        <div style={{ marginLeft: "20px" }}>
          {employee.children.map((child) => (
            <TreeNode
              key={child.Id}
              employee={child}
              isChecked={isChecked}
              handleCheck={handleCheck}
              valid={valid}
            />
          ))}
        </div>
      )}
    </div>
  );
}

TreeNode.propTypes = {
  employee: PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Title: PropTypes.string,
    Name: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  isChecked: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default TreeNode;
