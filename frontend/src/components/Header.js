import { Switch, Route, Link } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="логотип Mesto Russia"
      />
      <Switch>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__auth-link">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__auth-link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__user-info">
            <p className="header__email">{props.email}</p>
            <Link to='/sign-in' className="header__auth-link" onClick={props.onSignOut}>
              Выйти
            </Link>
          </div>          
        </Route>
      </Switch>
    </header>
  );
}

export default Header;