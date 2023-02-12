import Axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("https://note-rgd.up.railway.app/").then((res) => {
      setNotes(res.data.data);
    });
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    setTitle("");
    setDescription("");
    Axios.post("https://note-rgd.up.railway.app/", { title, description }).then(
      (res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setNotes([
            {
              title,
              description,
              _id: res.data.data._id,
              updatedAt: new Date().toLocaleDateString("en-IN", {
                weekday: "short",
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "short",
                year: "2-digit",
              }),
            },
            ...notes,
          ]);
        } else {
          toast.error(res.data.message);
        }
      }
    );
  };

  const deleteNote = (_id) => {
    Axios.delete(`https://note-rgd.up.railway.app/${_id}`).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
    setNotes(notes.filter((note) => note._id !== _id));
  };

  return (
    <>
      <div className="container">
        <Outlet />
        <div className="note-container">
          <form className="note">
            <div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Type title..."
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Type description..."
              />
            </div>
            <div className="btn-add">
              <button className="btn" type="submit" onClick={addNote}>
                +
              </button>
            </div>
          </form>
          <div className="note">
            <div onClick={() => navigate("/rgd")}>
              <h3 className="note-title">Informations about the app</h3>
              <p className="note-description">
                👉 Write your note and click "+" to add.
                <br />
                👉 Click on any note to view that full note.
                <br />
                👉 Click on the pen icon to edit that note.
              </p>
            </div>
            <div className="c-at">
              <div>
                <span>
                  {new Date().toLocaleDateString("en-IN", {
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
                  onClick={() => toast.warning("You can't edit this note")}
                >
                  <AiOutlineEdit />
                </span>
                <span
                  style={{ color: "red" }}
                  onClick={() => toast.warning("You can't delete this note")}
                >
                  <AiOutlineDelete />
                </span>
              </div>
            </div>
          </div>
          {notes.map((note, key) => (
            <div className="note" key={key}>
              <div onClick={() => navigate("/note/" + note._id)}>
                <h3 className="note-title">{note.title.slice(0, 30)}</h3>
                <p className="note-description">
                  {note.description.slice(0, 110)}
                </p>
              </div>
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
          ))}
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
