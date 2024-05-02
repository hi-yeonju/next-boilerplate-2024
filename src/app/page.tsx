import Link from "next/link";
import styles from './home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <ul>
        <li><Link href={'/input'}>input</Link></li>
        <li><Link href={'/color'}>color</Link></li>
      </ul>
    </div>
  )
}
