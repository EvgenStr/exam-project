import React from 'react';
import { toast } from 'react-toastify';
import WebSocket from './WebSocket';
import Notification from '../../../components/Notification/Notification';

class NotificationSocket extends WebSocket {
  anotherSubscribes = () => {
    this.onEntryCreated();
    this.onChangeMark();
    this.onChangeOfferStatus();
    this.onNewMessage();
  };

  onNewMessage = () => {
    this.socket.on('notificationNewMessage', sender => {
      const {
        chatStore: { chatData },
      } = this.getState();
      if (!chatData || (chatData && chatData.id !== sender.dialogId)) {
        toast(
          `You have new message from ${sender.firstName} ${sender.lastName}`,
        );
      }
    });
  };

  onChangeMark = () => {
    this.socket.on('changeMark', () => {
      toast('Someone liked your offer');
    });
  };

  onChangeOfferStatus = () => {
    this.socket.on('changeOfferStatus', message => {
      toast(
        <Notification
          message={message.message}
          contestId={message.contestId}
        />,
      );
    });
  };

  onEntryCreated = () => {
    this.socket.on('onEntryCreated', () => {
      toast('New Entry');
    });
  };

  subscribe = id => {
    this.socket.emit('subscribe', id);
  };

  unsubscribe = id => {
    this.socket.emit('unsubscribe', id);
  };
}

export default NotificationSocket;
