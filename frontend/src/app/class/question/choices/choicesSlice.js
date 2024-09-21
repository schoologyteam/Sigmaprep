import { standardApiCall } from '@utils/api';
import { updateArrWithNewVals } from '@utils/functions';

const GET_CHOICES_BY_Q = 'app/class/question/choices/GET_CHOICES_BY_Q';

const POST_ANSWER = 'app/class/question/choices/POST_ANSWER';

export function postChoice(choice_id) {
  return standardApiCall('post', `/api/answer/${choice_id}`, {}, GET_CHOICES_BY_Q);
}

export function getChoicesByQuestion(question_id) {
  return standardApiCall('get', `/api/question/choices/${question_id}`, null, GET_CHOICES_BY_Q, 'QuestionChoices');
}

const DEFAULT_STATE = {
  choices: null,
};

export default function choicesReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_CHOICES_BY_Q:
      return { ...state, choices: updateArrWithNewVals(state.choices, action.payload) };
    default:
      return state;
  }
}
