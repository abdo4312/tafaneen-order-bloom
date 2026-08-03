import jsPDF from 'jspdf';
import { CartItem } from '@/contexts/CartContext';

export interface InvoiceData {
  items: CartItem[];
  totalPrice: number;
  customerName?: string;
  invoiceNumber: string;
  date: string;
}

export function generateInvoicePDF(data: InvoiceData): jsPDF {
  const doc = new jsPDF();

  // Set font for Arabic support (using default font)
  doc.setFont('helvetica');

  // Header
  doc.setFontSize(20);
  doc.text('مكتبة تفانين', 105, 20, { align: 'center' });
  doc.setFontSize(16);
  doc.text('للأدوات المكتبية', 105, 30, { align: 'center' });

  // Line separator
  doc.line(20, 35, 190, 35);

  // Invoice info
  doc.setFontSize(12);
  doc.text(`Invoice Number: ${data.invoiceNumber}`, 20, 50);
  doc.text(`Date: ${data.date}`, 20, 60);
  if (data.customerName) {
    doc.text(`Customer: ${data.customerName}`, 20, 70);
  }

  // Table header
  let yPosition = 85;
  doc.setFontSize(10);
  doc.text('Item', 20, yPosition);
  doc.text('Qty', 120, yPosition);
  doc.text('Price', 140, yPosition);
  doc.text('Total', 170, yPosition);

  // Line under header
  doc.line(20, yPosition + 2, 190, yPosition + 2);
  yPosition += 10;

  // Items
  data.items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    doc.text(item.name, 20, yPosition);
    doc.text(item.quantity.toString(), 120, yPosition);
    doc.text(`${item.price} EGP`, 140, yPosition);
    doc.text(`${itemTotal} EGP`, 170, yPosition);
    yPosition += 10;
  });

  // Total
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 10;
  doc.setFontSize(12);
  doc.text(`Total: ${data.totalPrice} EGP`, 170, yPosition, { align: 'right' });

  // Footer
  yPosition += 30;
  doc.setFontSize(10);
  doc.text('Contact: 01026274235', 105, yPosition, { align: 'center' });
  doc.text('Thank you for choosing Tafaneen Library!', 105, yPosition + 10, { align: 'center' });

  return doc;
}

export function downloadInvoice(data: InvoiceData) {
  const pdf = generateInvoicePDF(data);
  pdf.save(`invoice-${data.invoiceNumber}.pdf`);
}