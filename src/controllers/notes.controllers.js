const notesCtrl = {};

const Note = require('./../models/Note');

// Insert
notesCtrl.renderNoteForm = (req, res) => {
	res.render('notes/new-note', {
		title: 'New note',
	});
};
notesCtrl.createNewNote = async (req, res) => {
	const { title, description } = req.body;
	const newNote = new Note({ title, description });
	await newNote.save();
	res.send('New note');
};

// Get all
notesCtrl.renderNotes = async (req, res) => {
	const notes = await Note.find().lean();
	res.render('notes/all-notes', {
		notes,
		allowProtoMethodsByDefault: true,
		allowProtoPropertiesByDefault: true,
		allowedProtoMethods: {
			trim: true,
		},
	});
};

// Edit
notesCtrl.renderEditForm = (req, res) => {
	res.send('Form edit');
};
notesCtrl.updateNote = (req, res) => {
	res.send('Note updated');
};

//  Delete
notesCtrl.renderDeleteForm = (req, res) => {
	res.send('Form delete');
};
notesCtrl.deleteNote = (req, res) => {
	res.send('Note deleted');
};

module.exports = notesCtrl;
