import Post from "@/models/entities/Post";
import appApi from "./appApi";

const postApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query<Post, number>({
      query: (id) => ({
        url: `posts/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
      providesTags: (result) => (result
        ? [
          ...result.map(({ id }) => ({ type: "Post" as const, id })),
          { type: "Post", id: "LIST" },
        ]
        : [{ type: "Post", id: "LIST" }]),
    }),
    // infinite scroll pagination
    getInfinitePosts: builder.infiniteQuery<Post[], { postTitle: string; }, { pageNumber: number; }>({
      query: ({ queryArg, pageParam }) => `posts?t=${queryArg.postTitle}&p=${pageParam.pageNumber}`,
      infiniteQueryOptions: {
        initialPageParam: {
          pageNumber: 1,
        },
        maxPages: 3,
        getNextPageParam: (currentPage, allPages, currentPageParam, allPageParams) => ({
          pageNumber: currentPageParam.pageNumber + 1,
        }),
        getPreviousPageParam: (currentPage, allPages, currentPageParam, allPageParams) => currentPageParam.pageNumber > 1
          ? ({
            pageNumber: currentPageParam.pageNumber - 1,
          })
          : undefined,
      },
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      query: (body) => ({
        url: `posts/${body.id}`,
        method: "PUT",
        body,
      }),
      // optimistic update
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPost", body.id, (draft) => {
            Object.assign(draft, body);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_result, _error, body) => [{ type: "Post", id: body.id }],
    }),
    deletePost: builder.mutation<{ success: boolean; id: number; }, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),
  }),
});

export default postApi;

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useGetInfinitePostsInfiniteQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
