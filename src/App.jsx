import { useState } from "react"
import FileUpload from "./components/FileUpload"
import Header from "./components/Header"
import Summary from "./components/Summary";

function App() {

  const [uploadedFile , setUploadedFile] = useState(null);


  

  return (
    <>
    <main className="container">
      <Header/>
      {
        uploadedFile ? <Summary file = {uploadedFile}/> : <FileUpload setFile = {setUploadedFile}/>
      }
    </main>
    </>
  )
}

export default App
