import React from "react";
import Container from "./Container";
import Card from "./Card";
import { BiErrorCircle } from "react-icons/bi";
import { isError } from "../Redux/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ErrorCard = ({ title, message }) => {
  const dispatch = useDispatch();
  const errorCurrentState = useSelector((state) => state.rootUi.isError);
  const navigate = useNavigate();

  const errorResetHandler = () => {
    if (errorCurrentState) {
      setTimeout(() => {
        dispatch(isError(false));
        navigate("/");
        window.location.reload();
      }, 3000);
    }
  };

  // errorResetHandler();

  const errorCardStyle = {
    errorCard:
      "flex  items-center justify-around w-full p-4 mt-4 bg-red-500 rounded-md ",
    errorDescContainer: "flex flex-row lg:flex-col error_card-container",
    errorIcon: "text-3xl font-bold text-white",
    errorTitle: "text-sm md:text-lg font-medium text-white",
    errorMsg: "pl-2 text-sm md:text-lg font-medium text-white",
  };

  return (
    <Card className={errorCardStyle.errorCard}>
      <BiErrorCircle className={errorCardStyle.errorIcon} />

      <Container className={errorCardStyle.errorDescContainer}>
        <p className={errorCardStyle.errorTitle}>{title}</p>
        <p className={errorCardStyle.errorMsg}>{message}</p>
      </Container>
    </Card>
  );
};

export default ErrorCard;
