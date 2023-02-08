import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { QuestionType } from 'types/questionType';

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/'
  }),
  tagTypes: ['Questions'],
  endpoints: ({ query }) => ({
    getAllQuestions: query({
      query: () => 'questions'
    }),
    getSingleQuestion: query<QuestionType, string>({
      query: (id) => `questions?id=${id}`
    }),
  })
});

export const { useGetAllQuestionsQuery, useGetSingleQuestionQuery } = questionsApi;
