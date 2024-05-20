import React from 'react'

const SelectButton = ({children,selected,onClick}) => {
  return (
    <span style={{
        border:"1px solid gold",
        borderRadius:5,
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        fontFamily:"Monserrat",
        cursor:"pointer",
        backgroundColor:selected?"gold":"",
        color:selected?"black":"",
        fontWeight:selected?700:500,
        width:"23%",
    }}
    onClick={onClick} className='selectbutton'
    > 
      {children}
    </span>
  )
}

export default SelectButton
