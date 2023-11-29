import classes from "./DeleteCustomer.module.css";
import { Modal } from "react-bootstrap";
import CloseBtn from "../../assets/cross.svg";
import bin from "../../assets/Bin.svg";
import { useDispatch } from "react-redux";
import {
  deleteUserDetail,
  getLocalUserDetail,
} from "../../redux/slice/UserSlice";
const DeleteCustomer = ({ show, setShowPolicy, id }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      if (id) {
        const userDetail = await dispatch(deleteUserDetail(id)).then(() =>
          dispatch(getLocalUserDetail())
        );
      }
    } catch (error) {
      console.error("Error posting user detail:", error);
    }
    setShowPolicy(false);
  };

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
          onClick={() => setShowPolicy(false)}
        />
        <img src={bin} alt="" />
        <h1>Are you sure?</h1>
        <p>
          Do you really want to delete this customer? This process can not be
          undone.
        </p>
      </div>
      <Modal.Body className={classes.modal}>
        <button onClick={() => setShowPolicy(false)}>Cancel</button>
        <button onClick={() => handleDelete()}>Delete</button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCustomer;
