import styles from "./index.module.less"

export default function Welcome () {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>慕慕货运后台管理系统</div>
        <div className={styles.desc}>技术栈：React18+ReactRouter6+Antd+Typescript+vite</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
