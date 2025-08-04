import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loader from './Loader';

const Summary = ({ file }) => {
    const apikey = import.meta.env.VITE_API_KEY
    console.log("apikey : " , apikey)
    const genAI = new GoogleGenerativeAI(apikey);
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
    const [summary, setSummary] = useState("");
    const [status , setStatus] = useState("idle");
    console.log(file)
    async function getSummary() {
        setStatus('loading')
        try {
            const result = await model.generateContent([
            {
                inlineData: {
                    data: file.file,
                    mimeType: file.type
                }
            },
            `
                Summarize the document
                in one short paragraph (less than 100 words)
                Use just plain text with no markdowns or html tags
            `
        ])

        console.log(result.response.text());
        setStatus('success');
        setSummary(result.response.text())
        } catch (error) {
            setStatus('error')
        }
        
    }

    useEffect(()=>{
        if(status === 'idle'){
            getSummary();
        }
    } , [status])
    return (
        <section className='summary'>
            <img src={file.imageUrl} alt='Preview image'/>
            <h1>Summary</h1>
            {
                status === 'loading' ?
                <Loader/>:
                status === 'success' ?
                <p>{summary}</p> :
                status === 'error' ?
                <p>Error in getting the summary</p>:
                ''
            }
            {/* <Loader/> */}
            <p>{summary}</p>
        </section>
    )
}

export default Summary