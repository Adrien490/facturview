import React, { type Key } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { type Invoice, type ProductInvoices } from '@prisma/client';
import dayjs from 'dayjs';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
  },
  listItemNumber: {
    width: '10%',
  },
  listItemName: {
    width: '70%',
  },
  listItemQuantity: {
    width: '20%',
  },
});



const InvoicePDF = ({ invoice }: Invoice) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Facture pour {invoice.customerName}</Text>
      <Text style={styles.text}>Date: {dayjs(invoice.date).format('DD/MM/YYYY')}</Text>
      <Text style={styles.text}>Total: {invoice.total}</Text>
      <Text style={styles.text}>Est payé: {invoice.isPaid ? 'Oui' : 'Non'}</Text>

      <Text style={styles.text}>Produits:</Text>
      {invoice.productInvoices.map((productInvoice: ProductInvoices, index: Key) => (
        <View style={styles.listItem} key={index}>
          <Text style={[styles.text, styles.listItemNumber]}>{index+1}.</Text>
          <Text style={[styles.text, styles.listItemName]}>{productInvoice.product.name}</Text>
          <Text style={[styles.text, styles.listItemQuantity]}>Quantité: {productInvoice.quantity}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default InvoicePDF;
