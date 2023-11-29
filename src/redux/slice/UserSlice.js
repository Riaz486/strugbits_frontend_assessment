import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/constant.js";
import axios from "axios";

// User Details
export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async () => {
    try {
      const details = await axios.get(`${api}users`);
      return details.data;
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  }
);

// User Details
export const getLocalUserDetail = createAsyncThunk(
  "user/getLocalUserDetail",
  async () => {
    try {
      const details = await axios.get("http://localhost:8080/users");
      return details.data;
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  }
);

export const postUserDetail = createAsyncThunk(
  "user/postUserDetail",
  async ({ data }) => {
    try {
      const userDetail = await axios.post("http://localhost:8080/users", data);
      return userDetail.data;
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  }
);

// update User Details
export const updateUserDetail = createAsyncThunk(
  "user/updateUserDetail",
  async ({ id, data }) => {
    try {
      const userDetail = await axios.put(
        `http://localhost:8080/users/${id}`,
        data
      );
      return userDetail.data;
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  }
);

// Delte User Details
export const deleteUserDetail = createAsyncThunk(
  "user/deleteUserDetail",
  async (id) => {
    try {
      const userDetail = await axios.delete(
        `http://localhost:8080/users/${id}`
      );
      return userDetail.data;
    } catch (err) {
      if (err) {
        throw err;
      }
    }
  }
);

const userData = createSlice({
  name: "user",
  initialState: {
    getUserData: [],
    getLocalUserData: [],
    postUserData: [],
    updateUserData: [],
    deleteUserData: [],
    loader: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    // get user Details
    [getUserDetail.fulfilled]: (state, { payload }) => {
      state.getUserData = payload;
      state.loader = false;
    },
    [getUserDetail.pending]: (state) => {
      state.loader = true;
    },
    [getUserDetail.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loader = false;
      alert(state.error);
    },

    // get Local user Details
    [getLocalUserDetail.fulfilled]: (state, { payload }) => {
      state.getLocalUserData = payload;
      state.loader = false;
    },
    [getLocalUserDetail.pending]: (state) => {
      state.loader = true;
    },
    [getLocalUserDetail.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loader = false;
      alert(state.error);
    },

    //Post User Details
    [postUserDetail.fulfilled]: (state, { payload }) => {
      state.postUserData = payload;
      alert("Add User Successfully");
      state.loader = false;
    },
    [postUserDetail.pending]: (state) => {
      state.loader = true;
    },
    [postUserDetail.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loader = false;
      alert(state.error);
    },
    //update User Details
    [updateUserDetail.fulfilled]: (state, { payload }) => {
      state.updateUserData = payload;
      state.loader = false;
    },
    [updateUserDetail.pending]: (state) => {
      state.loader = true;
    },
    [updateUserDetail.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loader = false;
      alert(state.error);
    },

    //delete User Details
    [deleteUserDetail.fulfilled]: (state, { payload }) => {
      state.deleteUserData = payload;
      state.loader = false;
    },
    [deleteUserDetail.pending]: (state) => {
      state.loader = true;
    },
    [deleteUserDetail.rejected]: (state, { error }) => {
      state.error = error.message;
      state.loader = false;
      alert(state.error);
    },
  },
});

export default userData;
