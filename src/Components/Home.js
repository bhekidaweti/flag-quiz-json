import React from "react";
import { Helmet } from 'react-helmet';


const Home = () => {
    return (
        <div className="container" style={{backgroundColor: "bisque"}}>
            <Helmet>
            <title>World Flag Quiz - Home!</title>
            <meta name="description" content="Welcome to the Flag Quiz! Challenge yourself to identify flags from around the world." />
            <meta property="og:title" content="World Flag Quiz - Home!" />
            <meta property="og:description" content="Can you name all the flags? Start the quiz now and find out!" />
          </Helmet>
                    <section className="welcome">
                        Welcome to the flags quiz game where you can test your world flags knowledge and also 
                        learn about national flags of different countries or nations.<br></br>
                        You can play the quiz by clicking the "play" icon. <br></br>
                        To view the list of country flags you can click on the "list" icon. 
                    </section>
        </div>
    )
}

export default Home;