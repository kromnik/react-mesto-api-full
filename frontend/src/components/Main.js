import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-block">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="фото аватара"
          />
          <button
            className="profile__avatar-edit-button"
            type="button"
            onClick={props.onEditAvatar}
            aria-label="Изменить аватар"
          ></button>
        </div>
        <div className="profile__profile-info">
          <h1 className="profile__profile-info-username">{currentUser.name}</h1>
          <p className="profile__profile-info-user-about">{currentUser.about}</p>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
            aria-label="Редактировать"
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
          aria-label="Добавить"
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card 
            key={card._id} 
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
           />
        ))}
      </section>
    </main>
  );
}

export default Main;
