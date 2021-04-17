import Head from "next/head";
import { GetStaticProps } from "next";
import { SubscribeButton } from "../components/SubscribeButton";

import styles from "./home.module.scss";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceID: string;
    amount: number;
    metadata: {
      description: string;
    };
  };
}

export default function Home({ product }: HomeProps) {
  const description = product.metadata.description.replace(
    "React",
    "<span>React</span>"
  );

  return (
    <>
      <Head>
        <title>Home - ig.news</title>
      </Head>

      <main className={styles.content}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1 dangerouslySetInnerHTML={{ __html: description }}></h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceID={product.priceID} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding..." />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1IhGx5BmTb8nAUsTGEarlOvE", {
    expand: ["product"],
  });

  const metadata = price.product;

  const product = {
    priceID: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
    metadata,
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
