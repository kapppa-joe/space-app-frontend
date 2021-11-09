import React from 'react';

const Page404 = () => {
    return (
        <div>
            <h5 className="title is-size-3 has-text-white">404: Houston, we have a problem!</h5>
            <p>It looks like this page doesn't exist</p>
            <img className="error-img" alt="missing astronaut" src="/assets/2d-images/lost_in_space.png"/>
        </div>
    );
};

export default Page404;