import styles from './page.module.css'
import { Birthday } from "@/lib/interfaces/birthday"

export default async function Home() {
  const birthdays: Birthday[] = await fetch(process.env.URL + '/api').then(res => res.json());

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

      {birthdays.map((birthday) => {
        return <div className={styles.birthday}>
          <div>
            <div className={styles.birthdayName}>{birthday.name}</div>
            <div>[age] year</div>
          </div>
          <div>
            [daysLeft] days
          </div>
        </div>
      })}

    </main>
  )
}
