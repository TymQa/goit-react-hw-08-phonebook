import { ThreeCircles } from  'react-loader-spinner'
import styles from '../Loader/Loader.module.css'

export const Loader = () => {
  return <div className={styles.loader}>
    <ThreeCircles
  height="30"
  width="30"
  color="skyblue"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/>
  </div>
}

export const LoaderRoute = () => {
  return <div className={styles.loaderRouter}>
    <ThreeCircles
  height="80"
  width="80"
  color="skyblue"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/>
  </div>
}