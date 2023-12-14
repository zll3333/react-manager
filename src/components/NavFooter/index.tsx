import styles from "./index.module.less"

const NavFooter = () => {
  return (
    <div className={styles.footer}>
      <span>个人项目开发</span>
      <span className={styles.gutter}>|</span>
      <span>React18+TS 后台管理通用系统</span>
    </div>
  )
}

export default NavFooter