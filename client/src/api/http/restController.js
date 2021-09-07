import httpClient from './';

export const getUser = () => httpClient.post('getUser');
export const updateUser = data => httpClient.post('updateUser', data);
export const changeMark = data => httpClient.post('changeMark', data);
export const cashOut = data => httpClient.post('cashout', data);
export const payMent = data => httpClient.post('pay', data.formData);
/**contests*/
export const dataForContest = data =>
  httpClient.get('contests/data', { params: data });
export const getCustomersContests = data =>
  httpClient.get(`contests/customer/${data.userId}/${data.contestStatus}`, {
    params: { limit: data.limit, offset: data.offset },
  });
export const getContestById = data =>
  httpClient.get(`contests/${data.contestId}`);
export const updateContest = data =>
  httpClient.patch(`contests/${data.get('contestId')}`, data);
export const getActiveContests = data =>
  httpClient.get('contests', {
    params: {
      ...data,
    },
  });
export const setNewOffer = data =>
  httpClient.post(`contests/${data.get('contestId')}/offer`, data);
export const setOfferStatus = data =>
  httpClient.post('contests/offer/status', data);
/**chat */
export const newMessage = data => httpClient.post('chat/message', data);
export const getDialog = data => httpClient.get(`chat/${data.interlocutorId}`);
export const getPreviewChat = () => httpClient.get('chat/preview');
export const changeChatBlock = data => httpClient.patch('chat/blacklist', data);
export const changeChatFavorite = data =>
  httpClient.patch('chat/favorite', data);
export const createCatalog = data => httpClient.post('chat/catalog', data);
export const getCatalogList = () => httpClient.get('chat/catalog');
export const changeCatalogName = data =>
  httpClient.patch('chat/catalog/name', data);
export const addChatToCatalog = data =>
  httpClient.patch('chat/catalog/add', data);
export const removeChatFromCatalog = data =>
  httpClient.patch('chat/catalog/remove', data);
export const deleteCatalog = data =>
  httpClient.delete(`chat/catalog/${data.catalogId}`);

// export const downloadContestFile = data =>
//   httpClient.get(`downloadFile/${data.fileName}`);
export const getOffersForModerator = () => httpClient.get('contests/moderation');
