import request from './index';

function getAnswers(ids) {
  return request('https://www.mxnzp.com/api/driver_exam/answer/list', 'get', {
    app_id: 'qkmcqblclzopqhre',
    app_secret: 'TzR5QmU5TXArRkgyNldIY0JqaE1odz09',
    ids: ids
  })
}

export default getAnswers;

