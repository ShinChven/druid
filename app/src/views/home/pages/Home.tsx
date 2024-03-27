import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { useData } from "../context"
import styles from "./Home.module.less"

const Home: React.FC = () => {
  const data = useData() as any;


  // Safari Compatibility
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(isSafari);
  }, []);

  const containerClass = [styles.container];
  if (isSafari) {
    containerClass.push(styles.safari_container);
  }


  return <div className={containerClass.join(' ')}>
    <Helmet>
      <title>{data?.title}</title>
      <meta name="description" content={data?.description} />
    </Helmet>
    <h1>Hello World</h1>
    <div>{data?.description}</div>
    <div>{data?.message}</div>
    <p> <Link to="/about">About</Link> | <a href='/console'>Console</a></p>
    <a href='https://github.com/ShinChven/druid' target="_blank">GitHub</a>
  </div>
}

export default Home;