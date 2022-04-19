import styles from "./Home.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useCollection } from "../../hooks/useCollection";

import { TransactionsList } from "./TransactionsList";
import { TransactionForm } from "./TransactionForm";

export function Home() {
  const { user } = useAuth();
  const { documents, error } = useCollection("transactions", ['uid', '==', user.uid], ['createdAt', 'desc']);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {!error && <TransactionsList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm userId={user.uid} />
      </div>
    </div>
  );
}
