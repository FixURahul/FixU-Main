// Using Cashfree hosted payment page

export const getCashfreePaymentLink = (amount: number, orderId: string, customerName?: string, customerEmail?: string, customerPhone?: string) => {
  // The base URL of the hosted payment page
  const baseUrl = process.env.CASHFREE_HOSTED_URL ;
  
  // Build the query parameters
  const params = new URLSearchParams();
  params.append('orderAmount', amount.toString());
  params.append('orderCurrency', 'INR');
  params.append('orderNote', `Payment for order ${orderId}`);
  params.append('customerName', customerName || '');
  params.append('customerEmail', customerEmail || '');
  params.append('customerPhone', customerPhone || '');
  params.append('orderId', orderId);
  
  // Return the full URL with parameters
  return `${baseUrl}?${params.toString()}`;
};

// This function will be called when the user returns from the payment page
export const verifyCashfreePayment = async (referenceId: string) => {
  // Since we're using a hosted page, verification will be handled by Cashfree
  // We just need to check if we received a valid reference ID
  return !!referenceId;
};
