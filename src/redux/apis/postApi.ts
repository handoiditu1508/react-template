import Post from "@/models/entities/Post";
import appApi from "./appApi";
import { invalidatesIdTag, invalidatesListTag, invalidatesOptimisticPessimisticIdTag, providesIdTag, providesListTags } from "./rtkQueryCacheUtils";

const postApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query<Post, number>({
      query: (id) => ({
        url: `posts/${id}`,
      }),
      providesTags: (_result, error, id) => providesIdTag("Post", id, error),
    }),
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
      providesTags: (result, error) => providesListTags("Post", result, error),
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
      // pessimistic update
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        try {
          const { data: createdPost } = await queryFulfilled;
          dispatch(
            postApi.util.upsertQueryData("getPost", createdPost.id, createdPost)
          );
        } catch {}
      },
      invalidatesTags: (result, error) => invalidatesListTag("Post", error),
    }),
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      query: (body) => ({
        url: `posts/${body.id}`,
        method: "PUT",
        body,
      }),
      // optimistic and pessimistic updates
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        // optimistic
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPost", body.id, (draft) => {
            Object.assign(draft, body);
          })
        );
        try {
          const { data: updatedPost } = await queryFulfilled;
          // pessimistic
          dispatch(postApi.util.upsertQueryData("getPost", body.id, updatedPost));
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_result, error, body) => invalidatesOptimisticPessimisticIdTag("Post", body.id, error),
    }),
    deletePost: builder.mutation<{ success: boolean; id: number; }, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, error, id) => invalidatesIdTag("Post", id, error),
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
