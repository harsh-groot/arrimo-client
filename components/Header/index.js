import React from "react";
import Link from "next/link";
import { Button } from "antd";
import { useRouter } from "next/dist/client/router";
import { checkAuth, clearUserInfoFromLocalStorage } from "../../utils/localStorageUtils/userInfo";

const Header = () => {

  const router = useRouter();
  
  const handleLogout = () => {
    clearUserInfoFromLocalStorage();
    router.push('/auth');
  }

  return (
    <header className="mb-4">
      <nav className="navbar navbar-expand-lg navbar-light nav_bg mb-5" id="mainNav">
        <div className="container p-4 px-lg-5 d-flex">
          <div>
            <strong className="color-animo" style={{ cursor: "pointer" }}>Arrimo Pro</strong>
            </div>
       { checkAuth() ? 
       <div>

          <Link  href={'/users'}><span className="color-animo me-5">Users</span></Link>
          <Link  href={'/calendar-events'}><span className="color-animo me-5">Events</span></Link>
          <Button className="color-btn" onClick={handleLogout} >Logout</Button>
      </div> : null
          }
        </div>
      </nav>
    </header>
  );
};

export default Header;
