import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceID: string;
}

export function SubscribeButton({ priceID }: SubscribeButtonProps) {
  return (
    <button className={styles.subscribeButton} type="button">
      Subscribe now
    </button>
  );
}
