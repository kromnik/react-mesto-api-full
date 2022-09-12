import { useEffect, useState } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [props.isOpen]);
  
  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: cardName,
      link: cardLink
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonSubmitText="Создать"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="cardName-input"
        className="popup__userinfo popup__userinfo_card_name"
        type="text"
        name="name"
        required
        placeholder="Название"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        value={ cardName || ''}
        onChange={handleCardNameChange}
      />
      <span className="cardName-input-error popup__form-input-error"></span>
      <input
        id="cardLink-input"
        className="popup__userinfo popup__userinfo_card_link"
        type="url"
        name="link"
        required
        placeholder="Ссылка на картинку"
        autoComplete="off"
        value={ cardLink || ''}
        onChange={handleCardLinkChange}
      />
      <span className="cardLink-input-error popup__form-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;