function formateQuestions(questions) {
  function _formateTitleType(titleType) {
    const typeMap = new Map();
    typeMap.set(1, '单选');
    typeMap.set(2, '判断');
    typeMap.set(3, '多选');
    return typeMap.get(titleType);
  }

  if(Array.isArray(questions)) {
    return questions.map((item)=>{
      const formateItem = {
        question: {
          id: item.id, 
          title: item.title,
          titleType: _formateTitleType(item.titleType),  // 题型：单选、多选、判断
          type: item.type,  // 科目一还是科目四
          titlePic: item.titlePic,  // 图片
          opts: [{
            value: item.op1,
            isChecked: false
          }, {
            value: item.op2,
            isChecked: false
          },{
            value: item.op3,
            isChecked: false
          },{
            value: item.op4,
            isChecked: false
          }]
        },
        currentSelected: '',
        currentSelectedIndex: -1,
        currentSelectedList: [],
        disabled: false,
        selectedIsTrue: false,
      }
      return formateItem;
    })
  } else {
    throw('The data is not of type array！')
  }
}

function formateAnswer(answer, titleType) {
  if(titleType === '判断') {
    const map = new Map();
    map.set("true", "A");
    map.set("false", "B");
    return map.get(answer);
  } else {
    return answer;
  }
}

export { formateQuestions, formateAnswer }