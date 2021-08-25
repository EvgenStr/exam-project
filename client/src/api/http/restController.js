import httpClient from './';
/*
export const registerRequest = data => httpClient.post('registration', data)
export const loginRequest = data => httpClient.post('login', data)
*/
export const getUser = () => httpClient.post('getUser');
export const updateUser = data => httpClient.post('updateUser', data);
export const changeMark = data => httpClient.post('changeMark', data);
export const cashOut = data => httpClient.post('cashout', data);
export const payMent = data => httpClient.post('pay', data.formData);
/**contests */
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
      data,
    },
  });
export const setNewOffer = data =>
  httpClient.post(`contests/${data.get('contestId')}/offer`, data);
export const setOfferStatus = data =>
  httpClient.post('contests/offer/status', data);
/** */
export const getPreviewChat = () => httpClient.post('getPreview');
export const getDialog = data => httpClient.post('getChat', data);
export const newMessage = data => httpClient.post('newMessage', data);
export const changeChatFavorite = data => httpClient.post('favorite', data);
export const changeChatBlock = data => httpClient.post('blackList', data);
export const getCatalogList = data => httpClient.post('getCatalogs', data);
export const addChatToCatalog = data =>
  httpClient.post('addNewChatToCatalog', data);
export const createCatalog = data => httpClient.post('createCatalog', data);
export const deleteCatalog = data => httpClient.post('deleteCatalog', data);
export const removeChatFromCatalog = data =>
  httpClient.post('removeChatFromCatalog', data);
export const changeCatalogName = data =>
  httpClient.post('updateNameCatalog', data);

// export const downloadContestFile = data =>
//   httpClient.get(`downloadFile/${data.fileName}`);
