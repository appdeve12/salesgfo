import React from 'react'

const Child = React.memo(({handlesave}) => {
    console.log('childupdated')
  return (
    <>

    <button type="clcik" onClick={handlesave}>Child</button></>
  )
})

export default Child