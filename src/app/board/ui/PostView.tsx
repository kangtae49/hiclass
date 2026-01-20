import {observer} from "mobx-react-lite";
import {JustId} from "@/app/components/just-layout/justLayout.types.ts";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import pathUtils from "@/utils/pathUtils.ts";
import {format} from "date-fns";
import {replaceUrl} from "@/utils/htmlUtils.ts";
import {useEffect} from "react";
import PostAttachList from "@/app/board/ui/PostAttachList.tsx";
import CommentList from "@/app/board/ui/CommentList.tsx";
import {JustUtil} from "@/app/components/just-layout/justUtil.ts";

interface Props {
  justId: JustId
  layoutId: string
}

const postView = observer(({justId, layoutId: _layoutId}: Props) => {
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)
  const postId = JustUtil.getParamString(justId, "postId")!
  const boardId = JustUtil.getParamString(justId, "boardId")!
  console.log("postView", justId, postId, boardId)

  const boardListKey = pathUtils.getScriptSubPath(`data\\${boardId}.json`)
  const commentKey = pathUtils.getScriptSubPath(`data\\${boardId}_comment\\${postId}.json`)

  const boardListData = jsonDataStore.jsonDataMap[boardListKey]?.data
  const posts = boardListData?.['_embedded']['posts']
  const post = posts?.find(post => post.postId === postId)
  const commentListData = jsonDataStore.jsonDataMap[commentKey]?.data
  const comments = commentListData?.['_embedded']['postComments']

  const title = post?.postTitle
  const posted = post?.posted ? format(new Date(post.posted), "yyyy-MM-dd HH:mm:ss") : ''
  const boardNm = post?.board.boardName
  const htmlContent = replaceUrl(post?.postContent, pathUtils.getScriptSubPath(`data\\${boardId}_attach`))
  const userName = post?.writeUser.userName

  useEffect(() => {
    window.api.addWatchPath([boardListKey, commentKey])
  }, [])

  return (
    <div className="post-active-view">
        <div className="tm">{boardNm} {posted} {userName}</div>
        <div className="post-title"><strong>{title}</strong></div>
        <div className="post-content">
            <div className="post-html" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
            <PostAttachList boardId={boardId!} postId={postId!} files={post?.files} />
            <CommentList boardId={boardId} postId={postId} comments={comments}/>
        </div>
    </div>
  )
})

export default postView