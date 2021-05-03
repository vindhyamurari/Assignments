import React, { ReactElement } from 'react'

interface Props {
    labelName:string,
    inputType:string
}

export default function LabelAndInput({labelName,inputType}: Props): ReactElement {
    return (
        <>
            <label className="label">{labelName}</label>
            <input className="input" type={inputType} ></input><br/>
        </>
    )
}
