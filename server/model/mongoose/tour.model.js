const { Schema, model } = require('mongoose')

const tourSchema = new Schema({
    _id: Schema.Types.ObjectId,
    tourName: String,
    locations: [String],
    registerCost: Number,
    description: String,
    tourGuide: Schema.Types.ObjectId,
    contactNumber: String,
    creationTime: Date,
    beginTime: Date,
    endTime: Date,
    closeFeedbackTime: Date,
    closeRegisterTime: Date,
    durationTime: Number,
    status: String,
    isActive: Boolean,
    schedule: [{
        _id: Schema.Types.ObjectId,
        beginTime: Date,
        endTime: Date,
        location: String,
        task: [String],
        cost: Number,
        perform: [String],
        note: [String],
        isActive: Boolean,
    }],
    prepare: [{
        _id: Schema.Types.ObjectId,
        itemName: String,
        amount: Number,
        unit: String,
        perform: [{
            memberName: String,
            amount: Number,
        }],
        status: String,
        deadline: Date,
        note: String,
        isActive: Boolean,
    }],
    feedback: [{
        _id: Schema.Types.ObjectId,
        from: String,
        content: String,
        time: Date,
        isActive: Boolean,
    }],
    member: [{
        memberId: String,
        cost: Number,
        contactNumber: String,
    }]
})

const Tour = model('Tour', tourSchema, 'Tours')

module.exports = {
    Tour
}