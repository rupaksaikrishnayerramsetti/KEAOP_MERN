export type Notetype = {
  note_id: number;
  title: string;
  value: string;
};

export type noteformtype = {
  title: string;
  value: string;
};

export type FormErrortype = {
  title?: string | undefined;
};

export function showsearchednotes(notes: Notetype[], note_title: string) {
  return notes.filter((note) =>
    note.title.toLowerCase().includes(note_title.toLowerCase())
  );
}

type NoteObject = Record<number, { note_id: number; title: string; value: string }>;

export const transformdata = (notes: Notetype[]) => {
  let finalnotes:NoteObject = {};
  notes.map((note) => {
    finalnotes[note.note_id] = note;
  })
  return finalnotes;
}