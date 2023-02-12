import { useEffect, useState } from "react";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function Note() {
  const [note, setNote] = useState([]);
  const { _id } = useParams();
  const navigate = useNavigate();

  const deleteNote = (_id) => {
    Axios.delete(`https://note-rgd.up.railway.app/${_id}`).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      navigate("/");
    });
  };
  useEffect(() => {
    Axios.get(`https://note-rgd.up.railway.app/${_id}`).then((res) => {
      if (res.data.success) {
        setNote(res.data.data);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
  }, []);
  return (
    <div className="container">
      <div className="note-container" style={{ marginBottom: "10px" }}>
        <div className="note" style={{ height: "100%" }}>
          <h3 className="note-title">{note.title}</h3>
          <p className="note-description">{note.description}</p>
          <div className="c-at">
            <div>
              <span>
                {new Date(note.updatedAt).toLocaleDateString("en-IN", {
                  weekday: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
            <div className="edit-del">
              <span
                style={{ color: "yellow" }}
                onClick={() => navigate("/edit/" + note._id)}
              >
                <AiOutlineEdit />
              </span>
              <span
                style={{ color: "red" }}
                onClick={() => deleteNote(note._id)}
              >
                <AiOutlineDelete />
              </span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <span style={{ color: "black", margin: "4px" }}>
        Go back to &nbsp;
        <Link style={{ fontWeight: 900 }} to={"/"}>
          <i>homepage</i>
        </Link>
      </span>
    </div>
  );
}
