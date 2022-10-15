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
	req.flash('success_mgs', 'Note added successfully');
	res.redirect('/notes');
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
notesCtrl.renderEditForm = async (req, res) => {
	const note = await Note.findById(req.params.id).lean();
	res.render('notes/new-note', {
		title: 'Edit note',
		note,
	});
};
notesCtrl.updateNote = async (req, res) => {
	const { title, description } = req.body;
	await Note.findByIdAndUpdate(req.params.id, { title, description });
	req.flash('success_mgs', 'Note updated successfully');
	res.redirect('/notes', 200, {
		title: 'All notes',
	});
};

//  Delete
notesCtrl.deleteNote = async (req, res) => {
	await Note.findByIdAndDelete({ _id: req.params.id });
	req.flash('success_mgs', 'Note deleted successfully');
	res.redirect('/notes', 200, {
		title: 'All notes',
	});
};

module.exports = notesCtrl;
