import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef();
  
  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen])
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }
  
  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      buttonSubmitText="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="avatarLink-input"
        className="popup__userinfo popup__userinfo_avatar_link"
        type="url"
        name="avatar"
        required
        placeholder="Ссылка на аватар"
        autoComplete="off"
        ref={avatarRef}
      />
      <span className="avatarLink-input-error popup__form-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
