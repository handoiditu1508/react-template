import Post from "@/models/entities/Post";
import appApi from "./appApi";
import { invalidatesIdTag, invalidatesListTag, providesIdTag, providesListTags } from "./rtkQueryCacheUtils";

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
      invalidatesTags: (result, error) => invalidatesListTag("Post", error),
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
      invalidatesTags: (_result, error, body) => invalidatesIdTag("Post", body.id, error),
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
