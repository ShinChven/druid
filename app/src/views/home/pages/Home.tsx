import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { useData } from "../context"
import styles from "./Home.module.less"

const Home: React.FC = () => {
  const data = useData() as any;
  return <div className={styles.container}>
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