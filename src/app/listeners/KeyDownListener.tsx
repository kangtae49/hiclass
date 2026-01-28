import {useEffect} from "react";
import useBoardStore from "@/app/board/useBoardStore.ts";
import {BOARD_ID} from "@/app/board/board.constants.ts";
import pathUtils from "@/utils/pathUtils.ts";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import {Post} from "@/app/board/board.types.ts";

const KeyDownListener = () => {
  const boardStore = useBoardStore(BOARD_ID)
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)



  const movePostUp = () => {
    const postId = boardStore.post?.postId
    const boardId = boardStore.post?.boardId
    if (!boardId || !postId) return
    const boardListKey = pathUtils.getScriptSubPath(`data\\${boardId}.json`)
    const boardListData = jsonDataStore.jsonDataMap[boardListKey]?.data
    if (!boardListData) return
    const posts: any[] = boardListData._embedded.posts
    const idx = posts?.findIndex((post) => post.postId === postId)
    console.log('idx', idx)
    const nextIdx = idx === 0 ? posts.length -1 : idx - 1
    const nextPostId = posts[nextIdx].postId
    const post: Post = {postId: nextPostId, boardId: boardId}
    console.log('movePostNext', post, postId)
    boardStore.setPost(post)
  }

  const movePostDown = () => {
    const postId = boardStore.post?.postId
    const boardId = boardStore.post?.boardId
    if (!boardId || !postId) return
    const boardListKey = pathUtils.getScriptSubPath(`data\\${boardId}.json`)
    const boardListData = jsonDataStore.jsonDataMap[boardListKey]?.data
    if (!boardListData) return
    const posts: any[] = boardListData._embedded.posts
    const idx = posts?.findIndex((post) => post.postId === postId)
    console.log('idx', idx)
    const nextIdx = idx === posts.length - 1 ? 0 : idx + 1
    const nextPostId = posts[nextIdx].postId
    const post: Post = {postId: nextPostId, boardId: boardId}
    console.log('movePostNext', post)
    boardStore.setPost(post)
  }

  useEffect(() => {


    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        console.log('ArrowUp')
        movePostUp()
      } else if (event.key === 'ArrowDown') {
        console.log('ArrowDown')
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