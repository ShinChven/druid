import { Helmet } from "react-helmet";
import { Link } from "react-router";
import { useData } from "../context";
import styles from "./About.module.less";

const About = () => {
  const data = useData() as any;
  return <div className={styles.container}>
    <Helmet>
      <title>{data?.title}</title>
      <meta name="description" content={data?.description} />
    </Helmet>
    <h1>About</h1>
    <div>{data?.description}</div>
    <div>{data?.message}</div>
    <p> <Link to="/">Home</Link> | <a href='/console'>Console</a></p>
    <a href='https://github.com/ShinChven/druid' target="_blank">GitHub</a>
  </div>
};

export default About;