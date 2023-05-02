import React, { useState, useEffect } from "react";
import "./header.css";

function Header() {

  return (
	<div>
		<div className="header">
			<div className="overlay"></div>
		</div>

		<h1 className="scandiweb">
			<div className="text-center">
				<span>Welcome To </span>
				<a href="#" aria-label="home">scandiweb</a>
			</div>
		</h1>
	</div>
  );
}

export default Header;
