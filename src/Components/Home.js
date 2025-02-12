import React from "react";
import { Helmet } from 'react-helmet';


const Home = () => {
    return (
        <div className="container">
            <Helmet>
            <title>World Flag Quiz - Home!</title>
            <meta name="description" content="Welcome to the Flag Quiz! Challenge yourself to identify flags from around the world." />
            <meta property="og:title" content="World Flag Quiz - Home!" />
            <meta property="og:description" content="Can you name all the flags? Start the quiz now and find out!" />

                  {/* Open Graph Tags */}
            <meta property="og:title" content="Flag Quiz - Knowledge Base!" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://funwithworldflags.com/og-image.jpg" />
            <meta property="og:url" content="https://funwithworldflags.com/" />
            <meta property="og:description" content="Can you name all the flags? Start the quiz now and find out!" />
            
            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@d_bheki" />
            <meta name="twitter:title" content="Flag Quiz - Knowledge Base!" />
            <meta name="twitter:description" content="Can you name all the flags? Start the quiz now and find out!" />
            <meta name="twitter:image" content="https://funwithworldflags.com/og-image.jpg" />
            
            {/* Canonical URL */}
            <link rel="canonical" href="https://funwithworldflags.com/" />
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