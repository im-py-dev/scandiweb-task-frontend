import React, { useState, useEffect } from "react";
import "../styles/footer.css";


function Footer() {
  const [linkColor, setLinkColor] = useState("white");

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (linkColor === "white") {
        setLinkColor("chartreuse");
      } else {
        setLinkColor("white");
      }
    }, 2000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [linkColor]);

  return (
	<footer className="footer mt-auto py-3">
		<div>
			<span>
			Made With ❤️ By &nbsp;
				<a id="impydev" href="https://github.com/im-py-dev/scandiweb-task" target="_blank" style={{ color: linkColor }}>
					<i className="bi bi-github"></i> ImPyDev
				</a>
			</span>
		</div>
	</footer>
  );
}

export default Footer;
