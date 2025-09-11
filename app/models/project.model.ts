// ./app/model/project.model.ts
import mongoose from "mongoose";

const projectShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required."],
    trim: true,
    maxlength: [50, "Project name cannat exceed 50 characters."],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Project name cannot exceed 500 characters."],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    //ref: User,
    required: true,
  },
  isActive: {
    type: Boolean,
    defaul: true,
  },
}, { timestamps:true });

const Project = mongoose.model("Project", projectShema);

export default Project;

