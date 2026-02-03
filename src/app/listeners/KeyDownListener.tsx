import {useEffect} from "react";
import usePostStore from "@/app/post/usePostStore.ts";
import {POST_ACTIVE_ID} from "@/app/post/post.constants.ts";
import pathUtils from "@/utils/pathUtils.ts";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import {JsonPost, Post} from "@/app/post/post.types.ts";

const KeyDownListener = () => {
  const postStore = usePostStore(POST_ACTIVE_ID)
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)



  const movePostUp = () => {
    const postId = postStore.post?.postId
    const boardId = postStore.post?.boardId
    if (!boardId || !postId) return
    const boardListKey = pathUtils.getScriptSubPath(`data\\${boardId}.json`)
    const boardListData = jsonDataStore.jsonDataMap[boardListKey]?.data
    if (!boardListData) return
    const posts: JsonPost [] = boardListData._embedded.posts
    const idx = posts?.findIndex((post) => post.postId === postId)
    const nextIdx = idx === 0 ? posts.length -1 : idx - 1
    const nextPostId = posts[nextIdx].postId
    const post: Post = {postId: nextPostId, boardId: boardId}
    postStore.setPost(post)
  }

  const movePostDown = () => {
    const postId = postStore.post?.postId
    const boardId = postStore.post?.boardId
    if (!boardId || !postId) return
    const boardListKey = pathUtils.getScriptSubPath(`data\\${boardId}.json`)
    const boardListData = jsonDataStore.jsonDataMap[boardListKey]?.data
    if (!boardListData) return
    const posts: JsonPost [] = boardListData._embedded.posts
    const idx = posts?.findIndex((post) => post.postId === postId)
    const nextIdx = idx === posts.length - 1 ? 0 : idx + 1
    const nextPostId = posts[nextIdx].postId
    const post: Post = {postId: nextPostId, boardId: boardId}
    postStore.setPost(post)
  }

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        movePostUp()
      } else if (event.key === 'ArrowDown') {
        movePostDown()
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return null
}

export default KeyDownListener