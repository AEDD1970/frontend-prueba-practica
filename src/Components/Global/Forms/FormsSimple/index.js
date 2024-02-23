import React from "react";
import ButtonSimple from "../../Buttons/ButtonSimple";
import style from "./formSimple.module.scss";

export default function FormSimple({ handleSubmit, dataForm=[], error }) {
  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
        {dataForm.map((item) => (
          <div>
            <label>{item.name}</label>
            {item.option === "input" && (
              <input
                type={item.type}
                name={item.name}
                value={item.value}
                onChange={item.onChange()}
              />
            )}
            {item.option === "select" && (
              <select
                type={item.type}
                name={item.name}
                value={item.value}
                onChange={item.onChange()}
              >
                <option value="" disabled selected>Select Option</option>
                {item.optionsSelect.length && item.optionsSelect.map(item => 
                    <option value={item.value}>{item.label}</option>
                    ) 
                    
                }
              </select>
            )}
          </div>
        ))}
        {error && <p className={style.errorText}>{error}</p>}
        <ButtonSimple type="submit">Submit</ButtonSimple>
      </form>
    </div>
  );
}
