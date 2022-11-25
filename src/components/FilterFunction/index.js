import { useEffect, useState } from "react"
import "./style.scss"


function FilterFunction(props) {
    return (
        <div className="RadioButtonsHolder">
            <input className="RadioButton" type="radio" name="button" onInput={
                (event) => {
                    const sorted = props.searchData.sort(props.method)
                    console.log(sorted)
                    props.setSearchData([...sorted, ...[]])
                    console.log(props.searchData)
                }
            }  defaultChecked={props.isChecked}></input>
            <label className="RadioButtonLabel" for="button">{props.title}</label>
        </div>
    )
}

export default FilterFunction
