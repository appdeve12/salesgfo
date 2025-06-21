import React, { useRef } from 'react';

const Sidebar = () => {
  const usename = useRef();

  const giveUsername = () => {
    console.log(usename.current.value);
  };

  return (
    <div>
      <input type="text" id="fname" name="fname" ref={usename} />
      <input type="button" value="Click me" onClick={giveUsername} />
    </div>
  );
};

export default Sidebar;
