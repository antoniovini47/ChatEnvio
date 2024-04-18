import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getMessagesRoutines } from "../routines/messages";
import { StoreState } from "..";
import { ChatMessageProps } from "../../components/ChatMessage";

const names = ["Ana", "Bruno", "Carlos"];

export type ChatState = {
  messages: ChatMessageProps[];
  loading: boolean;
  error: string;
  randomName: string;
};

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: "",
  randomName: names[Math.floor(Math.random() * names.length)],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    add: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: getMessagesRoutines,
});

const chatSelector = createDraftSafeSelector(
  (state: StoreState) => state.chats,
  (chat) => chat
);

const chatActions = chatSlice.actions;
export const useChat = () => useSelector(chatSelector);
export { chatSlice, chatActions };
export default chatSlice.reducer;
