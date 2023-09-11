import { render, fireEvent, act } from "@testing-library/react"
import { UserProvider } from "./UserContext"
import UserContext from './UserContext'

describe('UserContext', () => {
    test('is name empty by default?', () => {
        const {getByTestId} = render(
            <UserProvider>
                <UserContext.Consumer>
                    {
                        value => <><div data-testid='test'>{value.userData.name}</div></>
                    }
                </UserContext.Consumer>
            </UserProvider>
        )

        const element = getByTestId('test')

        expect(element.textContent).toBe('')
    })

    test('can name be changed?', () => {
        const {getByTestId} = render(
            <UserProvider>
                <UserContext.Consumer>
                    {({userData, setUserData}) => <>
                        <div data-testid='test'>{userData.name}</div>
                        <button data-testid='button' onClick={() => setUserData({'name': 'Jimmy'})}>Change Name</button>
                    </>}
                </UserContext.Consumer>
            </UserProvider>
        )

        const div = getByTestId('test')
        const button = getByTestId('button')

        act(() => {
            fireEvent.click(button)
        })

        expect(div.textContent).toBe('Jimmy')
    })
})

