import React from 'react'
import {Buffer} from 'buffer'

const FileUpload = ({setFile}) => {

    async function handleFileUpload(e){
        const fileUpload =await e.target.files[0].arrayBuffer();
        const file = {
            type : e.target.files[0].type , 
            file : Buffer.from(fileUpload).toString("base64"),
            imageUrl : e.target.files[0].type.includes("pdf") ? "/document-icon.png":URL.createObjectURL(e.target.files[0])
        }
        setFile(file)
    }
  return (
    <section>
        <h1>Get Started</h1>
        <input 
        type="file"
        accept='.pdf , .jpg , .jpeg , .png'
        onChange={handleFileUpload}
        />
    </section>
  )
}

export default FileUpload