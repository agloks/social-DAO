import Link from 'next/link'
import classNames from 'classnames'
import styles from './index.module.css'

const Main = () => {
  return (
    <div className={styles.flex}>
          <h1>BOOP 1</h1>
          <h1>BOOP 2</h1>
          <h1>BOOP 3</h1>
    </div>
  )
}

export default function Index() {
  return (
    <div className={styles.all_layout}>
      <Main />
      <div className={classNames(styles.centerize_items, styles.flex)}>
        <Link href='/proposal/new'>Criar Propostas</Link>
        <Link href='/proposal/list'>Ver Propostas</Link>
      </div>
    </div>
  );
}
