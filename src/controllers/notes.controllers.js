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
	newNote.user = req.user.id;
	await newNote.save();
	req.flash('success_msg', 'Note added successfully');
	res.redirect('/notes');
};

// Get all
notesCtrl.renderNotes = async (req, res) => {
	const notes = await Note.find({ user: req.user.id }).sort({ createdAt: 'desc' }).lean();
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
	if (note.user != req.user.id) {
		req.flash('error_msg', 'Not authorized');
		return res.redirect('/notes');
	}
	res.render('notes/new-note', {
		title: 'Edit note',
		note,
	});
};
notesCtrl.updateNote = async (req, res) => {
	const { title, description } = req.body;
	await Note.findByIdAndUpdate(req.params.id, { title, description });
	req.flash('success_msg', 'Note updated successfully');
	res.redirect('/notes', 200, {
		title: 'All notes',
	});
};

//  Delete
notesCtrl.deleteNote = async (req, res) => {
	await Note.findByIdAndDelete({ _id: req.params.id });
	req.flash('success_msg', 'Note deleted successfully');
	res.redirect('/notes', 200, {
		title: 'All notes',
	});
};

module.exports = notesCtrl;
