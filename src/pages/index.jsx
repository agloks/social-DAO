import Link from 'next/link'
import classNames from 'classnames'
import styles from './index.module.css'

const Main = () => {
  return (
    <div className={classNames(styles.centerize_items, styles.flex)}>
          <h1>Social-DAO</h1>
    </div>
  )
}

export default function Index() {
  return (
    <div className={styles.all_layout}>
      <Main />
      <div className={classNames(styles.centerize_items, styles.flex)}>
        <span className={styles.margin_links}>
          <Link href='/proposal/new'>Criar Propostas</Link>
        </span>
        <span className={styles.margin_links}>
          <Link href='/proposal/list' className={styles.margin_links}>Ver Propostas</Link>
        </span>
      </div>
    </div>
  );
}
