import React from "react";
import { Layout, Icon } from "antd";
import FooterCSS from "./Footer.module.css";

const Footer = () => {
	return (
		<Layout.Footer className={FooterCSS.footer}>
			<div className={FooterCSS.footerContainer}>
				<p>
					<a href="mailto:tuguldurochh@gmail.com">Tuguldur Ochsaikhan</a>
				</p>
			</div>
		</Layout.Footer>
	);
};

export default Footer;
