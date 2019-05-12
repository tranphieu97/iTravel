const { Schema, model } = require('mongoose')

const tourSchema = new Schema({
    _id: Schema.Types.ObjectId,
    tourName: String,
    locationIds: [String],
    registerCost: Number,
    description: String,
    tourGuideId: Schema.Types.ObjectId,
    contactNumber: String,
    creationTime: Date,
    beginTime: Date,
    endTime: Date,
    closeFeedbackTime: Date,
    closeRegisterTime: Date,
    durationTime: Number,
    memberLimit: Number,
    status: String,
    // PENDING, REGISTERING, RUNNING, FINISHED
    isActive: Boolean,
    schedules: [{
        beginTime: Date,
        endTime: Date,
        location: String,
        tasks: [String],
        cost: Number,
        performerIds: [String],
        note: String,
        isActive: Boolean,
    }],
    preparations: [{
        itemName: String,
        amount: Number,
        unit: String,
        performers: [{
            memberName: String,
            amount: Number,
            status: String
            // PREPARING, FINISHED
        }],
        status: String,
        // PREPARING, FINISHED
        deadline: Date,
        note: String,
        isActive: Boolean,
    }],
    feedbacks: [{
        from: String,
        content: String,
        time: Date,
        isActive: Boolean,
    }],
    members: [{
        memberId: String,
        cost: Number,
        contactNumber: String,
    }]
})

const Tour = model('Tour', tourSchema, 'Tours')

module.exports = {
    Tour
}