import React from 'react';

export interface IErrorModalProps {
  errorMsg?: string | null;
}

export default function ErrorModal({ errorMsg = 'Что-то пошло не так...' }: IErrorModalProps) {
  return (
    <>
      <span className="text text_type_main-medium mb-15">Ошибка!</span>
      <span className="text text_type_main-medium mb-15">{errorMsg}</span>
    </>
  );
}
