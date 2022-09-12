import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"} popup_background-dark-signup`}>
      <div className='popup__container'>
        <button
          className='popup__close-button'
          type='button'
          aria-label='Закрыть'
          onClick={props.onClose}
        ></button>
        { props.isSuccess ? (
            <>
              <img
                className='popup__infotooltip-image'
                src={successIcon}
                alt='Регистрация успешна!'
              />
              <p className='popup__infotooltip-message'>
                Вы успешно зарегистрировались!
              </p>
            </>
          ) : (
            <>
              <img
                className='popup__infotooltip-image'
                src={failIcon}
                alt='Регистрация не выполнена.'
              />
              <p className='popup__infotooltip-message'>
                Что-то пошло не так! Попробуйте ещё раз.
              </p>
            </>
          )
        }
      </div>
    </div>
  );
}

export default InfoTooltip;