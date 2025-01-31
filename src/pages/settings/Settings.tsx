import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '@shared/CurentUser';
import { auth, db } from '../../firebaseConfig';
import {
  updateEmail,
  updatePassword,
  sendEmailVerification,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  StaledFormContainer,
  StaledFormGroup,
  StaledErrorMessage,
  StaledSubmitButton,
} from './Settings.styled';
import { FormData } from './type';

const Settings = () => {
  const context = useContext(CurrentUserContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [isReauthenticating, setIsReauthenticating] = useState(false);

  if (!context || !context.currentUser) {
    return null;
  }

  const { currentUser } = context;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: currentUser.name || '',
      email: currentUser.email || '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (currentUser.uid) {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
          username: data.name,
        });

        toast.success('Имя пользователя обновлено в Firestore');
      }

      if (data.email !== currentUser.email || data.password) {
        setIsReauthenticating(true);

        const credential = EmailAuthProvider.credential(
          currentUser.email,
          currentPassword,
        );

        if (auth.currentUser) {
          await reauthenticateWithCredential(auth.currentUser, credential);
        }
      }

      if (data.email !== currentUser.email) {
        if (auth.currentUser) {
          await updateEmail(auth.currentUser, data.email);

          toast.success('Email обновлен в Firebase Authentication');

          await sendEmailVerification(auth.currentUser, {
            url: process.env.REACT_APP_EMAIL_REDIRECT_URL!,
          });

          toast.info(
            'Письмо для подтверждения нового email отправлено. Пожалуйста, проверьте ваш email.',
          );
        }
      }

      if (data.password) {
        if (auth.currentUser) {
          await updatePassword(auth.currentUser, data.password);

          toast.success('Пароль обновлен в Firebase Authentication');
        }
      }

      localStorage.setItem('name', data.name);
      localStorage.setItem('email', data.email);

      toast.success('Данные пользователя успешно обновлены');
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
      if (error instanceof Error) {
        toast.error(`Ошибка: ${error.message}`);
      } else {
        toast.error('Произошла неизвестная ошибка');
      }
    } finally {
      setIsReauthenticating(false);
    }
  };

  return (
    <StaledFormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StaledFormGroup>
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            type="text"
            placeholder={currentUser.name || 'Введите ваше имя'}
            {...register('name', { required: 'Имя обязательно' })}
          />
          {errors.name && (
            <StaledErrorMessage>{errors.name.message}</StaledErrorMessage>
          )}
        </StaledFormGroup>

        <StaledFormGroup>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder={currentUser.email || 'Введите ваш email'}
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email',
              },
            })}
          />
          {errors.email && (
            <StaledErrorMessage>{errors.email.message}</StaledErrorMessage>
          )}
        </StaledFormGroup>

        <StaledFormGroup>
          <label htmlFor="password">Новый пароль</label>
          <input
            id="password"
            type="password"
            placeholder="Введите новый пароль"
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Пароль должен быть не менее 6 символов',
              },
            })}
          />
          {errors.password && (
            <StaledErrorMessage>{errors.password.message}</StaledErrorMessage>
          )}
        </StaledFormGroup>

        {(isReauthenticating || currentPassword) && (
          <StaledFormGroup>
            <label htmlFor="currentPassword">Текущий пароль</label>
            <input
              id="currentPassword"
              type="password"
              placeholder="Введите текущий пароль"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </StaledFormGroup>
        )}

        <StaledSubmitButton type="submit" disabled={isReauthenticating}>
          {isReauthenticating ? 'Повторная аутентификация...' : 'Отправить'}
        </StaledSubmitButton>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </StaledFormContainer>
  );
};

export default Settings;
