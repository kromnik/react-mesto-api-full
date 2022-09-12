function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button
            className='popup__submit-button'
            type="submit"
          >
            {props.buttonSubmitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
