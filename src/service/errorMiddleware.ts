import { Middleware, isFulfilled } from "@reduxjs/toolkit";

export const errorMiddleware: Middleware =
  () => (next) => (action: any) => {
    try {
      if (isFulfilled(action)) {
        if (action?.payload?.response_code == 4010) {
          return console.log("Xato");
        }
      }
      if (!isFulfilled(action)) {
        if (action?.payload?.status == 401) {
          console.error("401");
          // localStorage.clear()
          // window.location.href = "/";
        }
        // else if(action?.payload?.status == 40) {
        //   console.error("403");
        //   localStorage.clear()
        //   window.location.href = "/403";
        // }
      }
      return next(action);
    } catch (error) {
      console.error("errorMiddleware", error);
      throw error;
    }
  };
