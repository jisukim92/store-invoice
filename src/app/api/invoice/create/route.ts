import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST 요청 - Invoice 및 InvoiceDetail을 함께 등록
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { no, clientId, previousBalance, payment, details } = body;

    if (!no || !clientId || !Array.isArray(details)) {
      return NextResponse.json({ error: '올바른 요청 데이터를 제공해야 합니다.' }, { status: 400 });
    }

    // 트랜잭션을 사용하여 Invoice 및 InvoiceDetail 저장
    const createdInvoice = await prisma.$transaction(async (tx) => {
      // Invoice 생성
      const invoice = await tx.invoice.create({
        data: {
          no,
          clientId,
          previousBalance: previousBalance ?? 0,
          payment: payment ?? 0,
        },
      });

      // InvoiceDetail 생성
      if (details.length > 0) {
        await tx.invoiceDetail.createMany({
          data: details.map((detail) => ({
            invoiceId: invoice.id,
            name: detail.name,
            quantity: detail.quantity ?? 1,
            price: detail.price ?? 0,
          })),
        });
      }

      return invoice;
    });

    return NextResponse.json({ invoiceId: createdInvoice.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice with details:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
