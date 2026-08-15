(function () {

  function addFooter() {

    if (document.querySelector(".mystore-shared-footer")) {
      return;
    }

    const footer = document.createElement("footer");

    footer.className = "mystore-shared-footer";

    footer.innerHTML = `
      <div class="mystore-shared-footer-inner">

        <div class="footer-brand">
          <h3>MyStore</h3>
          <p>
            Your trusted online shopping destination for quality
            products, great prices and reliable delivery.
          </p>
        </div>

        <div>
          <h4>About</h4>
          <a href="/ecom/index.html">Home</a>
          <a href="/ecom/index.html">Products</a>
          <a href="/ecom/index.html">Categories</a>
        </div>

        <div>
          <h4>Customer Policy</h4>
          <a href="#">Returns</a>
          <a href="#">Shipping</a>
          <a href="#">Cancellation</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>

        <div>
          <h4>Help</h4>
          <a href="#">Customer Care</a>
          <a href="#">Payments</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </div>

      </div>

      <div class="mystore-shared-footer-bottom">
        <span>© 2026 MyStore. All rights reserved.</span>
      </div>
    `;

    document.body.appendChild(footer);
  }


  const style = document.createElement("style");

  style.textContent = `

    .mystore-shared-footer {
      display: block !important;
      width: 100%;
      box-sizing: border-box;
      clear: both;
      margin-top: 50px;
      padding: 42px 5% 20px;
      background: #111;
      color: #fff;
      position: relative;
      z-index: 999999;
    }

    .mystore-shared-footer-inner {
      width: 100%;
      max-width: 1400px;
      margin: auto;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 35px;
    }

    .mystore-shared-footer h3 {
      margin: 0 0 14px;
      color: #fff;
      font-size: 22px;
    }

    .mystore-shared-footer h4 {
      margin: 0 0 13px;
      color: #fff;
      font-size: 13px;
    }

    .mystore-shared-footer p,
    .mystore-shared-footer a {
      color: #aaa;
      font-size: 12px;
      line-height: 1.8;
    }

    .mystore-shared-footer a {
      display: block;
      text-decoration: none;
      margin-bottom: 5px;
    }

    .mystore-shared-footer a:hover {
      color: #fff;
    }

    .mystore-shared-footer-bottom {
      width: 100%;
      max-width: 1400px;
      margin: 30px auto 0;
      padding-top: 17px;
      border-top: 1px solid #292929;
      display: flex;
      justify-content: center;
      color: #888;
      font-size: 11px;
      text-align: center;
    }


    /* MOBILE */

    @media (max-width: 700px) {

      .mystore-shared-footer {
        display: block !important;
        margin-top: 25px;
        padding: 30px 18px 15px;
        border-radius: 16px 16px 0 0;
      }

      .mystore-shared-footer-inner {
        grid-template-columns: 1fr 1fr;
        gap: 25px 18px;
      }

      .footer-brand {
        grid-column: 1 / -1;
      }

      .mystore-shared-footer h3 {
        font-size: 20px;
      }

      .mystore-shared-footer p,
      .mystore-shared-footer a {
        font-size: 11px;
      }

      .mystore-shared-footer-bottom {
        font-size: 10px;
      }
    }

  `;

  document.head.appendChild(style);


  /* DOM ready */

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      addFooter
    );

  } else {

    addFooter();

  }

})();
