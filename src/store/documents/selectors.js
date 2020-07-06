import {createSelector} from 'reselect';

const documentsState = (state) => state.documents;

export const selectError = createSelector(
  [documentsState],
  (documents) => documents.error,
);

export const selectLoading = createSelector(
  [documentsState],
  (documents) => documents.loading,
);

export const selectDocumentsResults = createSelector(
  [documentsState],
  (documents) => documents.documents,
);

export const selectDocumentsStatus = createSelector(
  [selectLoading, selectError],
  (loading, error) => ({loading, error}),
);

export const selectDocuments = ({model}) =>
  createSelector([selectDocumentsResults], (documents) => {
    return documents[model] || [];
  });

export const selectDocument = ({model, name}) =>
  createSelector([selectDocuments({model})], (results) =>
    results.filter((doc) => doc.name === name),
  );
