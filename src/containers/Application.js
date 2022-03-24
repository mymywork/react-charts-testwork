import React from "react"
import { Link } from "react-router-dom"
import { Outlet} from "react-router"

export const Application = ({ }) => {
	return (
		<React.Fragment>
			<Link to="/line"><button type="button">Line</button></Link>&nbsp;
			<Link to="/round"><button type="button">Round</button></Link>&nbsp;
			<Link to="/bar"><button type="button">Bar</button></Link>&nbsp;
			<Link to="/map"><button type="button">Map</button></Link>&nbsp;

			<br/><br/>
			<Outlet />
		</React.Fragment>
	)
}