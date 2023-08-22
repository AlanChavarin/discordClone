const ObjectId = require('mongodb').ObjectId

//these fixtures require process.env.JWT_SECRET to be mocked as 
//process.env.JWT_SECRET = 'UWERTMCMY789ST579HMSECRGHUMISDCRTGNJKDCFVGNJZSDFNLNJ;XDFVKLNJXDFVKLNJSDRFHJKL;DRFGSKHUSDFQWERTYUSDVJXB'

module.exports = [
    {
        "_id": new ObjectId('64e291054df05085bb55ee72'),
        "username": 'Obama',
        "password": '$2a$10$0rfVMu0t4uuDPmVSdq9Vxe/550S8Wbihc2L2kz4tGInZvEn0x3P6a',
        //password is hunter12
        //token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTI5MTA1NGRmMDUwODViYjU1ZWU3MiIsImlhdCI6MTY5MjYwNjE5NH0.aOHHi1By73u901P4f9NQ6M_-U9yYNIQLx5ee3HfGTpc
    },
    {
        "_id": new ObjectId("64e2b0093410f80845413ad4"),
        "username": 'Joe Biden',
        "password": '$2a$10$44Hy6Lz4wm651omJ0ZFd9.EXLxmTF8EwNnVGo1gCd4CYNNB96vBx2',
        //password is 321happy
    }
]