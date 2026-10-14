import './Section.css'

export default function Section({children, text}) {

    return <>
        <div className='section'>
           {text && <h1>{text}</h1>}
           {children}
        </div>
    </>
}