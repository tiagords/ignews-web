import { useSession, signIn } from "next-auth/client";
import { api } from "../../services/api";
import { getStripeJS } from "../../services/stripe.js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceID: string;
}

export function SubscribeButton({ priceID }: SubscribeButtonProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionID } = response.data;

      const stripe = await getStripeJS();

      await stripe.redirectToCheckout({ sessionId: sessionID });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <button
      className={styles.subscribeButton}
      onClick={handleSubscribe}
      type="button"
    >
      Subscribe now
    </button>
  );
}
