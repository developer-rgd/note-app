import { useEffect, useState } from "react";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { GrDocumentUpdate } from "react-icons/gr";

export default function EditNote() {
  const [note, setNote] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`https://note-rgd.up.railway.app/${_id}`).then((res) => {
      if (res.data.success) {
        setNote(res.data.data);
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
        toast.info("Modify and click update to update");
      } else {
        toast.error(res.data.message);
      }
    });
  }, []);

  const editNote = (e) => {
    e.preventDefault();
    Axios.put(`https://note-rgd.up.railway.app/${_id}`, {
      title,
      description,
    }).then((res) => {
      if (res.data.success) {
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    });
  };

  return (
    <>
      <div className="container">
        <form className="note" style={{ height: "98%" }}>
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Type title..."
            />
            <textarea
              style={{ height: "74vh" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Type description..."
            />
          </div>
          <div className="btn-add">
            <button className="btn" type="submit" onClick={editNote}>
              <span
                style={{ color: "green" }}
                onClick={() => navigate("/edit/" + note._id)}
              >
                <GrDocumentUpdate />
              </span>
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
