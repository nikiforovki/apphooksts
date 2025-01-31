import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MyFormSignUp } from './type';
import {
  StyledForm,
  StyledTitleForm,
  StyledText,
  StyledInputField,
  StyledSubmitButton,
  StyledError,
  StyledLoading,
} from './SingUp.styled';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {
  nameValidation,
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
} from './validationRules';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MyFormSignUp>();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signin');
  };

  const password = watch('password');

  const onSubmit: SubmitHandler<MyFormSignUp> = async (data) => {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username: data.name,
        email: data.email,
      });

      localStorage.setItem('uid', user.uid);
      localStorage.setItem('email', user.email || '');
      localStorage.setItem('name', data.name);

      navigate('/');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledTitleForm>Sign up</StyledTitleForm>
      <StyledText>
        <a onClick={handleClick}>Have an account?</a>
      </StyledText>

      <StyledInputField
        type="text"
        {...register('name', nameValidation)}
        placeholder="Имя"
      />
      {errors.name && <StyledError>{errors.name.message}</StyledError>}

      <StyledInputField
        type="email"
        {...register('email', emailValidation)}
        placeholder="Email"
      />
      {errors.email && <StyledError>{errors.email.message}</StyledError>}

      <StyledInputField
        type="password"
        {...register('password', passwordValidation)}
        placeholder="Password"
      />
      {errors.password && <StyledError>{errors.password.message}</StyledError>}

      <StyledInputField
        type="password"
        {...register('topassword', confirmPasswordValidation(password))}
        placeholder="Confirm Password"
      />
      {errors.topassword && (
        <StyledError>{errors.topassword.message}</StyledError>
      )}

      <StyledSubmitButton type="submit" disabled={loading}>
        {loading ? (
          <StyledLoading>Загрузка...</StyledLoading>
        ) : (
          'Зарегистрироваться'
        )}
      </StyledSubmitButton>
    </StyledForm>
  );
};

export default SignUp;
