import {types} from './types';
import produce from 'immer';

import {initialState} from './model';

export default (state = initialState, action) =>
  produce(state, (draft) => {
    const {type, payload} = action;

    switch (type) {
      case types.FETCH_DOCUMENTS_REQUEST:
      case types.CREATE_DOCUMENTS_REQUEST:
      case types.UPDATE_DOCUMENTS_REQUEST:
      case types.DELETE_DOCUMENTS_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;

      case types.FETCH_DOCUMENTS_FAILURE:
      case types.CREATE_DOCUMENTS_FAILURE:
      case types.UPDATE_DOCUMENTS_FAILURE:
      case types.DELETE_DOCUMENTS_FAILURE:
        draft.loading = false;
        draft.error = payload;
        break;

      case types.FETCH_DOCUMENTS_SUCCESS: {
        draft.documents[payload.model] = payload.data.results;
        draft.loading = false;
        draft.error = null;
        break;
      }

      case types.CREATE_DOCUMENTS_SUCCESS: {
        if (!draft.documents[payload.model]) {
          draft.documents[payload.model] = [];
        }
        draft.documents[payload.model].push({
          ...payload.data[0],
          ...payload.payload[0],
        });
        draft.loading = false;
        draft.error = null;
        break;
      }

      case types.UPDATE_DOCUMENTS_SUCCESS: {
        const index = draft.documents[payload.model].findIndex(
          (doc) => doc._id === payload.payload[0]._id,
        );

        if (index > -1) {
          draft.documents[payload.model][index] = {
            ...payload.data[0],
            ...payload.payload[0],
          };
        }
        draft.loading = false;
        draft.error = null;
        break;
      }

      case types.DELETE_DOCUMENTS_SUCCESS: {
        const index = draft.documents[payload.model].findIndex(
          (doc) => doc._id === payload._id,
        );

        if (index > -1) {
          draft.documents[payload.model].splice(index, 1);
        }
        draft.loading = false;
        draft.error = null;
        break;
      }

      default:
        return draft;
    }
  });
