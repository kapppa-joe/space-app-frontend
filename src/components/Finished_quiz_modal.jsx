import React from 'react';
import Quiz from './Quiz';
import { Link } from 'react-router-dom';

const FinishedQuizModal = ({ hasFinishedBadge, hasFinishedQuiz, setHasFinishedQuiz, space_object }) => {
    
    const finishedRefresh = () => {
        window.location.reload(); 
    }

    const hasBadgeTitle = "You've completed the quiz!"

    const noBadgeTitle = "Nice Try!"

    const hasBadgeBody = <> <p>Congratulations! You have completed the quiz and earned a badge!</p>
                            <p>If you would like to see your new shiny badge click on the link below</p>
                            <Link to="/mission-control">Mission Control</Link>
                            <p>Or you can return to the planet viewer to continue your mission!</p> </>

    const noBadgeBody = <> <p>Unfortunately, you haven't got a badge this time</p>
                           <p>Not to worry! Click on the link below, look at the facts, and you can answer the questions again!</p>
                           <Link to={`/space/${space_object}`} onClick={() => finishedRefresh()}>Back to the planets!</Link></>


    return (
        <div class={`modal ${hasFinishedQuiz ? "is-active" : ""}`}>
        <div class="modal-background" onClick={() => {setHasFinishedQuiz(false)}}></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{hasFinishedBadge ? hasBadgeTitle : noBadgeTitle}</p>
        </header>
        <section class="modal-card-body">
            {hasFinishedBadge ? hasBadgeBody : noBadgeBody}
        </section>
        <footer className="modal-card-foot">
            <button className="button" onClick={() => {setHasFinishedQuiz(false)}}>Close</button>
        </footer>
        <button className="modal-close is-large" aria-label="close" onClick={() => {setHasFinishedQuiz(false)}}></button>
        </div>
    </div>
    );
};

export default FinishedQuizModal;