import { useFirestore } from "../../hooks/useFirestore";
import styles from "./Home.module.css";

export function TransactionsList({ transactions }) {
  const { deleteDocument } = useFirestore('transactions')

  return (
    <ul className={styles.transactions}>
      {transactions &&
        transactions.map((transaction) => (
          <li key={transaction.id}>
            <p className={styles.name}>{transaction.name}</p>
            <p className={styles.amount}>$ {transaction.amount}</p>
            <button onClick={() => deleteDocument(transaction.id)}>x</button>
          </li>
        ))}
    </ul>
  );
}
