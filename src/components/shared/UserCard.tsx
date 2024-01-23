import React, { useEffect, useState } from "react";
import { Models } from "appwrite";
import Profilephoto from "./Profilephoto";
import CircleLoader from "./CircleLoader";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser, useSettlmentById } from "@/lib/react-query/queries";

type UserCardProps = {
  user: Models.Document;
  userCanPay: number;
  friendCanPay: number;
};

const UserCard: React.FC<UserCardProps> = ({
  user,
  userCanPay,
  friendCanPay,
}) => {
  const { data: currentUser } = useGetCurrentUser();

  const navigate = useNavigate();

  const { data: settlementDataPayer, isLoading: issettlementDataPayerLoading } =
    useSettlmentById(currentUser?.$id, user.$id);

  const {
    data: settlementDataReceiver,
    isLoading: issettlementDataReceiverLoading,
  } = useSettlmentById(user.$id, currentUser?.$id);

  const totalAmountPayer =
    settlementDataPayer?.documents?.reduce((sum: number, settlementItem) => {
      return sum + parseFloat(settlementItem.Amount);
    }, 0) ?? 0;

  const totalAmountReceiver =
    settlementDataReceiver?.documents?.reduce((sum: number, settlementItem) => {
      return sum + parseFloat(settlementItem.Amount);
    }, 0) ?? 0;

  const [payeer, setpayeer] = useState(0);
  const [receiver, setreceiver] = useState(0);

  useEffect(() => {
    const newSum = totalAmountPayer - friendCanPay;
    setpayeer(newSum);
  }, [totalAmountPayer, friendCanPay]);

  useEffect(() => {
    const newSum = totalAmountReceiver - userCanPay;
    setreceiver(newSum);
  }, [totalAmountReceiver, userCanPay]);

  const handlePayment = () => {
    const upiLink = generateUPILink();
    if (upiLink) {
      window.location.href = upiLink;
    } else {
      // Handle error or provide feedback to the user
      console.error("Failed to generate UPI link");
    }
  };

  const generateUPILink = () => {
    // Replace these values with your actual payment details
    const payeeVPA = "nayanbarhate739-1@oksbi";
    const transactionAmount = "1";
    // Construct the UPI link
    const upiLink = `upi://pay?pa=${payeeVPA}&pn=%20&tr=%20&am=${transactionAmount}&cu=INR`;
    return upiLink;
  };

  const [isBlurred, setIsBlurred] = useState(false);

  const handleButtonClick = () => {
    setIsBlurred((prevIsBlurred) => !prevIsBlurred);
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className={`pb-3 text-white `}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Profilephoto name={user} />
          <p className="text-lg font-bold mb-1 pl-3 text-blue-500">
            {user.name}
          </p>
        </div>

        <button
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline ${
            friendCanPay === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleButtonClick}
          disabled={friendCanPay === 0}>
          Settle Up
        </button>
      </div>

      <div className={`app-container ${isBlurred ? "expanded" : ""}`}>
        <div className={`${isBlurred ? "expanded" : "hidden"}`}>
          <Button
            className="ml-2"
            onClick={() =>
              navigate(`/settlement/${payeer.toFixed(1)}/${user.$id}`)
            }>
            <img
              className="mr-2" // Add margin to adjust spacing between text and image
              width="40"
              height="40"
              src="/assets/icons/cash.png"
              alt="paytm"
            />
            Record By Cash
          </Button>
          <Button className="m-2 flex items-center" onClick={handlePayment}>
            <img
              className="mr-2" // Add margin to adjust spacing between text and image
              width="48"
              height="48"
              src="/assets/icons/upi.png"
              alt="paytm"
            />
            Pay with UPI
          </Button>
        </div>
      </div>

      <div className={` ${isBlurred ? "blurred2" : ""}`}>
        {(userCanPay === 0 && friendCanPay === 0) ||
        issettlementDataPayerLoading ||
        issettlementDataReceiverLoading ? (
          <CircleLoader />
        ) : (
          <>
            <p>
              "{user.name}" owes you{" "}
              <span className="text-lg font-bold text-green-500">
                &#8377;&nbsp;{receiver.toFixed(1)}
              </span>
            </p>
            <p>
              You owe "{user.name}"{" "}
              <span className="text-lg font-bold text-red">
                &#8377;&nbsp;{payeer.toFixed(1)}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;
