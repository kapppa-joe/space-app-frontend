import React, {useState} from 'react';
import "bulma-pageloader";
import Facts from "./Facts"; 
import Quiz from "./Quiz"; 

const Sidebar = ({content, space_object}) => {
    const [isFactsActive, setIsFactsActive] = useState(false); 
    const [isQuizActive, setIsQuizActive] = useState(false); 


if (content === "facts") {
    return (
        <>
        <button onClick={() => {setIsFactsActive(true)}}>Trivia</button>
        <div className={`pageloader is-left-to-right ${isFactsActive ? "is-active" : ""}`}>
            <Facts space_object={space_object} />
            <button class="modal-close is-large" aria-label="close" onClick={() => {setIsFactsActive(false)}}></button>
        </div>
       
        </>

    )
} else {
    return (
    <>
    <button onClick={() => {setIsQuizActive(true)}}>Quiz</button>
    <div className={`pageloader is-right-to-left ${isQuizActive ? "is-active" : ""}`}>
        <Quiz space_object={space_object} />
        <button className="modal-close is-large" aria-label="close" onClick={() => {setIsQuizActive(false)}}></button>
    </div>
    </>
    )
}

};

export default Sidebar;