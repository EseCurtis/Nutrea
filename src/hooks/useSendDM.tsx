import { useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import { useSocket } from "../contexts/SocketContext";
import { MessageType } from "../enums/MessageType";
import { AuthStore } from "../store/AuthStore";
import { baseUrl } from "../utils";
import { Message } from "../types/Message";

const useSendDM = (receiverId: string) => {
  const { token, user } = AuthStore.useState((s) => s);
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, next_page: 0 });
  const [blocked, setBlocked] = useState(false);
  const [blockedByUser, setBlockedByUser] = useState(false);

  const messagesWithoutDuplicates = Array.from(
    new Set(messages.map((a) => a.id))
  ).map((id) => {
    return messages.find((a) => a.id === id);
  });

  const reversedMessages = messagesWithoutDuplicates.reverse();

  useEffect(() => {
    if (!token || !receiverId) return;

    socket.current = io(baseUrl, {
      transports: ["websocket"],
      query: { access_token: token, receiver_id: receiverId }
    });

    socket.current.on("recieveMessage", (message: any) => {
      const incomingMessage = { ...message };
      setMessages((prev) => [incomingMessage, ...prev]);
    });

    socket.current.on("initMessages", (incomingMessages: any) => {
      if (incomingMessages?.messages) {
        setMessages(incomingMessages.messages);
        setMeta(incomingMessages.meta);
      }
    });

    socket.current.on("blockUnblock", (info: any) => {
      setBlocked(info.blocked_user);
      setBlockedByUser(info.blocked_by_user);
    });

    socket.current.on("moreMessages", (incomingMessages: any) => {
      setMessages((messages) => [...messages, ...incomingMessages.messages]);
      setMeta(incomingMessages.meta);
    });

    return function didUnmount() {
      socket?.current?.disconnect();
      socket?.current?.removeAllListeners();
    };
  }, [token, receiverId]);

  const handleSend = useCallback(
    ({ text, type }: { text: string; type: MessageType }) => {
      if (!socket.current) return;
      socket.current.emit("sendMessage", {
        message: text,
        type,
        receiver_id: receiverId
      });
    },
    [receiverId]
  );

  const readMessage = useCallback((messageId: string) => {
    if (!socket.current) return;
    socket.current.emit("readMessage", {
      message_id: messageId
    });
  }, []);

  const emitBlockUnblock = useCallback(() => {
    if (!socket.current) return;
    socket.current.emit("emitBlockUnblock", {
      blocked: !blocked
    });
  }, [blocked]);

  const loadMoreData = useCallback(() => {
    if (!socket.current || !meta.next_page) return;
    socket.current.emit("getMessages", {
      page: meta.next_page
    });
  }, [meta.next_page]);

  return {
    messages: reversedMessages,
    handleSend,
    readMessage,
    emitBlockUnblock,
    loadMoreData,
    blocked,
    blockedByUser
  };
};

export default useSendDM;
