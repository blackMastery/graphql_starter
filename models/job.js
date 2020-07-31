const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        text: true
    },
    description: {
        type: String,
        required: true,


    },
    paymentStyle: {
        type: String,
        required: true,
        enum: {
            values: ['daily rate', 'fixed price']
        }
    },
    experienceLevel: {
        type: String,
        required: true,
        enum: {
            values: ['entry', 'intermediate', 'expert']
        }
    },
    jobType: {
        type: String,
        required: true,
        enum: {
            values: ['one time project', 'ongoing project'],
            message: 'must choose a project type'
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: String,
        required: true,
    },
    skills: [
        {
            type: String,
            trim: true

        }
    ],
    availability: {
        type: String,
        required: [true, 'Must select availability'],
        enum: {
            values: ['More than 30 hr/week', 'Less than 30hrs/week', 'As needed - open to offer'],

        }
    },
    interviewing: {
        type: Number,
        default: 0
    },
    invitesSent: {
        type: Number,
        default: 0
    },
    close: {
        type: Boolean,
        default: false
    }



},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)


jobSchema.index({ title: 'text' })

jobSchema.virtual('proposals', {
    ref: 'Proposal',
    foreignField: 'job',
    localField: '_id',
    count: true // And only get the number of docs

});


jobSchema.pre(/^find/, function (next) {
    this.select('-__v');
    next()
})

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
