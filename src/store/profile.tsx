import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import {ProfileTypes} from "../types/auth/profileData.ts";


export interface ProfileStateProps {
  is_auth: boolean;
  profile_data: ProfileTypes;
  collapsed: boolean;
  activeMenu: string;
}

const initialState: ProfileStateProps = {
  is_auth: false,
  profile_data: {
    email: "",
    name: "",
    role:[],

  },
  collapsed: false,
  activeMenu: 'jarimalar'
};

export const counterSlice = createSlice({
  name: "profile",
  initialState: {...initialState},
  reducers: {
    setis_auth: (state, action: PayloadAction<{ is_auth: boolean }>) => {
      state.is_auth = action.payload.is_auth;
    },
    setprofile_data: (state, action: PayloadAction<ProfileTypes>) => {
      state.profile_data = action.payload;
    },
    setCollapsed: (state, action: PayloadAction<{ collapsed: boolean }>) => {
      state.collapsed = action.payload.collapsed;
    },
    setActiveMenu: (state, action: PayloadAction<{ activeMenu: string }>) => {
        state.activeMenu = action.payload.activeMenu;
    }
  },
});

export const {setis_auth, setprofile_data, setCollapsed, setActiveMenu} = counterSlice.actions;

export default counterSlice.reducer;
