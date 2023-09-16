import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'
import PasswordList from './components/PasswordList'

const initialPasswordsList = []

class App extends Component {
  state = {
    passwordsList: initialPasswordsList,
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isChecked: false,
  }

  getWebsite = event => {
    this.setState({website: event.target.value})
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPasswordList = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    if (website !== '' && username !== '' && password !== '') {
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPasswordList],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  deletePasswordCard = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachPassword => eachPassword.id !== id,
      ),
    }))
  }

  onChangeSearchPasswordList = event => {
    this.setState({searchInput: event.target.value})
  }

  togglePassword = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  render() {
    const {
      passwordsList,
      website,
      username,
      password,
      isChecked,
      searchInput,
    } = this.state

    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="password-manager-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />

        <div className="add-password-container">
          <div className="form-container">
            <h1 className="form-title">Add New Password</h1>
            <form className="form-card" onSubmit={this.onAddPassword}>
              <div className="input-card">
                <div className="input-icon-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-icons-img"
                  />
                </div>
                <div className="input-cards">
                  <input
                    type="text"
                    className="input-card"
                    placeholder="Enter Website"
                    onChange={this.getWebsite}
                    value={website}
                  />
                </div>
              </div>
              <div className="input-card">
                <div className="input-icon-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-icons-img"
                  />
                </div>
                <div className="input-cards">
                  <input
                    type="text"
                    className="input-card"
                    placeholder="Enter Username"
                    onChange={this.getUsername}
                    value={username}
                  />
                </div>
              </div>
              <div className="input-card">
                <div className="input-icon-card">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-icons-img"
                  />
                </div>
                <div className="input-cards">
                  <input
                    type="password"
                    value={password}
                    className="input-card"
                    placeholder="Enter Password"
                    onChange={this.getPassword}
                  />
                </div>
              </div>
              <div className="button-card">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>

        <div className="add-password-list-container">
          <div className="password-count-search-container">
            <div className="password-count-card">
              <h1 className="your-password-title">Your Passwords</h1>
              <div className="passwords-count">
                <p className="count">{passwordsList.length}</p>
              </div>
            </div>
            <div className="search-card">
              <div className="input-icon-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="input-icons-img"
                />
              </div>
              <div className="input-cards">
                <input
                  type="search"
                  value={searchInput}
                  className="input-card"
                  placeholder="Search"
                  onChange={this.onChangeSearchPasswordList}
                />
              </div>
            </div>
          </div>

          <hr className="separator" />

          <div className="toggle-password-card">
            <input
              type="checkbox"
              id="checkbox"
              onChange={this.togglePassword}
              checked={isChecked}
            />
            <label htmlFor="checkbox">Show Passwords</label>
          </div>

          <>
            {searchResults.length > 0 ? (
              <ul className="passwords-lists-container">
                {searchResults.map(eachPassword => (
                  <PasswordList
                    passwordListDetails={eachPassword}
                    key={eachPassword.id}
                    deletePasswordCard={this.deletePasswordCard}
                    isChecked={isChecked}
                  />
                ))}
              </ul>
            ) : (
              <div className="no-passwords-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-img"
                />
                <p className="no-passwords">No Passwords</p>
              </div>
            )}
          </>
        </div>
      </div>
    )
  }
}

export default App
