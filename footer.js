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

        <div class="footer-column">
          <h4>About</h4>

          <a href="/ecom/index.html">Home</a>
          <a href="/ecom/index.html">Products</a>
          <a href="/ecom/index.html">Categories</a>
        </div>

        <div class="footer-column">
          <h4>Customer Policy</h4>

          <a href="#">Returns</a>
          <a href="#">Shipping</a>
          <a href="#">Cancellation</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>

        <div class="footer-column">
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


  /* =========================
     FOOTER STYLE
     ========================= */

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

      margin: 0 auto;

      display: grid;

      grid-template-columns: 2fr 1fr 1fr 1fr;

      gap: 35px;

    }


    .mystore-shared-footer h3 {

      margin: 0 0 14px;

      color: #fff;

      font-size: 22px;

      line-height: 1.2;

    }


    .mystore-shared-footer h4 {

      margin: 0 0 13px;

      color: #fff;

      font-size: 13px;

      line-height: 1.2;

    }


    .mystore-shared-footer p {

      margin: 0;

      color: #aaa;

      font-size: 12px;

      line-height: 1.8;

      max-width: 360px;

    }


    .mystore-shared-footer a {

      display: block;

      color: #aaa;

      font-size: 12px;

      line-height: 1.8;

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

      align-items: center;

      color: #888;

      font-size: 11px;

      text-align: center;

    }


    /* =================================
       MOBILE
       ================================= */

    @media (max-width: 700px) {

      .mystore-shared-footer {

        width: 100%;

        margin-top: 18px;

        padding: 20px 14px 10px;

        border-radius: 10px 10px 0 0;

      }


      .mystore-shared-footer-inner {

        width: 100%;

        display: grid;

        grid-template-columns: 1fr 1fr 1fr;

        gap: 10px;

        align-items: start;

      }


      /* MyStore upar full width */

      .footer-brand {

        grid-column: 1 / -1;

        width: 100%;

      }


      .mystore-shared-footer h3 {

        font-size: 17px;

        margin: 0 0 5px;

      }


      .mystore-shared-footer p {

        font-size: 9px;

        line-height: 1.4;

        max-width: 100%;

        margin: 0;

      }


      /* 3 columns ek hi row me */

      .mystore-shared-footer h4 {

        font-size: 10px;

        line-height: 1.2;

        margin: 0 0 6px;

        white-space: nowrap;

      }


      .mystore-shared-footer a {

        font-size: 8.5px;

        line-height: 1.45;

        margin: 0 0 1px;

        white-space: nowrap;

      }


      .mystore-shared-footer-bottom {

        margin-top: 12px;

        padding-top: 8px;

        font-size: 8px;

      }

    }


    /* Very small phones */

    @media (max-width: 380px) {

      .mystore-shared-footer {

        padding-left: 11px;

        padding-right: 11px;

      }


      .mystore-shared-footer-inner {

        gap: 7px;

      }


      .mystore-shared-footer h4 {

        font-size: 9px;

      }


      .mystore-shared-footer a {

        font-size: 8px;

      }

    }

  `;


  document.head.appendChild(style);


  /* =========================
     LOAD FOOTER
     ========================= */

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      addFooter
    );

  } else {

    addFooter();

  }

})();
