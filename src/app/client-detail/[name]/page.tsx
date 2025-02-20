"use client";
import {useParams} from "next/navigation";
import {useState} from "react";
import HeaderDetail from "@/components/header/HeaderDetail";
import ClientInputForm from "@/components/clientDetail/ClientInputForm";
import InvoiceTemplate from "@/components/clientDetail/InvoiceTemplate";
import {getLatestInvoiceIdByClientId} from "@/utils/api";

interface InvoiceItem {
  name: string;
  quantity: string;
  price: string;
  total: string;
}

interface InvoiceData {
  invoiceNumber: string;
  year: string;
  month: string;
  day: string;
  items: InvoiceItem[];
  payment: string;
  note: string;
}

const ClientDetailPage = () => {
  const currentYear = new Date().getFullYear().toString();
  const params = useParams();
  const clientName = decodeURIComponent((params.name as string) || "").replace(/-/g, " ");

  // getLatestInvoiceIdByClientId 함수로 최신 invoiceId를 가져온다.
  // 최신 invoiceId에 +1 하여 invoiceNumber로 설정한다.  

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: clientName + "-" + 1,
    year: currentYear,
    month: "",
    day: "",
    items: [],
    payment: "",
    note: "",
  });

  const [isUpdated, setIsUpdated] = useState(false); // 추가된 상태

  return (
    <>
      <HeaderDetail clientName={clientName}/>
      <main className="site-content">
        <div className="container">
          <div className="main-wrapper">
            <div className="layout-half" id="invoice">
              <div className="input-group">
                <ClientInputForm
                  invoiceData={invoiceData}
                  setInvoiceData={setInvoiceData}
                  setIsUpdated={setIsUpdated}
                />
              </div>
              <div className="viewer-group">
                <InvoiceTemplate
                  invoiceData={invoiceData}
                  clientName={clientName}
                  isUpdated={isUpdated}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ClientDetailPage;
