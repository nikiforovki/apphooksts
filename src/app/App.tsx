import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './styles/main.scss';
import Header from '@widgets/Header';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';
import { CurrentUserProvider } from '@shared/CurentUser';
import CurrentUserChecker from '@shared/useCurrentUserChecker/useCurrentUserChecker';
import Home from '@pages/Home';
import GlobalFeedPage from '@pages/globalFeedPage/GlobalFeedPage';
import MyFeedPage from '@pages/MyFeedPage';
import TagFeedPage from '@pages/tagFeedPage/TagFeedPage';
import CreateArticle from '@pages/CreateArticle';
import Settings from '@pages/Settings';
import UserProfiles from '@pages/UserProfiles';
import FavouritesPage from '@pages/FavouritesPage';
import EditArticle from '@features/EditArticle';
import { ROUTES } from '../shared/constants/routes';

const App: React.FC = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <Header />
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />,
            <Route path={ROUTES.EDIT_ARTICLE} element={<EditArticle />} />,
            <Route
              path={ROUTES.GLOBAL_FEED_PAGE}
              element={<GlobalFeedPage />}
            />
            ,
            <Route path={ROUTES.FAVOURITES_PAGE} element={<FavouritesPage />} />
            ,
            <Route path={ROUTES.USER_PROFILE} element={<UserProfiles />} />,
            <Route path={ROUTES.CREATE_ARTICAL} element={<CreateArticle />} />,
            <Route path={ROUTES.MY_FEED_PAGE} element={<MyFeedPage />} />,
            <Route path={ROUTES.TAG_FEED_PAGE} element={<TagFeedPage />} />,
            <Route path={ROUTES.SIGN_IN} element={<SignIn />} />,
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />,
            <Route path={ROUTES.SETTINGS} element={<Settings />} />
          </Routes>
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};

export default App;
