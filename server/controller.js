import asyncHandler from "express-async-handler";
import Note from "./model.js";

export const add_note = asyncHandler(async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      description: req.body.description,
    });
    res.json({
      success: true,
      status: "OK",
      message: "Note added successfully",
      error: null,
      data: note,
    });
  } catch (error) {
    res.json({
      success: false,
      status: "error",
      message: "All fields are required",
      error: error,
      data: null,
    });
  }
});

export const view_notes = asyncHandler(async (req, res) => {
  try {
    const notes = await Note.find({}).sort({ updatedAt: -1 });
    res.json({
      success: true,
      status: "OK",
      message: "Successfully get your notes",
      error: null,
      data: notes,
    });
  } catch (error) {
    res.json({
      success: false,
      status: "error",
      message: "Failed to get your notes",
      error: error,
      data: null,
    });
  }
});

export const view_note = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findById({ _id: req.params._id });
    res.json({
      success: true,
      status: "OK",
      message: "Successfully get your note",
      error: null,
      data: note,
    });
  } catch (error) {
    res.json({
      success: false,
      status: "error",
      message: "Failed to get your note",
      error: error,
      data: null,
    });
  }
});

export const update_note = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      { _id: req.params._id },
      { ...req.body },
      { new: true }
    );
    res.json({
      success: true,
      status: "OK",
      message: "Note updated successfully",
      error: null,
      data: note,
    });
  } catch (error) {
    res.json({
      success: false,
      status: "error",
      message: "Failed to update the note",
      error: error,
      data: null,
    });
  }
});

export const delete_note = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete({ _id: req.params._id });
    res.json({
      success: true,
      status: "OK",
      message: "Note deleted successfully",
      error: null,
      data: null,
    });
  } catch (error) {
    res.json({
      success: false,
      status: "error",
      message: "Failed to delete the note",
      error: error,
      data: null,
    });
  }
});
