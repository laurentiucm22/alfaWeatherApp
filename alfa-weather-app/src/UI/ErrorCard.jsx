import React from "react";
import Container from "./Container";
import Card from "./Card";
import { BiErrorCircle } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { isError } from "../Redux/slices/uiSlice";
import { useDispatch } from "react-redux";

const ErrorCard = ({ title, message }) => {
  const dispatch = useDispatch();

  const errorCardStyle = {
    errorCard:
      "flex items-center justify-between w-full p-4 mt-4 bg-red-500 rounded-md ",
    errorDescContainer: "flex error_card-container",
    errorIcon: "text-3xl font-bold text-white",
    errorTitle: "pl-2 text-lg font-medium text-white",
    errorMsg: "pl-2 text-lg font-medium text-white",
    errorBtnContainer: "rounded-full hover:bg-slate-50",
    errorCloseBtn:
      "p-[0.15rem] flex items-center justify-center text-xl cursor-pointer hover:text-red-500",
  };

  return (
    <Card className={errorCardStyle.errorCard}>
      <BiErrorCircle className={errorCardStyle.errorIcon} />

      <Container className={errorCardStyle.errorDescContainer}>
        <p className={errorCardStyle.errorTitle}>{title}</p>
        <p className={errorCardStyle.errorMsg}>{message}</p>
      </Container>

      <Container className={errorCardStyle.errorBtnContainer}>
        <Button
          className={errorCardStyle.errorCloseBtn}
          onClick={() => {
            dispatch(isError(false));
            window.location.reload();
          }}
        >
          <MdOutlineClose />
        </Button>
      </Container>
    </Card>
  );
};

export default ErrorCard;
