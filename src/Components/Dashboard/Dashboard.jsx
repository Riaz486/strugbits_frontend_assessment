import React, { useEffect, useRef, useState } from "react";
import classes from "./Dashboard.module.css";
import Logo from "../../assets/logo.png";
import custom_icon from "../../assets/customersIcon.png";
import { GoPlus } from "react-icons/go";
import { GrMenu } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import AddNewCustomer from "../AddNewCustomer/AddNewCustomer";
import DeleteCustomer from "../DeleteCustomer/DeleteCustomer";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../redux/slice/UserSlice";
import { getLocalUserDetail } from "../../redux/slice/UserSlice";
const Dashboard = () => {
  const menuRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const [addCustomer, setAddCustomer] = useState(false);
  const [editCustomer, setEditCustomer] = useState(false);
  const [deleteCustomer, setDeleteCustomer] = useState(false);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
const baseUrl = "http://localhost:8080/uploads/"
  let localData = useSelector(state => state?.userData?.getLocalUserData);
  let localDataArray = Array.isArray(localData) ? localData : [];

  useEffect(() => {
    dispatch(getUserDetail());
  }, []);

  const handleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1130) {
        setMenu(true);
      } else {
        setMenu(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={classes.container} ref={menuRef}>
      <AddNewCustomer
        show={addCustomer}
        setShowPolicy={() => setAddCustomer(false)}
        userData={userData}
      />

      <DeleteCustomer
        show={deleteCustomer}
        setShowPolicy={() => setDeleteCustomer(false)}
        id={userData}
      />
      <div className={`${classes.left_sidebar} ${!menu && classes.collapsed}`}>
        <span onClick={handleMenu}>
          {menu ? <AiOutlineClose /> : <GrMenu />}
        </span>
        {menu && (
          <>
            <img src={Logo} alt="" />
            <button>
              <img src={custom_icon} alt="" />
              CUSTOMERS
            </button>
          </>
        )}
      </div>
      <div className={classes.main}>
        <div className={classes.header}>
          <h1>CUSTOMERS</h1>
        </div>
        <div className={classes.inner_main}>
          <button onClick={() => setAddCustomer(true)}>
            <GoPlus />
            ADD NEW CUSTOMER
          </button>
          <div className={classes.table}>
            <div className={classes.t_header}>
              <div className={classes.first_sort}>
                <h1>Customer ID</h1>
              </div>
              <div className={classes.second_sort}>
                <h1>Customer Name</h1>
              </div>
              <div className={classes.third_sort}>
                <h1>Email</h1>
              </div>
            </div>
            <div className={classes.rep_tbody}>
              {localDataArray && localDataArray.map((item, index) => (


                <div key={index} className={classes.tbody}>
                  <div className={classes.t_body_1}>
                    <img src={`${baseUrl}${item.image}`} alt="user Image" />
                  </div>

                  <div className={classes.t_body_2}>
                    <p> {item.id}</p>
                  </div>

                  <dir className={classes.t_body_3}>
                    <p>{item.first_name ? item.first_name + " " + item.last_name : item.fname + " " + item.lname}</p>
                  </dir>

                  <div className={classes.t_body_4}>
                    <p>{item.email}</p>
                  </div>

                  <div className={classes.t_body_5}>
                    <button onClick={() => {setAddCustomer(true); setUserData(item) }}>Edit</button>
                    <button onClick={() => {setDeleteCustomer(true); setUserData(item._id) }}>
                      Delete
                    </button>
                  </div>
                </div>))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
