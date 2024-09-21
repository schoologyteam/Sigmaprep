import { standardApiCall } from '@utils/api';
import { updateArrWithNewVals } from '@utils/functions';
import { createSelector } from 'reselect';

const GET_QUESTIONS_BY_TOPIC = 'app/class/topic/question/GET_QUESTIONS_BY_TOPIC';

export function getQuestionsByTopic(topic_id) {
  return standardApiCall('get', `/api/question/${topic_id}`, null, GET_QUESTIONS_BY_TOPIC, 'QuestionPage');
}

const DEFAULT_STATE = {
  questions: null,
};

export default function questionsReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_QUESTIONS_BY_TOPIC:
      return { ...state, questions: updateArrWithNewVals(state.questions, action.payload) };
    default:
      return state;
  }
}

export const selectQuestionState = createSelector(
  (state) => state,
  function (state) {
    return { questions: state.app.question.questions };
  },
);
