import { ChallengsProvider } from '../contexts/ChallengContext';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {

  return(
      <ChallengsProvider>
        <Component {...pageProps} />
      </ChallengsProvider>
    ); 
}

export default MyApp
