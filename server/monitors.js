const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    success: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const MonitorSchema = new Schema({
    url: {
        type: String,
        required: true,
        unique : true
    },
    
    name: {
        type: String,
        required: true
    },
    seconds: {
        type: Number,
        required : true,
    },
    responses: [responseSchema]
});

var Monitors = mongoose.model('monitors', MonitorSchema);

module.exports = Monitors;