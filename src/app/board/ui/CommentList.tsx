import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import PostAttachList from "@/app/board/ui/PostAttachList.tsx";
import {format} from "date-fns";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import CommentReplyList from "@/app/board/ui/CommentReplyList.tsx";
import pathUtils from "@/utils/pathUtils.ts";

interface Props {
  boardId: string
  postId: string
  commentKey: string
  // comments: any []
}

const CommentList = observer(({boardId, postId, commentKey}: Props) => {
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)
  // const commentKey = pathUtils.getScriptSubPath(`data\\${boardId}_comment\\${postId}.json`)
  const data = jsonDataStore.jsonDataMap[commentKey]?.data
  const comments = data?._embedded?.postComments
  // console.log(comments)
  console.log('CommentList', boardId, postId, commentKey)
  useEffect(() => {
    if (commentKey) {
      window.api.addWatchPath([commentKey])
    }
  }, [commentKey])

  return (
    <div className="comment-list">
      <div>
        댓글 {comments?.length || 0}
      </div>
      {comments?.map((comment, index) => (
        <div key={index} className="comment">
          <div className="comment-title">
            {comment.writeUser.userName}
            {comment.writeUser.userType === 'PARENTS' ? `(${comment.writeUser.memberChildName} 학부모)` : ''}
            {format(new Date(comment.updatedTimestamp), "yyyy-MM-dd HH:mm:ss")}
          </div>
          <div className="comment-content">
            {comment.comment}
          </div>
          <PostAttachList boardId={boardId} postId={postId} files={comment.files} isShowAttach={true} />
          {comment.reactions && (
            <CommentReplyList boardId={boardId} commentId={comment.currentId} replyKey={pathUtils.getScriptSubPath(`data\\${boardId}_comment\\${comment.currentId}.json`)} />
          )}
        </div>
      ))}
    </div>
  )
})

export default CommentList;