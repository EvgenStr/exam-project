const fs = require('fs/promises');
const db = require('../models');
const CONSTANTS = require('../constants');
const { access, writeFile, readFile, mkdir } = fs;
const { constants } = require('fs');

module.exports.createWhereForAllContests = (
  typeIndex,
  contestId,
  industry,
  awardSort,
) => {
  const object = {
    where: {},
    order: [],
  };
  if (typeIndex) {
    Object.assign(object.where, { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) {
    Object.assign(object.where, { id: contestId });
  }
  if (industry) {
    Object.assign(object.where, { industry });
  }
  if (awardSort) {
    object.order.push(['prize', awardSort]);
  }
  Object.assign(object.where, {
    status: {
      [db.Sequelize.Op.or]: [
        CONSTANTS.CONTEST_STATUS_FINISHED,
        CONSTANTS.CONTEST_STATUS_ACTIVE,
      ],
    },
  });
  object.order.push(['id', 'desc']);
  return object;
};

function getPredicateTypes (index) {
  return { [db.Sequelize.Op.or]: [types[index].split(',')] };
}

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

module.exports.prepareRoles = (role, userId, interlocutorId) => {
  return {
    customerId: role === CONSTANTS.CUSTOMER ? userId : interlocutorId,
    creatorId: role === CONSTANTS.CUSTOMER ? interlocutorId : userId,
  };
};

module.exports.createPreview = (conversationId, newMessage, participants) => {
  return {
    _id: conversationId,
    sender: newMessage.userId,
    text: newMessage.body,
    createAt: newMessage.createdAt,
    participants,
    blackList: [false, false],
    favoriteList: [false, false],
  };
};

module.exports.exists = async path => {
  try {
    await access(path, constants.R_OK | constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports.write = async (path, data = []) => {
  try {
    await writeFile(path, JSON.stringify(data, null, 2));
  } catch (e) {
    return false;
  }
};

module.exports.mkdir = async path => {
  try {
    await mkdir(path);
  } catch (e) {
    return false;
  }
};

module.exports.read = async path => {
  try {
    const data = await readFile(path, { encoding: 'utf8' });
    return await JSON.parse(data);
  } catch (e) {
    return false;
  }
};
