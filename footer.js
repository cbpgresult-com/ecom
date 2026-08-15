/* =========================================================
   MyStore - Shared Footer
   Footer: Home + Product
   Desktop + Mobile
   ========================================================= */

(function () {

  /* ================= FOOTER HTML ================= */

  const footerHTML = `
    <footer class="mystore-shared-footer">

      <div class="mystore-shared-footer-inner">

        <!-- BRAND -->
        <div class="mystore-footer-column mystore-footer-brand">
          <h3>MyStore</h3>

          <p>
            Shop products you love with a simple, fast and
            trusted shopping experience.
          </p>
        </div>


        <!-- QUICK LINKS -->
        <div class="mystore-footer-column">

          <h4>Quick Links</h4>

          <a href="/ecom/index.html">
            Home
          </a>

          <a href="/ecom/index.html">
            Products
          </a>

          <a href="/ecom/cart.html">
            Cart
          </a>

        </div>


        <!-- CUSTOMER POLICY -->
        <div class="mystore-footer-column">

          <h4>Customer Policy</h4>

          <a href="#">
            Returns
          </a>

          <a href="#">
            Shipping
          </a>

          <a href="#">
            Cancellation
          </a>

          <a href="#">
            Terms &amp; Conditions
          </a>

        </div>


        <!-- HELP -->
        <div class="mystore-footer-column">

          <h4>Help</h4>

          <a href="#">
            Customer Care
          </a>

          <a href="#">
            Payments
          </a>

          <a href="#">
            Privacy Policy
          </a>

          <a href="#">
            Contact Us
          </a>

        </div>

      </div>


      <!-- BOTTOM -->
      <div class="mystore-shared-footer-bottom">

        <span>
          © 2026 MyStore. All rights reserved.
        </span>

        <span>
          Secure Shopping · Trusted Service
        </span>

      </div>

    </footer>
  `;


  /* ================= FOOTER CSS ================= */

  const style = document.createElement("style");

  style.id = "mystore-shared-footer-style";

  style.textContent = `

    /* =====================================================
       FOOTER
       ===================================================== */

    .mystore-shared-footer {

      display: block;

      width: 100%;

      box-sizing: border-box;

      clear: both;

      margin-top: 50px;

      padding: 42px 5% 20px;

      background: #111;

      color: #fff;

      position: relative;

      z-index: 9999;

    }


    /* ================= INNER ================= */

    .mystore-shared-footer-inner {

      width: 100%;

      max-width: 1400px;

      margin: 0 auto;

      display: grid;

      grid-template-columns: 2fr 1fr 1fr 1fr;

      gap: 35px;

      box-sizing: border-box;

    }


    /* ================= BRAND ================= */

    .mystore-footer-brand h3 {

      margin: 0 0 14px;

      color: #fff;

      font-size: 24px;

      font-weight: 900;

    }


    .mystore-footer-brand p {

      margin: 0;

      max-width: 350px;

      color: #aaa;

      font-size: 13px;

      line-height: 1.7;

    }


    /* ================= TITLES ================= */

    .mystore-footer-column h4 {

      margin: 0 0 14px;

      color: #fff;

      font-size: 14px;

      font-weight: 800;

    }


    /* ================= LINKS ================= */

    .mystore-footer-column a {

      display: block;

      width: fit-content;

      margin-bottom: 9px;

      color: #aaa;

      font-size: 12px;

      line-height: 1.6;

      text-decoration: none;

      transition: color 0.2s ease;

    }


    .mystore-footer-column a:hover {

      color: #fff;

    }


    /* ================= BOTTOM ================= */

    .mystore-shared-footer-bottom {

      width: 100%;

      max-width: 1400px;

      margin: 30px auto 0;

      padding-top: 17px;

      border-top: 1px solid #292929;

      display: flex;

      justify-content: space-between;

      align-items: center;

      gap: 15px;

      color: #888;

      font-size: 11px;

      box-sizing: border-box;

    }


    /* =====================================================
       TABLET
       ===================================================== */

    @media (max-width: 900px) {

      .mystore-shared-footer {

        padding: 35px 4% 18px;

      }


      .mystore-shared-footer-inner {

        grid-template-columns: 1.5fr 1fr 1fr;

        gap: 28px;

      }


      .mystore-footer-brand {

        grid-column: 1 / -1;

      }

    }


    /* =====================================================
       MOBILE
       Footer WILL SHOW on Home + Product
       ===================================================== */

    @media (max-width: 700px) {

      .mystore-shared-footer {

        display: block !important;

        width: 100%;

        margin-top: 25px;

        padding: 30px 18px 15px;

        border-radius: 16px 16px 0 0;

      }


      .mystore-shared-footer-inner {

        width: 100%;

        grid-template-columns: 1fr 1fr;

        gap: 25px 18px;

      }


      .mystore-footer-brand {

        grid-column: 1 / -1;

      }


      .mystore-footer-brand h3 {

        font-size: 21px;

      }


      .mystore-footer-brand p {

        font-size: 12px;

        max-width: 100%;

      }


      .mystore-footer-column h4 {

        font-size: 13px;

      }


      .mystore-footer-column a {

        font-size: 11px;

        margin-bottom: 7px;

      }


      .mystore-shared-footer-bottom {

        margin-top: 25px;

        padding-top: 14px;

        flex-direction: column;

        justify-content: center;

        text-align: center;

        align-items: center;

        font-size: 10px;

        line-height: 1.6;

      }

    }


    /* =====================================================
       SMALL MOBILE
       ===================================================== */

    @media (max-width: 400px) {

      .mystore-shared-footer {

        padding-left: 15px;

        padding-right: 15px;

      }


      .mystore-shared-footer-inner {

        gap: 22px 12px;

      }


      .mystore-footer-column a {

        font-size: 10.5px;

      }

    }

  `;


  /* ================= ADD CSS ================= */

  if (!document.getElementById("mystore-shared-footer-style")) {

    document.head.appendChild(style);

  }


  /* ================= MOUNT FOOTER ================= */

  function mountFooter() {

    /* Prevent duplicate footer */

    if (document.querySelector(".mystore-shared-footer")) {

      return;

    }


    /* Add footer at very bottom of body */

    document.body.insertAdjacentHTML(

      "beforeend",

      footerHTML

    );

  }


  /* ================= PAGE READY ================= */

  if (document.readyState === "loading") {

    document.addEventListener(

      "DOMContentLoaded",

      mountFooter

    );

  } else {

    mountFooter();

  }


})();
