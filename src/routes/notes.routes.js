const { Router } = require('express');
const {
	renderNoteForm,
	createNewNote,
	renderNotes,
	renderEditForm,
	updateNote,
	renderDeleteForm,
	deleteNote,
} = require('./../controllers/notes.controllers');

const router = Router();

// New notes
router.get('/notes/add', renderNoteForm);
router.post('/notes/new-note', createNewNote);

// Get all notes
router.get('/notes', renderNotes);

// Edit note
router.get('/notes/edit/:id', renderEditForm);
router.put('/notes/edit/:id', updateNote);

// Delete note
router.get('/notes/delete/:id', renderDeleteForm);
router.delete('/notes/delete/:id', deleteNote);

module.exports = router;
