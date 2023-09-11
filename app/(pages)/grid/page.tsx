import styles from "./GridPage.module.css"

export default function GridPage() {
  const {wrapper} = styles;

  return (
    <div className="relative overflow-hidden m-auto">
      <h1>Hello Page</h1>
      <div id={styles.grid}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.one}>One</div>
        <div className={styles.two}>Two</div>
        <div className={styles.three}>Three</div>
        <div className={styles.four}>Four</div>
        <div className={styles.five}>Five</div>
        <div className={styles.six}>Six</div>
      </div>
    </div>
  );
}