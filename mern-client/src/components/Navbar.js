import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";


class Navbar extends Component {
 //Logout logic!
 // using history.push we'll be redirect to main!
      logOut(e) {
       e.preventDefault()
       localStorage.removeItem("usertoken")
       this.props.history.push("/")
 }      
 render(){
       // Login and Register form!
       const loginRegLink = (
             <ul className="navbar-nav">
             <li className="nav-item">
                   <Link to="/login" className="nav-link">
                   Login
                   </Link>
             </li>
             <li className="nav-item">
                   <Link to="/register" className="nav-link">
                   Register
                   </Link>
             </li>
             </ul>
       )
       // After we successfully logged In we need user infos 
       // and also redirecting to /profile
       // We also have to defined Logout to redirecting to main page!
       const userLink = (
            <ul className="navbar-nav">
            <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                  User
                  </Link>
            </li>
            <li className="nav-item">
                  <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                  Logout
                  </a>
            </li>
            </ul>
      )
      return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
            <button 
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar1"
            aria-controls="navbar1"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
          <span className="navbar-toggler-icon"></span>
            </button>
            <div
            className="collapse navbar-collapse justify-content-md-center" id="navbar1"
            >
            <ul className="navbar-nav">
            <li className="nav-item">
                  <Link to="/" className="nav-link">
                        Home
                  </Link>
            </li>
             </ul>
             {localStorage.usertoken ? userLink : loginRegLink}
            </div>
            </nav>
      )
       // {localStorage.usertoken ? userLink : loginRegLink}
       // What does it mean? It means IF localStorage.usertoken founded then
       // activate userLink otherwise gimme loginRegLink
       // ACHTUNG => userLink function means successful redirecting to /profile
       // ACHTUNG => loginRegLink function means back to login/register form!
 }
}

export default withRouter(Navbar)