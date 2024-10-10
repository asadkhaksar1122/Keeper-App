import "./footer.css";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <h6 className="connect-title">Connect with Us</h6>
          <a
            href="https://www.asadkhan.site/"
            target="_blank"
            className="portfolio-link"
            title="Go to my Portfolio"
          >
            <i className="github-icon"></i>
            <img
              className="image"
              src="https://res.cloudinary.com/diinrpqko/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1721721299/Profile-picture/dpqqqt7xitjjj1upajp8.png"
              alt=""
            />
          </a>
          <div className="credit">
            {" "}
            <strong> Credit goes to Asad Khan </strong>{" "}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
