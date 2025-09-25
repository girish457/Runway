import "./footer.css";

function ShoppingFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <input id="acc-about" className="acc-toggle" type="checkbox" />
          <label className="acc-header" htmlFor="acc-about">
            <span>RUNWAY BY YOGESH</span>
            <i className="fa-solid fa-chevron-down"></i>
          </label>
          <div className="content">
            <address className="footer-address">
              Jaipur, Rajasthan, India
            </address>
            <p className="footer-line">Contact : <a href="tel:+919680820403">9680820403</a></p>
            <div className="support">
              <p className="footer-line title">Customer Support</p>
              <p className="footer-line">Monday to Saturday</p>
              <p className="footer-line">10:00 AM – 7:00 PM</p>
            </div>
          </div>
        </div>

        <div className="footer-col">
          <input id="acc-policies" className="acc-toggle" type="checkbox" />
          <label className="acc-header" htmlFor="acc-policies">
            <span>OUR POLICIES</span>
            <i className="fa-solid fa-chevron-down"></i>
          </label>
          <div className="content">
            <ul className="footer-links">
              <li><a href="/src/pages/terms.html" target="_blank" rel="noopener">Terms and Conditions</a></li>
              <li><a href="/src/pages/privacy.html" target="_blank" rel="noopener">Privacy Policy</a></li>
              <li><a href="/src/pages/payment.html" target="_blank" rel="noopener">Payment Policy</a></li>
              <li><a href="/src/pages/contact.html" target="_blank" rel="noopener">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-col">
          <input id="acc-info" className="acc-toggle" type="checkbox" />
          <label className="acc-header" htmlFor="acc-info">
            <span>QUICK LINKS</span>
            <i className="fa-solid fa-chevron-down"></i>
          </label>
          <div className="content">
            <ul className="footer-links">
              <li><a href="/shop/about-us">About Us</a></li>
              <li><a href="/shop/contact-us">Contact Us</a></li>
              <li><a href="/shop/products">SHOP</a></li>
              <li><a href="/shop/faqs">FAQs</a></li>
              <li><a href="/shop/wishlist">Wishlist</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-col">
          <input id="acc-signup" className="acc-toggle" type="checkbox" />
          <label className="acc-header" htmlFor="acc-signup">
            <span>SIGN UP AND SAVE</span>
            <i className="fa-solid fa-chevron-down"></i>
          </label>
          <div className="content">
            <p className="footer-desc">
              Sign up for the newsletter to receive information about the new arrivals,
              future events and special discounts.
            </p>
            <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
              <i className="fa-regular fa-envelope"></i>
              <input type="email" placeholder="Enter your email" aria-label="Email" />
              <button type="submit" aria-label="Subscribe"><i className="fa-solid fa-paper-plane"></i></button>
            </form>
            <div className="socials">
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <i className="fa-brands fa-cc-paypal paypal"></i>
        <p>© 2025 Runway By Yogesh</p>
        <p>Powered by Shopify</p>
      </div>

      <a href="https://wa.me/9680820403" className="whatsapp-fab" target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <circle cx="16" cy="16" r="12" fill="none" stroke="#ffffff" strokeWidth="3" />
          <path d="M21 18.3c-.3-.2-1.7-.9-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.6-1-1-1.6-2-1.8-2.3-.2-.3 0-.5.1-.7.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.6s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.3 3.3.2.3 2.2 3.5 5.4 4.9.8.3 1.3.5 1.8.6.8.2 1.4.2 1.9.1.7-.1 1.7-.7 1.9-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" fill="#ffffff" />
        </svg>
      </a>
    </footer>
  );
}

export default ShoppingFooter;


