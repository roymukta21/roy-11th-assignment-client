import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          if (res.data.success) {
            setPayment(res.data.payment);
          }
        })
        .catch((err) => {
          console.error("payment success error:", err);
        });
    }
  }, [sessionId, axiosSecure]);

  if (!payment) {
    return <Loading />;
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow rounded">
      <title>Payment Successful</title>
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>

      <div className="space-y-2 mb-10">
        <p>
          <strong>Transaction ID:</strong> {payment.transactionId}
        </p>
        <p>
          <strong>Meal Name:</strong> {payment.mealName}
        </p>
        <p>
          <strong>Amount:</strong> {payment.amount}{" "}
          {payment.currency.toUpperCase()}
        </p>
        <p>
          <strong>Customer Email:</strong> {payment.customerEmail}
        </p>
        <p>
          <strong>Payment Status:</strong> {payment.paymentStatus}
        </p>
        <p>
          <strong>Paid At:</strong> {new Date(payment.paidAt).toLocaleString()}
        </p>
      </div>

      <div className="text-center">
        <Link to="/dashboard/orders" className="primary-btn">
          Back to order
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
