import React, { useEffect, useReducer } from "react";

const initialState = {
  title: "",
  description: "",
  status: "Pending"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_TASK":
      return { ...state, ...action.payload };
    case "Set_title":
      return { ...state, title: action.payload };
    case "Set_description":
      return { ...state, description: action.payload };
    case "Set_Status":
      return { ...state, status: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const AddEdit = ({ onSubmit, taskData = null }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (taskData) {
      dispatch({ type: "LOAD_TASK", payload: taskData });
    }
  }, [taskData]);

  const handleSubmit = () => {
    const payload = { ...state, createdAt: taskData?.createdAt || new Date() };
    onSubmit(payload);
    dispatch({ type: "RESET" });
  }; 

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Title"
        value={state.title}
        onChange={e => dispatch({ type: "Set_title", payload: e.target.value })}
      /> 
      <input
        type="text"
        placeholder="Enter Description"
        value={state.description}
        onChange={e => dispatch({ type: "Set_description", payload: e.target.value })}
      />
      <select
        value={state.status}
        onChange={e => dispatch({ type: "Set_Status", payload: e.target.value })}
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddEdit;
