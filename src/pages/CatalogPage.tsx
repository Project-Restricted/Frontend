import { Header } from '../components/Header/Header';

export const CatalogPage = () => {
  return (
    <>
      <Header 
        currentUser={null}
        onLoginClick={() => console.log('Вход')}
        onRegisterClick={() => console.log('Регистрация')}
        onLogoutClick={() => console.log('Выход')}
        onProfileClick={() => console.log('Профиль')}
      />
      <div></div>
    </>
  );
};