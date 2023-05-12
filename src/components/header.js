import React, { useState, useEffect } from "react";
import "../styles/header.css";

function Header() {

  return (
	<div>
		<div className="header">
			<div className="overlay"></div>
	  
			<h1 className="scandiweb">
				<div className="text-center">
					<span>Welcome To </span>
					<a id="scandiweb-logo" href="#" aria-label="home">scandiweb</a>
				</div>
			</h1>
		</div>
	</div>
  );
}

export default Header;
