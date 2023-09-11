import { renderHook, act } from '@testing-library/react'
import useMessageService from '../service/useMessageService'

describe('message service', () => {

    test('does getMessage work', () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    "_id": "64e59c54de99001550e685ce",
                    "message": 'I love pizza! ',
                    "userId": '64e291054df05085bb55ee72',
                    "username": 'Obama',
                    "createdAt": '2002-03-23T12:04:57',
                    "parentChannel": '64e5937628dfb2824b6759ab'
                }),
            })
        )

        const { result }  = renderHook(() => useMessageService())
        const { getMessage } = result.current

        act(() => {
            getMessage('64e59c54de99001550e685ce')
            .then(data => {
                expect(data).toMatchObject({
                    "_id": "64e59c54de99001550e685ce",
                    "message": 'I love pizza! ',
                    "userId": '64e291054df05085bb55ee72',
                    "username": 'Obama',
                    "createdAt": '2002-03-23T12:04:57',
                    "parentChannel": '64e5937628dfb2824b6759ab'
                })
            })
        })
    })

    test('does getMessagesByChannel work?', () => {

        const fixtures = [
            {
                "_id": "64e59c54de99001550e685ce",
                "message": 'I love pizza! ',
                "userId": '64e291054df05085bb55ee72',
                "username": 'Obama',
                "createdAt": '2002-03-23T12:04:57',
                "parentChannel": '64e5937628dfb2824b6759ab'
            },
            {
                "_id": "64e59f1326df58fcb3010177",
                "message": 'Same, especially with Pineapple! ',
                "userId": '64e2b0093410f80845413ad4',
                "username": 'JoeBiden',
                "createdAt": '2002-03-23T12:05:07',
                "parentChannel": '64e5937628dfb2824b6759ab'
            }
        ]

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(fixtures),
            })
        )

        const { result }  = renderHook(() => useMessageService())
        const { getMessagesByChannel } = result.current

        act(() => {
            getMessagesByChannel('asdf1234')
            .then(data => {
                expect(data).toEqual(fixtures)
            })
        })


    })
})

