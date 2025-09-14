// ./app/model/project.model.ts
import mongoose from "mongoose";
import { logger } from "../utils/logger";

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
 // createdBy: {
   // type: mongoose.Schema.Types.ObjectId,
    //ref: User,
   // required: true,
 // },
  isActive: {
    type: Boolean,
    defaul: true,
  },
}, { timestamps:true });

// Middleware for loggin

projectShema.post("save", function (doc) {
  logger.debug(`Project saved: ${doc.name}`)
});

projectShema.post("findOneAndUpdate", function(doc){
  logger.debug(`Project updated: ${doc.name}`)
});

projectShema.post("findOneAndDelete", function(doc){
  logger.debug(`Project deleted: ${doc.name}`)
});

const Project = mongoose.model("Project", projectShema);

export default Project;

