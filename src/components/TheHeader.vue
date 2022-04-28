<script setup></script>

<template>
  <header>
    <nav class="nav-top">
      <span style="font-weight: bold; margin-right: 1.5rem"
        >Call Us at (855) 372-3069</span
      >
      <ul>
        <li>
          <a
            href="https://nickcolamarinoseller.carrot.com/get-a-cash-offer-today/"
            >Get Your Cash Offer</a
          >
        </li>
        <li>
          <a href="https://nickcolamarinoseller.carrot.com/our-company/"
            >About Us</a
          >
        </li>
        <li>
          <a href="https://nickcolamarinoseller.carrot.com/contact-us/"
            >Contact Us</a
          >
        </li>
      </ul>
    </nav>
    <div class="logo">
      <img
        src="@/assets/ffb-black-and-white.gif"
        alt="Fair Fast Buyer's Logo"
      />
    </div>
    <nav class="nav-bottom">
      <ul>
        <li>
          <a
            href="https://nickcolamarinoseller.carrot.com/get-a-cash-offer-today/"
            ><span style="font-weight: bold"
              >Sell Your House The Easy Way</span
            ></a
          >
        </li>
        <li>
          <a href="https://nickcolamarinoseller.carrot.com/how-we-buy-houses/"
            >How It Works</a
          >
        </li>
        <li>
          <a href="https://nickcolamarinoseller.carrot.com/compare/">Compare</a>
        </li>
        <li>
          <a href="https://nickcolamarinoseller.carrot.com/reviews/">Reviews</a>
        </li>
        <li><a href="https://nickcolamarinoseller.carrot.com/faq/">FAQ</a></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
header {
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: white;
    ul {
      display: flex;
      padding: 0;
      height: 100%;
      li {
        display: flex;
        align-items: center;
        list-style: none;
        height: 100%;

        a {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0.5rem;
          color: inherit;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .nav-top {
    color: white;
    background-color: var(--nav-top-background-color);
    font-size: 0.85rem;
  }

  .logo {
    text-align: center;
  }

  .nav-bottom {
    color: white;
    background-color: var(--nav-bottom-background-color);
    font-size: 1.2rem;

    a {
      &:hover {
        background-color: var(--nav-bottom-background-color-hover);
        text-decoration: none;
      }
    }
  }
}

@media (min-width: 1024px) {
}
</style>
