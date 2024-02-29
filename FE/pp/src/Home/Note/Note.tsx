import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Button,
  Divider,
  Modal,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  CardHeader,
  CardMedia,
  CardContent,
} from "@mui/material";
import { globalbuttonstyle } from "../../styles/Colors";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import { validateNoteData } from "../Validations/validateNoteData";
import axios from "axios";
import { style, readmorelink, closeiconstyle, gridStyles } from "./Note.style";
import {
  Notetype,
  noteformtype,
  FormErrortype,
  showsearchednotes,
} from "./Note.utility";
import Popover from "@mui/material/Popover";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Loading } from "../../Notification_and_Loading/Loading";
import CustomTextField from "../../CustomeTextfield";
import { CloseSharp } from "@mui/icons-material";
import { globalColors } from "../../styles/Colors";
import { BASE_URL } from "../../constants";

type noteprops = {
  noteCount: number;
  setnoteCount: (value: number) => void;
};

export const Note = ({ noteCount, setnoteCount }: noteprops) => {
  const reset = {
    title: "",
    value: "",
  };
  const [notes, setNotes] = useState<Notetype[]>([]);
  const [globalnotes, setGlobalNotes] = useState<Notetype[]>([]);
  const [noteId, setNoteId] = useState(0);
  const [modelButton, setModelButton] = useState("Add Note");
  const [open, setOpen] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deleteflag, setDeleteFlag] = useState(false);
  const [error, setError] = useState<FormErrortype>({});
  const [formObj, setformObj] = useState<noteformtype>(reset);
  const [readMoreOpen, setReadMoreOpen] = useState(false);
  const [hoveredNote, setHoveredNote] = useState<number | null>(null);
  const [showSerchbox, setShowSearchbox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [createflag, setcreateflag] = useState(false);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    note_id: number
  ) => {
    setAnchorEl(event.currentTarget);
    setNoteId(note_id);
  };

  const handleancherClose = () => {
    setAnchorEl(null);
  };

  const ancheropen = Boolean(anchorEl);

  const handleOpen = () => {
    setModelButton("Add Note");
    setOpen(true);
    setcreateflag(true);
  };
  const handleClose = () => {
    setformObj(reset);
    setError({});
    setOpen(false);
    setcreateflag(false);
  };

  const handledeletepopupOpen = (note: Notetype) => {
    console.log(note);
    setDeletePopUp(true);
    setNoteId(note.note_id);
    handleancherClose();
  };
  const handledeletepopupClose = () => {
    setDeletePopUp(false);
    setNoteId(0);
  };

  const handleReadMoreOpen = () => setReadMoreOpen(true);

  const handleReadMoreClose = () => {
    setformObj(reset);
    setReadMoreOpen(false);
  };

  const handleEdit = (note: Notetype) => {
    console.log(note.note_id, note.title, note.value);
    setModelButton("Edit note");
    setNoteId(note.note_id);
    setformObj(note);
    setOpen(true);
    handleancherClose();
  };

  const handleDelete = () => {
    deleteNote(noteId);
  };

  const createNote = async () => {
    try {
      let formData = { ...formObj, token: localStorage.getItem("jwt_token") };
      const created_note = await axios.post(
        `${BASE_URL}/createNote`,
        formData
      );
      const result = created_note.data[0];
      fetchAllNotes();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = async () => {
    try {
      let formData = { ...formObj, token: localStorage.getItem("jwt_token") };
      console.log(formData)
      const edited_note = await axios.post(
        `${BASE_URL}/editNote`,
        formData
      );
      const result = edited_note.data[0];
      fetchAllNotes();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllNotes = async () => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      const response = await axios.get(`${BASE_URL}/fetchAllNotes`, {
        headers: {
          Authorization: `${jwt_token}`,
        },
      });
      const updatedArrayOfObjects = response.data.map((obj: { [x: string]: any; _id: any; }) => {
        // Destructure _id from the object and rename it to note_id
        const { _id: note_id, ...rest } = obj;
        // Return a new object with note_id and other properties
        return { note_id, ...rest };
      });
      setNotes(updatedArrayOfObjects);
      setGlobalNotes(updatedArrayOfObjects);
      setnoteCount(updatedArrayOfObjects.length);
      setDeleteFlag(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (note_id: number) => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      console.log(note_id);
      const response = await axios.delete(`${BASE_URL}/deleteNote`, {
        headers: {
          Authorization: `${jwt_token}`,
          noteId: note_id,
        },
      });
      console.log(response.data);
      setDeleteFlag(true);
      fetchAllNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let formData: noteformtype = formObj;
    let errors = validateNoteData({ formData });
    setError(errors);
    if (Object.keys(errors).length === 0) {
      console.log(formObj);
      // if (noteId) {
      //   editNote();
      // } else {
      //   createNote();
      // }
      if (createflag) {
        createNote();
      } else if (noteId || !createflag) {
        editNote();
      }
      setformObj(reset);
      handleClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(formObj);
    let formData: noteformtype = {
      ...formObj,
      [name]: value,
    };
    setformObj(formData);
    let errors = validateNoteData({ formData });
    setError(errors);
  };

  const handlesearchChange = (e: {
    target: { name: any; value: any };
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    const searched_notes = showsearchednotes(
      globalnotes,
      e.target.value.trim()
    );
    setNotes(searched_notes);
  };

  useEffect(() => {
    // if (!open || deleteflag) {
    // }
    fetchAllNotes();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Loading sizevalue={300} />
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ padding: "4.2rem" }}>
      <Grid item xs={12} sx={{ padding: "1rem", marginTop: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h3"
            component="div"
            style={{ marginRight: "16px", fontWeight: "bold" }}
          >
            Notes
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {!showSerchbox ? (
              <IconButton
                onClick={() => {
                  setShowSearchbox(!showSerchbox);
                }}
                sx={{
                  // backgroundColor: "violet",
                  alignSelf: "center",
                  display: "flex",
                  marginLeft: "2rem",
                }}
                style={globalbuttonstyle}
              >
                <SearchIcon />
              </IconButton>
            ) : (
              <CustomTextField
                fullWidth={true}
                type={"search"}
                sx={{
                  width: "18rem",
                  "& .MuiInputBase-root": {
                    height: "36px",
                  },
                }}
                variant={"outlined"}
                name={"alertSearch"}
                placeholder={"Search based on Title"}
                handleChange={handlesearchChange}
                margin={"normal"}
                required={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setShowSearchbox(!showSerchbox);
                          setNotes(globalnotes);
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}

            <IconButton
              onClick={handleOpen}
              sx={{
                // backgroundColor: "violet",
                alignSelf: "center",
                display: "flex",
                marginLeft: "2rem",
              }}
              style={globalbuttonstyle}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={closeiconstyle}>
            <CloseSharp onClick={handleClose} />
          </IconButton>
          <Typography variant="h6" component="h2">
            {modelButton === "Add Note" ? "ADD A NEW NOTE" : "EDIT THE NOTE"}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <form onSubmit={handleSubmit}>
            <CustomTextField
              fullWidth={true}
              type={"search"}
              label={"Title"}
              variant={"outlined"}
              name={"title"}
              value={formObj["title"]}
              placeholder={"Enter your Title"}
              handleChange={handleChange}
              error={"title" in error}
              helperText={error["title"] || ""}
              margin={"normal"}
              required={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SubtitlesIcon />
                  </InputAdornment>
                ),
              }}
            />
            <CustomTextField
              fullWidth={true}
              handleChange={handleChange}
              label={"Value"}
              variant={"outlined"}
              name={"value"}
              value={formObj["value"]}
              placeholder={"Enter your Note of 1024 characters only"}
              multiline={true}
              rows={4}
              margin={"normal"}
              required={true}
            />
            <Button type="submit" variant="contained" sx={globalbuttonstyle}>
              {modelButton}
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={readMoreOpen}
        onClose={handleReadMoreClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <HighlightOffIcon sx={closeiconstyle} onClick={handleReadMoreClose} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {formObj.title}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {formObj.value}
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={deletePopUp}
        onClose={handledeletepopupClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you really want to delete the notes?
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            sx={globalbuttonstyle}
            style={{ marginRight: 8 }}
            onClick={() => {
              handleDelete();
              handledeletepopupClose();
            }}
          >
            YES
          </Button>
          <Button
            variant="contained"
            sx={globalbuttonstyle}
            onClick={() => handledeletepopupClose()}
          >
            NO
          </Button>
        </Box>
      </Modal>

      {notes.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "76.6vh",
          }}
        >
          <img
            src="/assets/notfound/no-data-found-3.png"
            alt="No alerts found"
            style={{
              width: window.innerWidth > 500 ? "45vw" : "100vw",
            }}
          />
        </div>
      ) : (
        notes.map((note, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={note.note_id}
            style={gridStyles}
            onMouseEnter={() => {
              setHoveredNote(note.note_id);
            }}
            onMouseLeave={() => {
              setHoveredNote(null);
            }}
          >
            <Card
              sx={{
                maxWidth: 345,
                height: "34rem",
                padding: "1rem",
                transform:
                  hoveredNote === note.note_id ? "scale(1.05)" : "scale(1)",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                    {note.title[0]}
                  </Avatar>
                }
                title={<h2 style={{ wordBreak: "break-all", textTransform: "uppercase" }}>{note.title}</h2>}
                action={
                  <IconButton onClick={(e) => handleClick(e, index)}>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <Popover
                open={ancheropen}
                anchorEl={anchorEl}
                onClose={handleancherClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box sx={{ padding: "16px" }}>
                  <IconButton
                    color="success"
                    onClick={() => handleEdit(notes[noteId])}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    onClick={() => handledeletepopupOpen(notes[noteId])}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Popover>
              <CardMedia
                component="img"
                image={`/assets/notes/note${index % 18}.jpg`}
                alt="note img"
                sx={{ borderRadius: "50%" }}
              />
              <CardContent>
                {note.value.length <= 80 ? (
                  <Typography variant="body1">{note.value}</Typography>
                ) : (
                  <Typography variant="body1">
                    {note.value.slice(0, 80)}...
                    {note.value.length > 80 && (
                      <span
                        className="read-more-link"
                        style={readmorelink}
                        onClick={() => {
                          handleReadMoreOpen();
                          setformObj(note);
                        }}
                      >
                        Read More
                      </span>
                    )}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};
