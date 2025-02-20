const Note = require('../models/Note');

exports.createNote = async (req, res) => {
    const { content } = req.body;
    const user = req.user;

    try {
        const note = new Note({
            user: user.id,
            content,
        });

        await note.save();
        res.status(201).json({note, msg: "Note created successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.deleteNote = async (req, res) => {
    const id = req.params.id;
    
    try {
        const note = await Note.findOne({ _id: id });
        if (!note) {
          return res.status(404).json({ msg: "Note not found" });
        }
    
        await Note.deleteOne({ _id: id });
        res.json({ msg: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getNotes = async (req, res) => {
    const userId = req.user.id;
    try {
        const notes = await Note.find({ user: userId });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

