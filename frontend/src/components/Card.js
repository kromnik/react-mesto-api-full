import  React  from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__btn-delete ${isOwn ? 'card__btn-delete_action_visible' : ''}`
  );
  
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-icon ${isLiked ? 'card__like-icon_action_like' : ''}`
  );
  
  function handleClick() {
    props.onCardClick(props.card);
  }
  
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  
  return (
    <article className="card">
      <img 
        className="card__image" 
        src={props.card.link} 
        alt={props.card.name}
        onClick={handleClick}
        />
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-block">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайкнуть"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>
    </article>
  );
}

export default Card;
