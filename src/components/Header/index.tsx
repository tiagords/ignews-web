import { SignInButton } from "../SignInButton";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a title="ig news" href="/">
          <img src="/images/logo.svg" alt="ig news" />
        </a>
        <nav>
          <a title="Home" className={styles.active} href="/">
            Home
          </a>
          <a title="Posts" href="/posts">
            Posts
          </a>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
