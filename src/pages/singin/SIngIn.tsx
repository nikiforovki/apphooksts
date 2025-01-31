import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MyFormSingIn } from './type';
import {
  StyledForm,
  StyledTitleForm,
  StyledText,
  StyledInputField,
  StyledSubmitButton,
  StyledError,
  StyledLoading,
} from './SingIn.styled';
import { auth, db } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import uselocalstorage from '@shared/hooks/uselocalstorage';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyFormSingIn>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [uid] = uselocalstorage('uid');

  console.log('uid', uid);

  const handleClick = () => {
    navigate('/signup');
  };

  const onSubmit: SubmitHandler<MyFormSingIn> = async (data) => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        localStorage.setItem('uid', user.uid);
        localStorage.setItem('email', user.email || '');
        localStorage.setItem('name', userData.username || '');
      }

      navigate('/home');
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledTitleForm>Sign in</StyledTitleForm>
      <StyledText>
        <a onClick={handleClick}>Need an account?</a>
      </StyledText>
      <StyledInputField
        type="email"
        {...register('email', { required: 'Email обязателен' })}
        placeholder="Email"
      />
      {errors.email && <StyledError>{errors.email.message}</StyledError>}
      <StyledInputField
        type="password"
        {...register('password', { required: 'Пароль обязателен' })}
        placeholder="Password"
      />
      {errors.password && <StyledError>{errors.password.message}</StyledError>}
      <StyledSubmitButton type="submit" disabled={loading}>
        {loading ? <StyledLoading>Загрузка...</StyledLoading> : 'Войти'}
      </StyledSubmitButton>
    </StyledForm>
  );
};

export default SignIn;
