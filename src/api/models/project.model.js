const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

/**
 * PROJECT Schema
 * @private
 */
const ProjectSchema = new mongoose.Schema({
    id: { type: Number },
    title: { type: String, required: true },
    pCode: { type: Number, unique: true } //project code
}, { timestamps: true }
);

ProjectSchema.plugin(AutoIncrement, {id:'project_seq', inc_field: 'pCode'});
  
/**
 * @typedef PROJECT
 */

module.exports = mongoose.model('project', ProjectSchema);