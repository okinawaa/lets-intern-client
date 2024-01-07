import { useState } from 'react';
import { Link } from 'react-router-dom';

import ProgramInfoModalGroup, {
  ModalContentType,
} from './Modal/ProgramInfoModalGroup';

import './ProgramMenuSection.scss';

const ProgramMenuSection = () => {
  const [showModalContent, setShowModalContent] =
    useState<ModalContentType>('');

  return (
    <section className="program-menu-section">
      <div className="inner-content">
        <h3>
          <span>모두가 자신만의 커리어를 설계하고 지속할 수 있도록</span>
          <strong>
            다양한 성장 프로그램을
            <br />
            제공하고 있습니다
          </strong>
        </h3>
        <ul className="menu-list">
          <li
            className="menu-item"
            onClick={() => setShowModalContent('CHALLENGE')}
          >
            <div className="text-content">
              <h4>인턴 지원 챌린지</h4>
              <p>
                인턴 준비 및 지원에 어려움을 느끼는
                <br />
                사회초년생들을 위한 챌린지 프로그램
              </p>
            </div>
            <div className="arrow-right">
              <i>
                <img src="./icons/arrow-line-right.svg" alt="오른쪽 화살표" />
              </i>
            </div>
          </li>
          <li
            className="menu-item"
            onClick={() => setShowModalContent('BOOTCAMP')}
          >
            <div className="text-content">
              <h4>부트캠프</h4>
              <p>
                일주일 간 무조건 3곳 이상 지원하는
                <br />
                인턴 지원 부트캠프
              </p>
            </div>
            <div className="arrow-right">
              <i>
                <img src="./icons/arrow-line-right.svg" alt="오른쪽 화살표" />
              </i>
            </div>
          </li>
          <li
            className="menu-item"
            onClick={() => setShowModalContent('LETS_CHAT')}
          >
            <div className="text-content">
              <h4>렛츠챗</h4>
              <p>
                커리어 선배가 들려주는
                <br />
                지원부터 합격, 그리고 직무 이야기
              </p>
            </div>
            <div className="arrow-right">
              <i>
                <img src="./icons/arrow-line-right.svg" alt="오른쪽 화살표" />
              </i>
            </div>
          </li>
          <li className="menu-item" onClick={() => alert('오픈 예정입니다.')}>
            <div className="text-content">
              <h4>TIL 챌린지</h4>
              <p>
                Today I Learned
                <br />
                인턴/신입의 성장 기록 챌린지
              </p>
            </div>
            <div className="arrow-right">
              <i>
                <img src="./icons/arrow-line-right.svg" alt="오른쪽 화살표" />
              </i>
            </div>
          </li>
        </ul>
      </div>
      <ProgramInfoModalGroup
        showModalContent={showModalContent}
        setShowModalContent={setShowModalContent}
      />
    </section>
  );
};

export default ProgramMenuSection;