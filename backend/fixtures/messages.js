const ObjectId = require('mongodb').ObjectId

module.exports = [
    {
        "_id": new ObjectId("64e1988f48230a00fcc62cdb"),
        "message": 'Hiii everyone!',
        "userId": new ObjectId('64e291054df05085bb55ee72'),
        "username": 'Obama',
        "createdAt": '2001-03-22T12:00:00',
    },
    {
        "_id": new ObjectId("64e1a2bc0eae3f7e33e15515"),
        "message": 'Whats up jonathan',
        "userId": new ObjectId("64e2b0093410f80845413ad4"),
        "username": 'Joe Biden',
        "createdAt": '2001-03-22T12:01:30',
    },
    {
        "_id": new ObjectId("64e1a2dc9dd114d3ff2ba4ad"),
        "message": 'Nothing much bro just got back from school. It was a long day',
        "userId": new ObjectId('64e291054df05085bb55ee72'),
        "username": 'Obama',
        "createdAt": '2001-03-22T12:03:45',
    },
    {
        "_id": new ObjectId("64e1a2e2ebcde67f778ba92e"),
        "message": 'Take that time to relax man. I know you have been overworked all week too.',
        "userId": new ObjectId("64e2b0093410f80845413ad4"),
        "username": 'JoeBiden',
        "createdAt": '2001-03-22T12:04:11',
    },
    {
        "_id": new ObjectId("64e1a2e6dce0c8e898895e2f"),
        "message": 'I know dawg, thats why Im going to stay inside and play Diablo 4 all weekend. ',
        "userId": new ObjectId('64e291054df05085bb55ee72'),
        "username": 'Obama',
        "createdAt": '2001-03-22T12:04:57',
    },
]