import styles from './page.module.css'


export default function Home() {
  return (
    <main>
      <h1>Birthdays</h1>
      <div className={styles.searchContainer}>
        <input className={styles.search} type="text" placeholder="Search"/>
        <button className={styles.addButton}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
          </svg>
        </button>
      </div>
    </main>
  )
}
