import React from "react";
import { useLanguage } from "./LanguageContext";
import "./Footer.css";

const Footer = () => {
  const { language } = useLanguage();

  const text = {
    en: {
      newsletterTitle: "BE THE FIRST TO KNOW",
      newsletterDesc: "Sign up for updates from mettà muse.",
      contactTitle: "CONTACT US",
      currencyTitle: "CURRENCY",
      currency: "USD",
      currencyInfo: "Transactions will be processed in USD and corresponding references are available on request.",
      followUs: "FOLLOW US",
      accepts: "mettā muse ACCEPTS",
    },
    es: {
      // ... Spanish translations ...
    },
    hi: {
      newsletterTitle: "पहले जानें",
      newsletterDesc: "mettà muse से अपडेट के लिए साइन अप करें।",
      contactTitle: "संपर्क करें",
      currencyTitle: "मुद्रा",
      currency: "USD",
      currencyInfo: "लेन-देन USD में प्रोसेस किए जाएंगे और अनुरोध पर संबंधित संदर्भ उपलब्ध होंगे।",
      followUs: "हमारा अनुसरण करें",
      accepts: "mettā muse स्वीकृत करता है",
    },
  };

  const currentText = text[language] || text.en;

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="newsletter">
          <h4>{currentText.newsletterTitle}</h4>
          <p>{currentText.newsletterDesc}</p>
          <form aria-label="Newsletter Signup">
            <input
              type="email"
              placeholder="अपना ईमेल पता दर्ज करें..."
              aria-label="Your email address"
              required
            />
            <button type="submit" aria-label="Subscribe to Newsletter">
              सब्सक्राइब करें
            </button>
          </form>
        </div>
        <div className="contact-info">
          <h4>{currentText.contactTitle}</h4>
          <p>+91 9911028109</p>
          <p>
            <a href="mailto:customercare@mettamuse.com" aria-label="Email Support">
              customercare@mettamuse.com
            </a>
          </p>
          <h4>{currentText.currencyTitle}</h4>
          <p>{currentText.currency}</p>
          <small>{currentText.currencyInfo}</small>
        </div>
      </div>

      <div className="footer-middle">
        <div className="footer-links">
          <h4>mettā muse</h4>
          <ul>
            <li><a href="/about">हमारे बारे में</a></li>
            <li><a href="/stories">कहानियां</a></li>
            <li><a href="/artisans">कारीगर</a></li>
            <li><a href="/boutiques">बुटीक</a></li>
            <li><a href="/contact">संपर्क करें</a></li>
            <li><a href="/compliance">यूरोपीय संघ अनुपालन दस्तावेज</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>जल्दी लिंक्स</h4>
          <ul>
            <li><a href="/orders">ऑर्डर और शिपिंग</a></li>
            <li><a href="/join">एक विक्रेता के रूप में जुड़ें/लॉगिन करें</a></li>
            <li><a href="/payment">भुगतान और मूल्य निर्धारण</a></li>
            <li><a href="/returns">रिटर्न और धनवापसी</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-media">
          <h4>{currentText.followUs}</h4>
          <div className="social-links">
            <a href="#" aria-label="Instagram">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="#" aria-label="Facebook">
              <i className="fa fa-facebook"></i>
            </a>
          </div>
        </div>
        <div className="payment-options">
          <h4>{currentText.accepts}</h4>
          <div className="payment-icons">
            <img src="google-pay.png" alt="Google Pay" />
            <img src="paypal.png" alt="PayPal" />
            <img src="visa.png" alt="Visa" />
            <img src="amex.png" alt="American Express" />
            <img src="apple-pay.png" alt="Apple Pay" />
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>&copy; 2024 mettà muse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;