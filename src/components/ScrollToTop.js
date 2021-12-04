import styles from './scrollToTop.module.css'

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

const BtnScrollToTop = () => {

  return (
    <div className={styles.btnContainer}>
      <button onClick={scrollToTop}>Up</button>
    </div>
  )
}

export default BtnScrollToTop;