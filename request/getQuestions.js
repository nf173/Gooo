import request from './index';

function getQuestions(page) {
  return request('https://www.mxnzp.com/api/driver_exam/question/list', 'get', {
    app_id: 'qkmcqblclzopqhre',
    app_secret: 'TzR5QmU5TXArRkgyNldIY0JqaE1odz09',
    type: 1,
    page: page,
    rank: 1
  })
}

export default getQuestions;