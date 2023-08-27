import React from "react";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <div className={`popup__success ${
          isSuccess ? "popup__success_type_ok" : "popup__success_type_fail"
          }`}>
        </div>
        <h2 className='popup__title'>
        {isSuccess
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте еще раз"}</h2>
        <button
          onClick={onClose}
          className='popup__close-button'
          aria-label='закрыть'
          type='button'
        />
      </div>
    </div>
  );
}