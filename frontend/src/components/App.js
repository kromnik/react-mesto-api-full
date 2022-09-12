import { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  
  const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true) };
  const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(true) };
  const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(true) };
  const handleCardClick = (cardData) => { setSelectedCard(cardData) };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setInfoToolTipPopupOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    auth
      .getContent()
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });  
  }, [history]);
  
  useEffect(() => {
    api
      .getInitialData()
      .then((data) => {
        const [currentUser, cardsData] = data;
        setCurrentUser(currentUser);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateUser(data) {
    api.setUserInfoApi(data)
      .then((userInfo) => {
        setCurrentUser(userInfo.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateAvatar(data) {
    api.setUserAvatarApi(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleAddPlaceSubmit(data) {
    api.postCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleRegisterSubmit(data) {
    auth
      .register(data)
      .then(() => {
        setInfoToolTipPopupOpen(true);
        setIsSuccess(true);
        history.push('./sign-in')
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  };

  function handleLoginSubmit(data) {
    auth
      .authorize(data)
      .then(() => {
        setLoggedIn(true);
        setEmail(data.email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
        setEmail('');
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
      }); 
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page-container">
          <Header email={email} onSignOut={handleSignOut}/>
          <Switch>
            <ProtectedRoute
              exact path="/"
              component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}           
            />
            <Route path="/sign-up">
              <Register onRegister={handleRegisterSubmit}/>
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLoginSubmit}/>
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          {loggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />  
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
