import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function RGD() {
  return (
    <div className="container">
      <div className="note-container" style={{ marginBottom: "10px" }}>
        <div className="note" style={{ height: "100%" }}>
          <div onClick={() => navigate("/rgd")}>
            <h3 className="note-title">
              Informations about the app and it's usage
            </h3>
            <p className="note-description">
              👉 Write your note and click "+" to add.
              <br />
              👉 Click on any note to view that full note.
              <br />
              👉 Click on the pen icon to edit that note.
              <br />
              👉 Click on the delete icon to delete that note.
              <br />
              👉 This web app is developed by RGD (Raja Gautam Das). For any
              queries, help or feedback, you can contact with me via e-mail:
              gautm.das@gmail.com. Your feedback is highly appreciated.
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
