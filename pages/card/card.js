// pages/card/card.js
import request from '../../request/index'
import getQuestions from '../../request/getQuestions'
import getAnswers from '../../request/getAnswers'
import getRandomIntInclusive from '../../utils/getRandomIntInclusive'
import { formateQuestions, formateAnswer } from '../../utils/formate'

Page({
  data: {
    currentIndex: 0,
    questionsList: [],
    page: 1
  },

  onLoad() {
    const randomPage = getRandomIntInclusive(0, 300);
    // 请求题库数据
    getQuestions(randomPage).then(res=>{
      this.setData({
        questionsList: formateQuestions(res.data.list)
      })
      console.log(randomPage);
      console.log(res.data.list);
    })
  },

  /**
   * 滑动改变轮播currentIndex
   * @param {*} e 
   */
  swiperChange(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },

  /**
   * 单选题、判断题点击事件
   * @param {*} e 
   */
  handleRadioClick(e) {
    // 当前选择选项ID
    const currentSelectedIndexKey = `questionsList[${this.data.currentIndex}].currentSelectedIndex`;
    // 当前选择选项
    const currentSelectedKey = `questionsList[${this.data.currentIndex}].currentSelected`;
    // 当前选项是否是正确
    const selectedIsTrue = `questionsList[${this.data.currentIndex}].selectedIsTrue`;
    const answerValueKey = `questionsList[${this.data.currentIndex}].answers.value`;
    const answerExplainKey = `questionsList[${this.data.currentIndex}].answers.explain`;
    const disabled = `questionsList[${this.data.currentIndex}].disabled`;

    const currentSelected = e.currentTarget.dataset.opt.value.slice(0, 1);
    const titleType = this.data.questionsList[this.data.currentIndex].question.titleType;

    const data = {
      [currentSelectedIndexKey]: e.currentTarget.dataset.idx,
      [currentSelectedKey]: currentSelected,
      [disabled]: true
    }
    // 判断是否已经点击过选项
    if(!this.data.questionsList[this.data.currentIndex].disabled) {
      // 获取答案数据
      getAnswers(e.currentTarget.dataset.id).then(res=>{
        // console.log(res.data);
        const answers = {
          [answerValueKey]: formateAnswer(res.data[0].answer, titleType),
          [answerExplainKey]: res.data[0].explain
        };
        // 判断选项是否则正确
        if(formateAnswer(res.data[0].answer, titleType) === currentSelected) {
          this.setData({
            ...data,
            ...answers,
            [selectedIsTrue]: true
          })
        } else {
          this.setData({
            ...data,
            ...answers,
            [selectedIsTrue]: false
          })
        }
      })
    }
  },

  /**
   * 多选题点击事件
   * @param {*} e 
   */
  handleCheckboxClick(e) {
    // 是否选中选项
    const isCheckedKey = `questionsList[${this.data.currentIndex}].question.opts[${e.currentTarget.dataset.idx}].isChecked`;

    // 选中的选项列表Key
    const currentSelectedListKey = `questionsList[${this.data.currentIndex}].currentSelectedList`;

    // 选中的选项
    const currentSelected = `questionsList[${this.data.currentIndex}].currentSelected`;

    let currentSelectedList = this.data.questionsList[this.data.currentIndex].currentSelectedList;

    if(this.data.questionsList[this.data.currentIndex].disabled) return;

    // 判断选中的选项列表是否包含点击的选项
    if(!currentSelectedList.includes(e.currentTarget.dataset.opt.value.slice(0, 1))) {
      // 点击添加选中项
      currentSelectedList.push(e.currentTarget.dataset.opt.value.slice(0, 1));
      this.setData({
        [isCheckedKey]: true,
        [currentSelectedListKey]: currentSelectedList.sort(),
        [currentSelected]: currentSelectedList.sort().join('')
      })
    } else {
      // 点击删除选中项
      const index = currentSelectedList.indexOf(e.currentTarget.dataset.opt.value.slice(0, 1));
      currentSelectedList.splice(index, 1);
      this.setData({
        [isCheckedKey]: false,
        [currentSelectedListKey]: currentSelectedList,
        [currentSelected]: currentSelectedList.sort().join('')
      })
    }
  },

  /**
   * 多选题提交
   * @param {*} e 
   */
  checkboxSubmit(e) {
    const answerValueKey = `questionsList[${this.data.currentIndex}].answers.value`;
    const answerExplainKey = `questionsList[${this.data.currentIndex}].answers.explain`;
    const selectedIsTrue = `questionsList[${this.data.currentIndex}].selectedIsTrue`;
    const disabled = `questionsList[${this.data.currentIndex}].disabled`;

    const currentSelected = this.data.questionsList[this.data.currentIndex].currentSelected;

    if(!this.data.questionsList[this.data.currentIndex].currentSelected) return

    // 获取答案数据
    getAnswers(e.currentTarget.dataset.id).then(res=>{
      console.log(res.data);
      console.log(this.data.questionsList[this.data.currentIndex].currentSelected);
      const data = {
        [answerValueKey]: res.data[0].answer,
        [answerExplainKey]: res.data[0].explain,
        [disabled]: true
      }
      if(res.data[0].answer === currentSelected) {
        this.setData({
           ...data,
          [selectedIsTrue]: true
        })
      } else {
        this.setData({
          ...data,
          [selectedIsTrue]: false
       })
      }
    })
  },

  toResultPage() {
    if(this.data.currentIndex === 9) {
      wx.navigateTo({
        url: '../result/result'
      })
    }
  },

  handleGetMore() {
    this.setData({
      currentIndex: 0,
      questionsList: []
    })
    const randomPage = getRandomIntInclusive(0, 300);
    // 请求题库数据
    getQuestions(randomPage).then(res=>{
      this.setData({
        questionsList: formateQuestions(res.data.list)
      })
    })
  },

  handleBackHome() {
    wx.navigateBack({
      url: '../index/index'
    })
  }
})