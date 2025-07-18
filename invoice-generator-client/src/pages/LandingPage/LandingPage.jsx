import './LandingPage.css';
import Logo from '../../components/Logo';
import { Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

const LandingPage =()=>{

    // const handleActionButton = () => {
    //     // Add navigation or scroll logic here
    //     console.log("Generate Invoice button clicked");
    //   };

    return (
    <> 
      {/* Hero Section: Full-width, centered text with background image */}
      <header id="hero" className="hero-section text-white text-center">
        <div className="container py-5 d-flex flex-column justify-content-center" style={{ minHeight: '100vh' }}>
          <div className="row py-lg-5">
            <div className="col-lg-9 col-md-10 mx-auto">
              <h1 className="display-3 fw-bold mb-4">
                Effortless Invoicing. Professional Results.
              </h1>
              <p className="lead mb-5" style={{ fontSize: '1.3rem' }}>
                Stop wrestling with spreadsheets. QuickInvoice helps you create and send beautiful invoices in minutes, so you get paid faster.
              </p>
              <p>
                {/* Primary call to action */}
                <button className="btn btn-lg btn-warning fw-bold rounded-pill my-2 mx-1 px-5 py-3">
                  Generate Your First Invoice
                </button>
                {/* Secondary call to action */}
                <a href="#how-it-works" className="btn btn-lg btn-outline-light rounded-pill my-2 mx-1 px-5 py-3">
                  Learn More
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      
      {/* how it works section */}
      <section id="how-it-works">
        <h2>Get Started in 4 Simple Steps</h2>
            <div className="steps-container">
                <div className="step-card">
                    <div className="step-circle step1">1</div>
                    <div className="step-title">Enter Details</div>
                    <div className="step-description">
                        Quickly fill in your client’s information, item descriptions, quantities, and prices. Our intuitive form makes it a breeze.
                    </div>
                </div>
                <div className="step-card">
                    <div className="step-circle step2">2</div>
                    <div className="step-title">Choose Template</div>
                    <div className="step-description">
                        Browse our gallery of professionally designed templates. Pick one that matches your brand and style.
                    </div>
                </div>
                <div className="step-card">
                    <div className="step-circle step3">3</div>
                    <div className="step-title">Preview Invoice</div>
                    <div className="step-description">
                        See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.
                    </div>
                </div>
                <div className="step-card">
                    <div className="step-circle step4">4</div>
                    <div className="step-title">Download & Save</div>
                    <div className="step-description">
                        Download your invoice as a PDF, send it directly via email, or save it for your records and future reference.
                    </div>
                </div>
            </div>
      </section>

      {/* for assests use landing1,2,3,4  */}
      <section id="feature">
      {(() => {
        const features = [
          {
            title: 'Easy to fill invoice details',
            description: `Curated list of templates from gallery.
                          Add your logo and invoice details.
                          Tailor fields to your needs.`,
            image: '/assets/landing1.png',
            reverse: false,
          },
          {
            title: 'Beautiful Dashboard',
            description: `View the previous invoices.
                          Your saved invoices with thumbnail.
                          Reuse one or more invoices.
                          Track the invoices.`,
            image: '/assets/landing2.png',
            reverse: true,
          },
          {
            title: 'Invoice Preview with Action Buttons',
            description: `Live preview.
                          Switch between multiple invoices.
                          One click to Save, Download and Delete invoices.`,
            image: '/assets/landing3.png',
            reverse: false,
          },
          {
            title: 'Send invoices instantly',
            description: `Send invoices instantly without leaving the application.
                          One click to send invoices.
                          Send unlimited invoices.`,
            image: '/assets/landing4.png',
            reverse: true,
          },
        ];

        return (
          <div className="container">
             <h2 className="section-title">Why Choose QuickInvoice?</h2>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-row ${feature.reverse ? 'reverse' : ''}`}
              >
                <div className="feature-img">
                  <img src={feature.image} alt={feature.title} />
                </div>
                <div className="feature-text">
                  <h3>{feature.title}</h3>
                  {feature.description.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })()}
    </section>

      {/* Call to Action section */}
      <section id="generate-invoice" className="py-5 text-center bg-primary text-white">
       <div className="container">
        <h2 className="display-5 fw-bold mb-3">Ready to Streamline Your Invoicing?</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Join thousands of freelancers and small businesses who trust QuickInvoice. 
            <br /> Start creating professional invoices today – it's fast, easy, and effective!
          </p>
          <button className="btn btn-lg btn-warning fw-bold rounded-pill px-5 py-3">
              Start Generating Invoices Now
          </button>
          <p className="mt-3 small">
            (This will lead to the invoice generation interface)
          </p>
        </div>
      </section>

      {/* footer section */}
      <footer className="py-5 bg-dark text-white-50">
        <div className="container text-center">
          <Logo />
          <p className="text-white fw-bold mt-2">QuickInvoice</p>
          <p className="mb-0">
            &copy; {new Date().getFullYear()} QuickInvoice. All Rights Reserved.
          </p>
          <p className="mb-0 small">
            Crafted with <i className="bi bi-heart-fill text-danger"></i> for freelancers and small businesses.
          </p>
          <p className="mt-3 d-flex justify-content-center gap-3">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white-50 me-4">
              <Twitter size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white-50 me-4">
              <Facebook size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white-50 me-4">
              <Linkedin size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white-50">
              <Instagram size={20} />
            </a>
          </p>
        </div>
      </footer>

    </>
    );
};

export default LandingPage;