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
      aboutUs: "About Us",
      stories: "Stories",
      artisans: "Artisans",
      boutiques: "Boutiques",
      contact: "Contact Us",
      compliance: "EU Compliance Documents",
      orderShipping: "Orders & Shipping",
      joinSeller: "Join/Login as a Seller",
      paymentPricing: "Payment & Pricing",
      returnsRefunds: "Returns & Refunds",
      faq: "FAQs",
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms & Conditions",
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
      aboutUs: "हमारे बारे में",
      stories: "कहानियाँ",
      artisans: "कारीगर",
      boutiques: "बुटीक",
      contact: "संपर्क करें",
      compliance: "यूरोपीय संघ अनुपालन दस्तावेज",
      orderShipping: "ऑर्डर और शिपिंग",
      joinSeller: "एक विक्रेता के रूप में जुड़ें/लॉगिन करें",
      paymentPricing: "भुगतान और मूल्य निर्धारण",
      returnsRefunds: "रिटर्न और धनवापसी",
      faq: "FAQs",
      privacyPolicy: "गोपनीयता नीति",
      termsConditions: "नियम और शर्तें",
    },
  };

  const currentText = text[language] || text.en;

  // Define click handlers for social media buttons
  const handleInstagramClick = () => {
    window.location.href = "https://www.instagram.com"; // Redirect to Instagram
  };

  const handleFacebookClick = () => {
    window.location.href = "https://www.facebook.com"; // Redirect to Facebook
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="newsletter">
          <h4>{currentText.newsletterTitle}</h4>
          <p>{currentText.newsletterDesc}</p>
          <form aria-label="Newsletter Signup">
            <input
              type="email"
              placeholder="Enter your email...."
              aria-label="Your email address"
              required
            />
            <button type="submit" aria-label="Subscribe to Newsletter">
              {language === "hi" ? "सब्सक्राइब करें" : "Subscribe"}
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
            <li><a href="/about">{currentText.aboutUs}</a></li>
            <li><a href="/stories">{currentText.stories}</a></li>
            <li><a href="/artisans">{currentText.artisans}</a></li>
            <li><a href="/boutiques">{currentText.boutiques}</a></li>
            <li><a href="/contact">{currentText.contact}</a></li>
            <li><a href="/compliance">{currentText.compliance}</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Quick Link</h4>
          <ul>
            <li><a href="/orders">{currentText.orderShipping}</a></li>
            <li><a href="/join">{currentText.joinSeller}</a></li>
            <li><a href="/payment">{currentText.paymentPricing}</a></li>
            <li><a href="/returns">{currentText.returnsRefunds}</a></li>
            <li><a href="/faq">{currentText.faq}</a></li>
            <li><a href="/privacy">{currentText.privacyPolicy}</a></li>
            <li><a href="/terms">{currentText.termsConditions}</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-media">
          <h4>{currentText.followUs}</h4>
          <div className="social-links">
            <button 
              onClick={handleInstagramClick} 
              aria-label="Instagram" 
              className="social-button"
            >
              <i className="fa fa-instagram"></i>
            </button>
            <button 
              onClick={handleFacebookClick} 
              aria-label="Facebook" 
              className="social-button"
            >
              <i className="fa fa-facebook"></i>
            </button>
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
