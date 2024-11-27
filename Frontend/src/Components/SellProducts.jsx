import React, { useState } from 'react';
import './SellProducts.css';
import { Link } from 'react-router-dom';

function SellProducts() {

  const [choice,setChoice]=useState('null');


  function renderForm(){
    if(choice==='form1'){
      return <Form1/>
    }
    else if(choice==='form2'){
      return <Form2/>
    }
    else if (choice==='form3'){
      return <Form3/>
    }
    else{
      return null
    }
  }

  const Form1 = () => (
    <form>
      <h2>Form 1</h2>
      <input placeholder="Form 1 Input" />
    </form>
  );
  
  const Form2 = () => (
    <form>
      <h2>Form 2</h2>
      <input placeholder="Form 2 Input" />
    </form>
  );
  
  const Form3 = () => (
    <form>
      <h2>Form 3</h2>
      <input placeholder="Form 3 Input" />
    </form>
  );
  


  return (
     <>
     <div className='Container'>
         <div className='left'>
            <h2 style={{alignContent:"center", justifyContent:"center", fontWeight:"50",padding:"70px"}}>Add New Products in Stock</h2>
         </div>
         <div className='tright'>
            {choice !== "null" && (
            <button onClick={() => setChoice("null")} className="back_button">
             Back
            </button>
             )}
             {choice==='null' ? (
            <>
            <button className='status-buttons' onClick={()=>setChoice('form1')}>Only for Offline markets in Wholesale</button>
            <button className='status-buttons' onClick={()=>setChoice('form2')}>Only for E-commerce platforms in market price</button>
            <button className='status-buttons' onClick={()=>setChoice('form3')}>For both Offline and E-comm platforms</button>
            </>
             ):(
              <>
                <div>{renderForm()}</div>
              </>
             )
             }

         </div>
     </div>
     </>
  );
}

export default SellProducts;
