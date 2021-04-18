import { query as q } from "faunadb";
import { faunadb } from "../../../services/faunadb";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscription_id: string,
  customer_id: string
) {
  const userRef = await faunadb.query(
    q.Select(
      "ref",
      q.Get(q.Match(q.Index("user_by_stripe_customer_id"), customer_id))
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscription_id);
  const subscriptionData = {
    id: subscription.id,
    user_id: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  await faunadb.query(
    q.Create(q.Collection("subscriptions"), {
      data: subscriptionData,
    })
  );
}
