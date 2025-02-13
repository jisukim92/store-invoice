"use client"
import {useState, useEffect} from "react";
import Link from "next/link";
import ClientRegisterModal from "@/components/ClientModal";


// 공통 타입 정의
interface Client {
  name: string;
  phone: string;
  note?: string;
  isFavorite: boolean;
}

const initialClients: Client[] = [
  {name: "ABC마트", phone: "010-1234-5678", note: "VIP 고객", isFavorite: false},
  {name: "고객 고객 고객", phone: "010-9876-5432", note: "", isFavorite: false},
  {name: "나이스 마트", phone: "010-1234-5678", note: "", isFavorite: false},
  {name: "투썸플레이스", phone: "010-9876-5432", note: "", isFavorite: false},
  {name: "늘푸른", phone: "010-1234-5678", note: "", isFavorite: false},
  {name: "시지", phone: "010-9876-5432", note: "늘푸른과 가족관계", isFavorite: false},
];

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null); // ✅ 오류 해결

  // 최초 로딩 시 정렬 적용 (이름순 정렬)
  useEffect(() => {
    setClients(
      [...initialClients].sort((a, b) => a.name.localeCompare(b.name, "ko-KR"))
    );
  }, []);

  // 거래처 수정 버튼 클릭
  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  // 거래처 수정 (모달에서 입력 후 저장)
  const handleRegisterClient = (updatedClient: Client) => {
    setClients((prev) =>
      [...prev.map((client) =>
        client.name === updatedClient.name ? {...updatedClient, isFavorite: client.isFavorite} : client
      )].sort((a, b) =>
        Number(b.isFavorite) - Number(a.isFavorite) || a.name.localeCompare(b.name, "ko-KR") // ✅ 정렬 수정
      )
    );
    setIsModalOpen(false);
  };

  // 즐겨찾기 버튼 클릭 (별 아이콘 색상 변경 + 즐겨찾기 우선 정렬)
  const toggleFavorite = (name: string) => {
    setClients((prev) =>
      [...prev.map((client) =>
        client.name === name ? {...client, isFavorite: !client.isFavorite} : client
      )].sort((a, b) =>
        Number(b.isFavorite) - Number(a.isFavorite) || a.name.localeCompare(b.name, "ko-KR") // ✅ 정렬 수정
      )
    );
  };

  return (
    <div className="client-list">
      <h2 className="under-line"> 거래처 리스트</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.name}>
            <div className="client-action">
              {/* 수정 */}
              <button onClick={() => handleEditClick(client)}>
                <img src="/images/edit.png" alt="수정"/>
              </button>

              {/* 즐겨찾기 */}
              <button onClick={() => toggleFavorite(client.name)}>
                <img
                  src={client.isFavorite ? "/images/favorite-on.png" : "/images/favorite-off.png"}
                  alt="즐겨찾기"
                />
              </button>
            </div>
            <div className="client-info">
              <Link href={`/client-detail/${encodeURIComponent(client.name.replace(/\s/g, "-"))}`} passHref>
                <h3>{client.name}</h3>
              </Link>
            </div>

          </li>
        ))}
      </ul>

      {/* 거래처 수정 모달 (기존 등록 모달 재사용) */}
      {isModalOpen && (
        <ClientRegisterModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedClient(null);
          }}
          onRegister={handleRegisterClient}
          initialData={selectedClient}
        />
      )}
    </div>
  );
}
