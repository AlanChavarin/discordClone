import { render, act, fireEvent, waitFor } from '@testing-library/react'
import LoginServiceTesterComponent from './LoginServiceTesterComponent'
import { UserProvider } from "../context/UserContext"

//integration tests, spins up backend and in memory server plus fixtures

describe('useLoginService (integration tests)', () => {

    afterEach(() => localStorage.clear())

    test('Does logging in work?', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTI5MTA1NGRmMDUwODViYjU1ZWU3MiIsImlhdCI6MTY5MjYwNjE5NH0.aOHHi1By73u901P4f9NQ6M_-U9yYNIQLx5ee3HfGTpc'}),
            })
        )

        const {getByTestId, queryByTestId, queryByText} = render(
            <UserProvider>
                <LoginServiceTesterComponent username={'Obama'} password={'hunter12'}/>
            </UserProvider>
        )

        expect(getByTestId('loggedOutElement')).toBeTruthy()
        
        act(() => {
            fireEvent.click(getByTestId('submitButtonLogin'))
        })

        await waitFor(() => {
            expect(queryByTestId('loggedInElement')).toBeTruthy()
            expect(queryByText('Currently logged in as: Obama')).toBeTruthy()
            expect(localStorage.getItem('user')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTI5MTA1NGRmMDUwODViYjU1ZWU3MiIsImlhdCI6MTY5MjYwNjE5NH0.aOHHi1By73u901P4f9NQ6M_-U9yYNIQLx5ee3HfGTpc')
            expect(queryByText('login success')).toBeTruthy()
        })
        
    })

    test('Does logging in with incorrect credentials work?', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({errorMessage: 'Incorrect credentials'}),
            })
        )

        const {getByTestId, queryByRole} = render(
            <UserProvider>
                <LoginServiceTesterComponent username={'Obama'} password={'hunter12'}/>
            </UserProvider>
        )

        expect(getByTestId('loggedOutElement')).toBeTruthy()

        act(() => {
         fireEvent.click(getByTestId('submitButtonLogin'))
        })

        await waitFor(() => {
            expect(getByTestId('loggedOutElement')).toBeTruthy()
            expect(localStorage.getItem('user')).toBeNull()
        })
        
    })

    test('does registering work?', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTI5MTA1NGRmMDUwODViYjU1ZWU3MiIsImlhdCI6MTY5MjYwNjE5NH0.aOHHi1By73u901P4f9NQ6M_-U9yYNIQLx5ee3HfGTpc',
                    username: 'Obama'
                }),
            })
        )

        const {getByTestId, queryByTestId, queryByText, queryByRole} = render(
            <UserProvider>
                <LoginServiceTesterComponent username={'Obama'} password={'hunter12'}/>
            </UserProvider>
        )

        expect(getByTestId('loggedOutElement')).toBeTruthy()
        
        act(() => {
            fireEvent.click(getByTestId('submitButtonRegister'))
        })

        await waitFor(() => {
            expect(queryByTestId('loggedInElement')).toBeTruthy()
            expect(queryByText('Currently logged in as: Obama')).toBeTruthy()
            expect(localStorage.getItem('user')).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTI5MTA1NGRmMDUwODViYjU1ZWU3MiIsImlhdCI6MTY5MjYwNjE5NH0.aOHHi1By73u901P4f9NQ6M_-U9yYNIQLx5ee3HfGTpc')
            expect(queryByText('register success')).toBeTruthy()
        })

    })

    test('does registering with an error work?', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    errorMessage: 'Error registering'
                }),
            })
        )

        const {getByTestId, queryByTestId, queryByText, queryByRole} = render(
            <UserProvider>
                <LoginServiceTesterComponent username={'Obama'} password={'hunter12'}/>
            </UserProvider>
        )

        expect(getByTestId('loggedOutElement')).toBeTruthy()
        
        act(() => {
            fireEvent.click(getByTestId('submitButtonRegister'))
        })

        await waitFor(() => {
            expect(queryByTestId('loggedOutElement')).toBeTruthy()
            expect(localStorage.getItem('user')).toBeNull()
        })

    })


})