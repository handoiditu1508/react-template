import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Post = {
  id: number;
  name: string;
}

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Post"],
  endpoints: ((builder) => ({
    getPost: builder.query<Post, number>({
      query: (id) => ({
        url: `posts/${id}`,
      }),
    }),
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
    }),
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      query: (body) => ({
        url: `posts/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
    deletePost: builder.mutation<{ success: boolean; id: number; }, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
  })),
});

export default appApi;

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = appApi;
