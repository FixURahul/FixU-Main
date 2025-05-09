import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PaymentModalProps {
  isOpen: boolean;
  orderId: string;
  amount: number;
  onClose: () => void;
  onSuccess: (paymentId: string) => void;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

const PaymentModal = ({
  isOpen,
  orderId,
  amount,
  onClose,
  onSuccess,
  customerName,
  customerEmail,
  customerPhone,
}: PaymentModalProps) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Handle the payment when modal opens
      const initiatePayment = async () => {
        try {
          // Get payment link from API
          const response = await fetch('/api/payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              amount, 
              orderId,
              customerName,
              customerEmail,
              customerPhone
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to create payment link');
          }

          const { paymentLink } = await response.json();
          
          // Save current order ID to session storage for tracking
          sessionStorage.setItem('current_payment_order', orderId);
          
          // Redirect to the hosted payment page
          window.location.href = paymentLink;
        } catch (error) {
          console.error('Payment initiation error:', error);
          alert('Failed to initialize payment. Please try again.');
          onClose();
        }
      };

      initiatePayment();
    }
  }, [isOpen, amount, orderId, onClose, customerName, customerEmail, customerPhone]);

  // Create a callback handler for when user returns from payment page
  useEffect(() => {
    // Check if returning from payment
    const handlePaymentReturn = () => {
      const currentOrder = sessionStorage.getItem('current_payment_order');
      
      // If this is a return from payment and matches our order
      if (currentOrder === orderId) {
        // Clear the tracking
        sessionStorage.removeItem('current_payment_order');
        sessionStorage.setItem('payment_completed_' + orderId, 'true');
        
        // Call success with a placeholder ID
        // In a real implementation, you'd capture the actual reference ID
        onSuccess('hosted_payment_completed');
        onClose();
      }
    };

    // If modal is not open but we have a current order, might be returning from payment
    if (!isOpen && sessionStorage.getItem('current_payment_order') === orderId) {
      handlePaymentReturn();
    }
  }, [isOpen, orderId, onSuccess, onClose]);

  return null; // No UI needed since we're redirecting
};

export default PaymentModal;
