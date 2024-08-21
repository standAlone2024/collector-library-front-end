import React from 'react';
import Image from 'next/image';
import { BasicContainer } from '@view/atoms';


const Main: React.FC = () => {
  const handleClick = () => {
    alert('Basic Button Clicked!');
  };

  return (
    <BasicContainer isAlignCenter={true}>
      <p>내 컬렉션을 모두 기억하고 있나요?</p>
      <p>오늘 또 사신건 아니죠?</p>
      <Image 
        src="/icons/library_books.png" 
        alt="icon" 
        width={100} 
        height={100}
      />
      <p>이제 정리 한 번 하시죠!</p>
    </BasicContainer>
  );
}

export default Main;