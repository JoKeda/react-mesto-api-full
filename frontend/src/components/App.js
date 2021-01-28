import React, {useState, useEffect} from "react"
import Header from "./Header";
import Footer from "./Footer";
import api from "../utils/api";
import {UserContext} from "../contexts/CurrentUserContext";
import Loader from "./Loader";
import Notification from "./Notification";
import { Switch,Route,Redirect,useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import {checkToken, login, register} from "../utils/auth";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";

function App() {
    const history = useHistory();
    const [selectedCard, setSelectedCard] = useState({});
    const [loading, setLoading] = useState(false);
    const [deletingCard, setDeletingCard] = useState({});
    const [notification, setNotification] = useState({type: '', text: '', open: false})
    const [popupsState, setPopupsState] = useState({
        isEditProfilePopupOpen: false,
        isAddPlacePopupOpen: false,
        isEditAvatarPopupOpen: false,
        isImageViewPopupOpen: false,
        isDeleteCardPopupOpen: false
    });

    const [currentUser, setCurrentUser] = useState({
        userName: '',
        isLoggedIn: false,
        userDescription: '',
        userAvatar: 'https://picsum.photos/id/237/200/300',
        cards: [],
    })
    let notificationTimeout;
    const showNotification = ({type, text}) => {
        setNotification({type, text, open: true});
        notificationTimeout = setTimeout(() => {
            setNotification({...notification, open: false});
        }, 4000)
    }
    const showError = () => {
        showNotification({text: 'Возникла какая-то проблема.', type: "error"})
    };
    const onNotificationClose = () => {
        clearTimeout(notificationTimeout);
        setNotification({...notification, open: false});
    }


    const closeAllPopups = () => {
        setPopupsState((prevState) => {
            const newState = {...prevState}
            for (let popup in newState) {
                newState[popup] = false;
            }
            return newState
        });
        setSelectedCard({});
    }

    const handleEditAvatarClick = () => {
        setPopupsState({...popupsState, isEditAvatarPopupOpen: true});
    }

    const handleEditProfileClick = () => {
        setPopupsState({...popupsState, isEditProfilePopupOpen: true});
    }

    const handleAddPlaceClick = () => {
        setPopupsState({...popupsState, isAddPlacePopupOpen: true});

    }

    const handleCardClick = (cardInfo) => {
        setSelectedCard(cardInfo);
        setPopupsState({...popupsState, isImageViewPopupOpen: true});
    }


    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        const likeRequest = !isLiked ? api.putLikeCard(card._id) : api.deleteLikeCard(card._id);
        likeRequest.then((newCard) => {
            const newCards = currentUser.cards.map((c) => c._id === card._id ? newCard : c);
            setCurrentUser({...currentUser, cards: newCards});
        }).catch(err => {
            showError();
        });
    }

    const handleCardDelete = () => {
        setLoading(true);
        let deleteRequest = api.deleteCard(deletingCard._id);

        deleteRequest.then(() => {
            const updatedCards = currentUser.cards.filter((card) => card._id !== deletingCard._id);
            setCurrentUser({...currentUser, cards: updatedCards});
            closeAllPopups();
            setDeletingCard({});
            showNotification({text: 'Карточка успешно удалена!'});
        }).catch(err => {
            showError();
        }).finally(() => {
            setLoading(false)
        })
    }
    const openDeletePopup = (card) => {
        setPopupsState({...popupsState, isDeleteCardPopupOpen: true});
        setDeletingCard(card);
    }

    const handleAddPlaceSubmit = (info) => {
        setLoading(true);
        return api.setCard(info.name, info.link).then((newCard) => {
            setCurrentUser({...currentUser,cards:[newCard,...currentUser.cards]});
            closeAllPopups();
            showNotification({text: 'Карточка успешно добавлена!'})
        }).catch(err => {
            showError();
        }).finally(() => {
            setLoading(false)
        });
    }

    const handleEditProfileSubmit = ({name, description}) => {
        setLoading(true);
        let editInfoRequest = api.setUserInfo(name, description);
        editInfoRequest.then((updatedUser) => {
            setCurrentUser({...currentUser, userName: updatedUser.name, userDescription: updatedUser.about});
            closeAllPopups();
            showNotification({text: 'Профиль успешно изменён!'});
        }).catch(err => {
            showError();
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleEditAvatarSubmit = (uri) => {
        setLoading(true);
        api.updateUserPicture(uri).then((user) => {
            setCurrentUser({...currentUser, userAvatar: user.avatar});
            showNotification({text: 'Аватар успешно изменён!'});
            closeAllPopups();
        }).catch(err => {
            showError();
        }).finally(() => {
            setLoading(false)
        })
    }

    //Auth


    const handleSignIn = async (email,password,setEmail,setPassword) => {
        setLoading(true);
        try {
         const data = await login({email, password});
         if(data?.token){
             setCurrentUser({...currentUser,isLoggedIn:true })
             setEmail('');
             setPassword('');
         }
         if(!data){
         showNotification({type:'error',text:'Неправильный имейл/пароль!'});
         }
         setLoading(false);
        }catch (e){
            setLoading(false);
            showError()
        }
    }
    const handleSignUp = async (email,password) => {
        setLoading(true);
        try{
            await register({email,password});
            showNotification({text:'Регистрация прошла успешно!'})
            history.push('/sign-in')
        setLoading(false);
        }catch (e){
            showNotification({type:'error',text:e?.message ?? e });
            setLoading(false);
        }
    }
    const handleSignOut = () => {
        localStorage.removeItem('token');
        setCurrentUser({isLoggedIn:false});
    }

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            setLoading(true);
        (async ()=>{
            try{
                const data = await checkToken(token);
                if(data){
                    setCurrentUser({...currentUser, isLoggedIn:true,email:data?.email})
                }
                setLoading(false)
            }catch (e) {
                console.log(e)
                setLoading(false)
            }
        })()
        }
    },[])

    const getMainInfo = () => {
        setLoading(true);
        Promise.all([api.getUserInfo(),api.getInitialCards()]).then(([currentUserInfo, cardsInfo]) => {
            setCurrentUser({
                ...currentUser,
                userName: currentUserInfo.name,
                userDescription: currentUserInfo.about,
                userAvatar: currentUserInfo.avatar,
                cards: cardsInfo ?? [],
                email:currentUserInfo.email,
                _id: currentUserInfo._id,
            })

        }).catch(error => {
            showError()
        }).finally(()=>{
            setLoading(false);
        })
    }


    return (
        <UserContext.Provider value={currentUser}>
            {loading && <Loader/>}
            <div className="page">
                <Notification info={notification} onClose={onNotificationClose}/>
                <Header loggedIn={currentUser.isLoggedIn} onSignOut={handleSignOut} email={currentUser?.email}/>
                    <Switch>
                       <ProtectedRoute
                           component={Main}
                           onAddPlace={handleAddPlaceClick}
                           onEditProfile={handleEditProfileClick}
                           onCardClick={handleCardClick}
                           onCardDeleteClick={openDeletePopup}
                           onCardLike={handleCardLike}
                           onGetInfo={getMainInfo}
                           onEditAvatar={handleEditAvatarClick}
                           path={'/'}
                           exact
                           isLoggedIn={currentUser?.isLoggedIn}
                       />
                       <Route exact path='/sign-in'>
                           {!currentUser.isLoggedIn ? (<Login onSignIn={handleSignIn}/>) : <Redirect to='/'/>}
                       </Route>
                        <Route exact path='/sign-up'>
                           {!currentUser.isLoggedIn ? (<Register onSignUp={handleSignUp}/>) : <Redirect to='/'/>}
                       </Route>
                    </Switch>
                <Footer/>
                <AddPlacePopup onSubmit={handleAddPlaceSubmit} open={popupsState.isAddPlacePopupOpen}
                               onClose={closeAllPopups}/>
                <DeleteCardPopup onSubmit={handleCardDelete} open={popupsState.isDeleteCardPopupOpen}
                                 onClose={closeAllPopups}/>
                <EditProfilePopup onSubmit={handleEditProfileSubmit} open={popupsState.isEditProfilePopupOpen}
                                  onClose={closeAllPopups}/>
                <EditAvatarPopup onSubmit={handleEditAvatarSubmit} open={popupsState.isEditAvatarPopupOpen}
                                 onClose={closeAllPopups}/>
                <ImagePopup isOpen={popupsState.isImageViewPopupOpen} onClose={closeAllPopups} card={selectedCard}/>
            </div>
        </UserContext.Provider>
    );
}

export default App;
