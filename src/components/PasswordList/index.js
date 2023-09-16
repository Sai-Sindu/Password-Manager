import './index.css'

const PasswordList = props => {
  const {passwordListDetails, deletePasswordCard, isChecked} = props
  const {website, username, password, id} = passwordListDetails

  const onDeletePasswordCard = () => {
    deletePasswordCard(id)
  }

  return (
    <li className="password-list-card">
      <div className="profile">
        <div className="profile-card">{username[0]}</div>
        <div className="profile-text-card">
          <p className="text">{website}</p>
          <p className="text">{username}</p>
          {isChecked ? (
            <p className="text">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="password-img"
            />
          )}
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        data-testid="delete"
        onClick={onDeletePasswordCard}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}
export default PasswordList
