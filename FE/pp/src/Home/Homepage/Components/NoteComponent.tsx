import { Typography, Grid, Box } from "@mui/material";
import { paperStyles } from "../../Note/Note.style";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Notetype } from "../../Note/Note.utility";
import axios from "axios";
import { globalColors } from "../../../styles/Colors";
import React from "react";
import { BASE_URL } from "../../../constants";

export const NoteComponent = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Notetype[]>([]);
  const [notesCount, setNotesCount] = useState(0);
  const [hoveredNote, setHoveredNote] = useState<number | null>(null);

  const fetchNotes = async () => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      const response = await axios.get(`${BASE_URL}/fetchNotes`, {
        headers: {
          Authorization: `${jwt_token}`,
        },
      });
      console.log(response.data["count"]);
      console.log(response.data["data"]);
      setNotes(response.data["data"]);
      setNotesCount(response.data["count"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [notesCount]);
  return (
    <Box>
      <Typography
        sx={{ textAlign: "left", marginLeft: "3%", fontWeight: "bold" }}
        variant="h4"
      >
        Recent Notes
      </Typography>
      <Box
        sx={{
          padding: "3rem",
          marginBottom: "3rem",
        }}
      >
        {notes.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <img
              src="/assets/notfound/no-data-found-3.png"
              alt="No notes found"
              style={{ width: window.innerWidth > 500 ? "45vw" : "80vw" }}
            />
          </div>
        ) : (
          <Grid container spacing={{ xs: 10, lg: 6 }}>
            {notes.map((note) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                key={note.note_id}
                onMouseEnter={() => {
                  setHoveredNote(note.note_id);
                }}
                onMouseLeave={() => {
                  setHoveredNote(null);
                }}
              >
                <Box
                  sx={paperStyles}
                  style={{
                    transform:
                      hoveredNote === note.note_id ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", marginBottom: "1rem" }}
                  >
                    {note.title}
                  </Typography>
                  <Box
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    {note.value.length <= 100 ? (
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "1.2rem",
                          color: globalColors.normaltext,
                        }}
                      >
                        {note.value}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "1.2rem",
                          color: globalColors.normaltext,
                        }}
                      >
                        {note.value.slice(0, 80)}...
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
