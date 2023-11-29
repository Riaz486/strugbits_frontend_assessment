import { useEffect, useState } from "react";
import classes from "./AddNewCustomer.module.css";
import { Form, Modal } from "react-bootstrap";
import CloseBtn from "../../assets/CloseBtn.svg";
import { useDispatch } from "react-redux";
import {
  getLocalUserDetail,
  postUserDetail,
  updateUserDetail,
} from "../../redux/slice/UserSlice";

const AddNewCustomer = ({ show, setShowPolicy, userData }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
  });
  const id = userData?._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fname && !formData.lname && !formData.email) {
      return alert("Please Fill All Fields");
    }
    const data = new FormData();
    data.append("fname", formData.fname);
    data.append("lname", formData.lname);
    data.append("email", formData.email);
    data.append("image", image);

    try {
      if (!userData) {
        const userDetail = await dispatch(postUserDetail({ id, data })).then(
          () => dispatch(getLocalUserDetail())
        );
      } else if (userData) {
        const userDetail = await dispatch(updateUserDetail({ id, data })).then(
          () => dispatch(getLocalUserDetail())
        );
      }
    } catch (error) {
      console.error("Error posting user detail:", error);
    }
    setShowPolicy(false);
  };
  useEffect(() => {
    if (userData) {
      setFormData({
        fname: userData?.fname,
        lname: userData?.lname,
        email: userData?.email,
      });
    } else {
      setFormData({
        fname: "",
        lname: "",
        email: "",
      });
    }
  }, [userData]);

  return (
    <Modal
      show={show}
      onHide={() => setShowPolicy(false)}
      centered
      size="md"
      className="auth_modal"
    >
      <div className={classes.modal_header}>
        <img
          className={classes.close_btn}
          src={CloseBtn}
          alt=""
          onClick={() => {
            setShowPolicy(false);
          }}
        />
        <h1>Add New Customer</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Modal.Body className={classes.modal}>
          <Form.Control
            type="text"
            name="fname"
            placeholder="First Name"
            value={formData.fname}
            onChange={handleChange}
          />
          <Form.Control
            type="text"
            name="lname"
            placeholder="Last Name"
            value={formData.lname}
            onChange={handleChange}
          />
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Add Customer</button>
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default AddNewCustomer;
