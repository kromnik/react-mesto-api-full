import { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  
  function handleNameChange(e) {
    setName(e.target.value);
  }
  
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      name="update-avatar"
      title="Редактировать профиль"
      buttonSubmitText="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="userName-input"
        className="popup__userinfo popup__userinfo_info_username"
        type="text"
        name="name"
        required
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        value={ name || ''}
        onChange={handleNameChange}
      />
      <span className="userName-input-error popup__form-input-error"></span>
      <input
        id="userNameInfo-input"
        className="popup__userinfo popup__userinfo_info_user-about"
        type="text"
        name="about"
        required
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        autoComplete="off"
        value={ description || ''}
        onChange={handleDescriptionChange}
      />
      <span className="userNameInfo-input-error popup__form-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;