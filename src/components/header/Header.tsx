'use client';
import {useState} from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faWonSign} from "@fortawesome/free-solid-svg-icons";
import ClientRegisterModal from "@/components/main/ClientModal";

const Header = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  return (
    <header>
      <div className="container">
        <div className="header_wrapper">
          <Link href="/">
            {/*<h1>중앙청과 20번</h1>*/}
            <h1>
              테스트</h1>
          </Link>
          <div className="btn-area">
            <button className="primary default" onClick={() => setIsRegisterModalOpen(true)}>
              <FontAwesomeIcon icon={faPlus}/>
              신규 거래처 등록
            </button>
            <Link href="/remaining-balance" className="default">
              <FontAwesomeIcon icon={faWonSign}/>
              거래처 잔금 확인
            </Link>
          </div>
        </div>
      </div>

      {/* 거래처 등록 모달 */}
      <ClientRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={(client) => console.log("새 거래처 등록:", client)}
      />
    </header>
  );
};

export default Header;
