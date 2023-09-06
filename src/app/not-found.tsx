import styles from './not-found.module.css';

export default async function Home() {
  return (
    <main>
      <div className={styles.headerContainer}>
        <strong>404</strong> - Page not found
      </div>
    </main>
  );
}
